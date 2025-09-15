const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log("Server rodando em: localhost:3000");
});