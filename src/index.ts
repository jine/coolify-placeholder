import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const host = req.headers.host;
  if (!host) {
    res.send('No host');
    return;
  }
  const parts = host.split('.');
  const subdomain = parts[0];
  const capitalized = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  res.send(capitalized);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});