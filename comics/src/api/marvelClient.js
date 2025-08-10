// Cliente corrigido para chamar a API da Marvel
const PROXY_PREFIX = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8888/.netlify/functions' 
  : '/.netlify/functions';

async function callProxy(path, params = {}) {
  try {
    const url = new URL(`${PROXY_PREFIX}/proxy-marvel`, window.location.origin);
    url.searchParams.set('path', path);
    
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    });

    console.log('Chamando URL:', url.toString()); // Para debug

    const res = await fetch(url.toString());
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro na API proxy: ${res.status} - ${errorText}`);
    }
    
    const json = await res.json();
    
    // Verificar se há erro na resposta da Marvel
    if (json.code && json.code !== 200) {
      throw new Error(`Erro da Marvel API: ${json.status || json.message}`);
    }
    
    return json.data; // {results, total, offset, limit}
  } catch (error) {
    console.error('Erro no marvelClient:', error);
    throw error;
  }
}

export function fetchComics({ limit = 12, offset = 0, titleStartsWith } = {}) {
  const params = { limit, offset };
  if (titleStartsWith) params.titleStartsWith = titleStartsWith;
  return callProxy('comics', params);
}

export function fetchComicById(id) {
  return callProxy(`comics/${id}`);
}