const fetch = require("node-fetch");
const crypto = require("crypto");
const { error } = require("console");

exports.handler = async (event)=>{
 const MARVEL_PUBLIC = process.env.MARVEL_PUBLIC;
 const MARVEL_PRIVATE =process.env.MARVEL_PRIVATE;
  if(!MARVEL_PUBLIC || !MARVEL_PRIVATE){
   return {statusCode:500,body:JSON.stringify({error: "Missing Marvel keys"})};
  }

  const qs = event.queryStringParameters || {};
  const ts = Date.now().toString();
  const hash = crypto.createHash('md5').update(ts + MARVEL_PRIVATE + MARVEL_PUBLIC).digest('hex');

  // O path padrão 'comics' - pode receber path=characters etc.

  const path = qs.path || 'comics';
  const url = new URL (`https://gateway.marvel.com/v1/public/${path}`);

  // repassa todos os params exceto o 'path'

  Object.entries(qs).forEach(([k,v])=>{if(k !=='path')url.searchParams.append(k,v);});
  
  url.searchParams.append('ts',ts);
  url.searchParams.append('apikey',MARVEL_PUBLIC);
  url.searchParams.append('hash',hash);


   try{
    const res = await fetch (url.toString());
    const data = await res.json();
    return{
     statusCode: res.status,
     headers:{"Content-Type" : "application/json"},
     body: JSON.stringify(data),
    };
   } catch (err){
    return {statusCode:500,body: JSON.stringify({error:err.message})};
   }

};


