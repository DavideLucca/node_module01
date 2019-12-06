const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Teste", "email": "teste@mail.com" }

const users = ['John', 'David', 'Peter', 'Marie']

server.get('/teste', (req, res) => {
    const nome = req.query.nome;
    if (nome) {
        return res.json({ message: `Hello mr. ${nome}` });
    } else {
        return res.json({ message: 'Welcome to Teste Page' });
    }
});

server.get('/users/:id', (req, res) => {
    // Desestruturação
    const { id } = req.params;

    // Irá retornar apenas o usuário (users) da posição do array (id)
    return res.json(users[id]);
});

server.listen(3000);