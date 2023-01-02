const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();

app.get('/', async (req, res) => {
    const content = await fs.promises.readFile('./index.html');
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
})


app.get('/src/main.js', async (req, res) => {
    const content = await fs.promises.readFile('./src/main.js');
    res.setHeader('Content-Type', 'text/javascript');
    res.send(content);
})
app.get('/src/App.vue', async (req, res) => {
    const content = await fs.promises.readFile('./src/App.vue');
    res.setHeader('Content-Type', 'text/javascript');
    res.send(content);
})
app.listen(3000, () => {
    console.log('vite on port 3000')
})