// netlify/functions/proxy-marvel.js
import fetch from "node-fetch";
import crypto from "crypto";

export async function handler(event) {
  // Configurar headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Responder OPTIONS para CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { path, ...params } = event.queryStringParameters || {};

    if (!path) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Parâmetro 'path' é obrigatório" }),
      };
    }

    // Verificar chaves da Marvel
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      console.error('Chaves da Marvel não configuradas');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Chaves da Marvel não configuradas" }),
      };
    }

    // Gerar timestamp e hash
    const ts = Date.now().toString();
    const hash = crypto
      .createHash("md5")
      .update(ts + privateKey + publicKey)
      .digest("hex");

    // Construir URL da API Marvel
    const apiUrl = new URL(`https://gateway.marvel.com/v1/public/${path}`);
    
    // Adicionar parâmetros
    for (const [key, value] of Object.entries(params)) {
      if (value) apiUrl.searchParams.set(key, value);
    }
    
    // Parâmetros obrigatórios da Marvel
    apiUrl.searchParams.set("ts", ts);
    apiUrl.searchParams.set("apikey", publicKey);
    apiUrl.searchParams.set("hash", hash);

    console.log(`Fazendo requisição para: ${apiUrl.toString()}`);

    // Fazer requisição com timeout personalizado
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos

    const response = await fetch(apiUrl.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Marvel-Comics-App/1.0',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Erro da Marvel API: ${response.status}`);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `Erro da Marvel API: ${response.status}`,
          status: response.statusText 
        }),
      };
    }

    const data = await response.json();

    // Verificar se a resposta da Marvel contém erro
    if (data.code && data.code !== 200) {
      console.error('Erro na resposta da Marvel:', data);
      return {
        statusCode: data.code || 500,
        headers,
        body: JSON.stringify({ 
          error: data.status || "Erro da Marvel API",
          message: data.message 
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (err) {
    console.error('Erro no proxy:', err);
    
    // Verificar se foi timeout
    if (err.name === 'AbortError') {
      return {
        statusCode: 504,
        headers,
        body: JSON.stringify({ error: "Timeout na requisição para Marvel API" }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Erro interno no proxy",
        message: err.message 
      }),
    };
  }
}