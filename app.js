const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();

const app = express();

// const PORT = process.env.PORT || 5000;
const {PORT, API_TOKEN, API_BASE_URL} = process.env
// Logging the requests
app.use(morgan("dev"));

app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.use('/bposts', createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/bposts`]: '',
    },
}));

app.listen(PORT,()=>{
    console.log(`Server is listening on the port: http://localhost:${PORT}`);
});