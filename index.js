const express = require('express');

// Instancia do servidor Express
const server = express();

// Adicionando modulo que indica ao Node, que deve ser lido JSON, do body das requests
server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Teste", "email": "teste@mail.com" }

const users = ['John', 'David', 'Peter', 'Marie']

server.get('/users', (req, res) => {
    res.send(users);
});

server.get('/users/:id', (req, res) => {
    // Desestruturação
    const { id } = req.params;

    // Irá retornar apenas o usuário (users) da posição do array (id)
    return res.json(users[id]);
});

server.post('/users', (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.send(users);
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users[id] = name

    return res.json(users);
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users.splice(id, 1)

    return res.json({ "message": `Usuário ${id} deletado com sucesso` });
});

server.listen(3000);