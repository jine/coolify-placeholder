import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const host = req.headers.host;
  let domainText = 'No host';
  if (host) {
    const parts = host.split('.');
    const subdomain = parts[0];
    domainText = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  }
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${domainText}</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
   <style>
     body {
       font-family: 'Open Sans', sans-serif;
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100vh;
       margin: 0;
     }
     h1 {
       font-size: 4rem;
     }
   </style>
</head>
<body>
  <h1>${domainText}</h1>
</body>
</html>`;
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});