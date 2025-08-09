// meu client para chamar a proxy

const PROXY_PREFIX =  './netlify/functions';

async function callProxy(path, params = {}) {
  const url = new URL(`${PROXY_PREFIX}/proxy-marvel`);
  url.searchParams.set('path', path);
  Object.entries(params).forEach(([k,v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });

 const res = await fetch(url.toString());
 if (!res.ok) throw new Error ('Erro na API proxy');
 const json = await res.json();
 return json.data;  
//  {results,total,offset,limit}

}

export function fetchComics ({limit = 12, offset = 0, titleStartWith}  = {}){
  const params = {limit, offset};
  if (titleStartWith) params.titleStartWith = titleStartWith;
  return callProxy('comics',params);
}

export function fetchComicsById(id){
  return callProxy (`comics/${id}`);
}