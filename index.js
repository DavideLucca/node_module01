const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Teste", "email": "teste@mail.com" }

server.get('/teste', (req, res) => {
    const nome = req.query.nome;

    return res.json({ message: `Hello ${nome}` });
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    return res.json({ message: `Usuário nº ${id} encontrado` });
});

server.listen(3000);