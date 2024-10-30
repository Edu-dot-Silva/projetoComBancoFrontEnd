//declarando as depedencias
const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const { hostname } = require('os')
const { error } = require('console')

const app = express()
const port = 3000


//middleware para permitir cross-origin request (cors)
app.use(cors())
app.use(bodyParser.json())

//conexao com o banco
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'bd_ads_turmaa'
})

// conectando ao banco de dados mysql
db.connect(err =>{
    if(err){
        console.error('Erro ao conectar com MySQL: ',err)
        return
    }
    console.log('Conectado com sucesso');
})

//criando a rota que vai trazer todos os usuario do banco
app.get('/api/usuarios', (req,res)=>{
    const sql = 'SELECT * FROM usuario'
    db.query(sql,(err,results)=>{
        if (err){
            return res.status(500).send('Erro para obter usuarios')
        }
        res.send(results)
    })
})

//Rota para inserir dados no BD
app.post('/api/usuarios', (req,res) => {
    const { nome, senha } = req.body;
    const sql = 'INSERT INTO usuario (nome,senha) VALUES (?, ?)';
    db.query(sql, [nome, senha], (err, result) => {
        if (err){
            return res.status(500).send('Erro ao inserir usuário');
        }
        res.send({message: 'Usuário inserido com sucesso! '});
    });
});

app.listen(port,()=>{
    console.log(`Servidor Rodando em http://localhost:${port}`);
})