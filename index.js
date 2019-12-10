const express = require('express');

// Instancia do servidor Express
const server = express();

// Adicionando modulo que indica ao Node, que deve ser lido JSON, do body das requests
server.use(express.json());

const users = ['John', 'David', 'Peter', 'Marie']

server.use((req, res, next) => {
    // console.time(): utilizado para calcular o tempo das requisições. Deve ser colocado o console.timeEnd() para finaliza-lo
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next();
    console.timeEnd('Request');
});

// Middleware para checar a existencia de dados no body da requisicao
function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    return next();
}

function checkUserInArray(req, res, next) {

    const user = users[req.params.id];

    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;

    return next();
}

server.get('/users', (req, res) => {
    res.send(users);
});

server.get('/users/:id', checkUserInArray, (req, res) => {
    /**
     *  Com a função checkUserInArray sendo passada como parametro, o retorno pode ser 'req.user' diretamente, já que o middleware onde
     *  o user é definido é chamado nessa rota 
     * */ 
    return res.json(req.user);
});

server.post('/users', (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.send(users);
});

// Middleware é chamado através do parametro abaixo
server.put('/users/:id', checkUserInArray, checkUserExists, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users[id] = name

    return res.json(users);
});

server.delete('/users/:id', checkUserInArray, (req, res) => {
    const { id } = req.params;
    users.splice(id, 1)

    return res.json({ "message": `Usuário ${id} deletado com sucesso` });
});

server.listen(3000);