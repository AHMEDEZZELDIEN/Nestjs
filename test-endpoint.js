const https = require('http');

const postData = '';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/langchain/save-document',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log(`headers:`, res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

  res.on('end', () => {
    console.log('\nRequest completed');
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(postData);
req.end();