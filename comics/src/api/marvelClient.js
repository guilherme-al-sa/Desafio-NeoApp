// Cliente corrigido para chamar a API da Marvel
import md5 from "md5";
const PROXY_PREFIX = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/.netlify/functions'
  : '/.netlify/functions';


export const publicKey = "e34409617668f5c83119a972696fc299";
const privateKey = "af0862f2f2990fbe576eb4a89469980bb5165159";

const generateHash = (timestamp) => {
  return md5(timestamp + "af0862f2f2990fbe576eb4a89469980bb5165159" + "e34409617668f5c83119a972696fc299");
};

const handleSubmit = (event) => {
  event.preventDefault();
  getComicsData();
};

export async function getComicsData({ limit = 6, offset = 0, titleStartsWith = "" } = {}) {
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);

  let url = `https://gateway.marvel.com/v1/public/comics?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  if (titleStartsWith) {
    url += `&titleStartsWith=${encodeURIComponent(titleStartsWith)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

  const json = await res.json();
  return {
    results: json.data.results,
    total: json.data.total,
    offset: json.data.offset,
    limit: json.data.limit
  };
}

export async function getComicById(id) {
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);

  const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

  const json = await res.json();
  
  return json.data.results[0];
}

