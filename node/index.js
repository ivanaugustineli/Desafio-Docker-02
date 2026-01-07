const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração do banco de dados
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

// Conexão com o banco
const connection = mysql.createConnection(config);

// Cria tabela se não existir
connection.query(`
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`);

// Insere um nome a cada acesso
app.get('/', (req, res) => {
  const name = 'Usuario Nome - ' + Math.floor(Math.random() * 1000);
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name], (err) => {
    if (err) {
      return res.status(500).send('Erro ao inserir no banco');
    }

    // Lista todos os nomes
    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao buscar dados');
      }

      let html = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach(row => {
        html += `<li>${row.name}</li>`;
      });
      html += '</ul>';

      res.send(html);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
