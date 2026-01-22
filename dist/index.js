"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
