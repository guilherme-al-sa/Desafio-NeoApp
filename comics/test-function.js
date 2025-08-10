// test-function.js
async function testMarvelProxy() {
  const testUrl = 'http://localhost:8888/.netlify/functions/proxy-marvel?path=comics&limit=5&offset=0';
  
  console.log('Testando:', testUrl);
  
  try {
    const response = await fetch(testUrl);
    console.log('Status:', response.status);
    
    const data = await response.json();
    console.log('Dados recebidos:', {
      totalResults: data.data?.total,
      resultsCount: data.data?.results?.length,
      firstComic: data.data?.results?.[0]?.title
    });
    
  } catch (error) {
    console.error('Erro no teste:', error.message);
  }
}

// Execute apenas se for chamado diretamente
if (typeof window !== 'undefined') {
  testMarvelProxy();
}