const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

app.use('/openai', createProxyMiddleware({
    target: 'http://127.0.0.1:8080/openai',
    changeOrigin: true,
    pathRewrite: {
        '^/openai': '/v1',  // Adapte conforme necessário
    },
}));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor proxy rodando na porta ${PORT}`);
});