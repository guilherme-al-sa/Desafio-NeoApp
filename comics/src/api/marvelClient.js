// meu client para chamar a proxy

export async function fetchComics({ limit=12,offset=0,titleStartsWith} = {}) {
  const params = new URLSearchParams({
   limit:String(limit),
   offset:String(offset),
  });

  if(titleStartsWith) params.set('titleStartsWith', titleStartsWith);

  // path=comics diz ao proxy qual endpoint chamar

  const res = await fetch (`/api/proxy-marvel?path=comics&${params.toString()}`);
  if(!res.ok) throw new Error ('Erro ao buscar comics');
  const json = await res.json();

  // json.data tem {results,total, offset, limit}
  return json.data;
}

export async function fetchComicById(id) {
  const res = await fetch (`/api/proxy-marvel?path=comics/${id}`)
  if (!res.ok) throw new Error ('Erro ao buscar comic');
  const json = await res.json();
  return json.data;
}