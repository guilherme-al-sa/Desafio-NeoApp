// Cliente corrigido para chamar a API da Marvel
import md5 from "md5";
const PROXY_PREFIX = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/.netlify/functions'
  : '/.netlify/functions';


const privateKey = "905c38a2187c316180fad95c8e374ac024bdd4ce";
const publicKey = "28ca5a62b9f1a7fa210fd35fecf76ef3";

const generateHash = (timeStamp) => {
  return md5(timeStamp + "905c38a2187c316180fad95c8e374ac024bdd4ce" + "28ca5a62b9f1a7fa210fd35fecf76ef3");
};


async function callProxy(path, params = {}) {
  const timeStamp = new Date().getTime();
  const hash = generateHash(timeStamp);


  const url = `https://gateway.marvel.com:443/v1/public/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

  console.log("vai fazer a requisição")
  fetch(url)
    .then((response) => response.json())
    .then((result) => {

      console.log("FUNCIONOOO: ", result);
    })
    .catch(() => {
      console.log("error while getting character data");
    });
  console.log("Funciono")
}

export function fetchComics({ limit = 12, offset = 0, titleStartsWith } = {}) {

  console.log("chegou")
  const params = { limit, offset };
  if (titleStartsWith) params.titleStartsWith = titleStartsWith;
  return callProxy('comics', params);
}

export function fetchComicById(id) {
  console.log("chegiou aqui 2")
  return callProxy(`comics/${id}`);
}