// netlify/functions/proxy-marvel.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { path, ...params } = event.queryStringParameters;

    // 🚨 Substitua pelas suas chaves
    const ts = Date.now().toString();
    const publicKey = process.env.MARVEL_PUBLIC_KEY ;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Chaves da Marvel não configuradas" }),
      };
    }

    // Gerar o hash exigido pela API
    const crypto = await import("crypto");
    const hash = crypto
      .createHash("md5")
      .update(ts + privateKey + publicKey)
      .digest("hex");

    // Construir a URL para a API oficial
    const apiUrl = new URL(`https://gateway.marvel.com/v1/public/${path}`);
    for (const [k, v] of Object.entries(params)) {
      apiUrl.searchParams.set(k, v);
    }
    apiUrl.searchParams.set("ts", ts);
    apiUrl.searchParams.set("apikey", publicKey);
    apiUrl.searchParams.set("hash", hash);

    // Fazer requisição para a Marvel
    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no proxy" }),
    };
  }
}
