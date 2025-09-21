const { OllamaEmbeddings } = require('@langchain/ollama');

async function testEmbeddings() {
  try {
    console.log('Testing Ollama embeddings...');
    
    const embeddings = new OllamaEmbeddings({
      model: 'mxbai-embed-large',
      baseUrl: 'http://127.0.0.1:11434',
    });
    
    console.log('Creating test embedding...');
    const testEmbedding = await embeddings.embedQuery("Hello world test");
    
    console.log('Embedding successful!');
    console.log('Embedding dimensions:', testEmbedding.length);
    console.log('First 5 values:', testEmbedding.slice(0, 5));
    console.log('Expected dimensions: 1024');
    
    if (testEmbedding.length !== 1024) {
      console.error('❌ DIMENSION MISMATCH! Expected 1024, got:', testEmbedding.length);
    } else {
      console.log('✅ Embedding dimensions match database schema');
    }
    
  } catch (error) {
    console.error('❌ Embedding test failed:', error);
  }
}

testEmbeddings();