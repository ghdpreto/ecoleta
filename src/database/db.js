//importar a dependencia do sqlite3
//verbose retorna informaçoes no terminal
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira fazer operações no db
// comando node src/database/db.js
const db = new sqlite3.Database("./src/database/database.db")

// utilizar o objeot de banco de dados
// serialize = sequencia de codigo
/*
db.serialize(function () {
    // criar uma tabela
    // comando sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // inserir dados na tabela
    // query sql
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);        
    `
    //valores
    const valuesColectoria = [
        "Colectoria",
        "http://127.0.0.1:3000/assets/lixo-eletronico.jpg",
        "Guilherme Gemballa, Jardim America",
        "260",
        "Santa Catarina",
        "Rio do sul",
        "Residuos Eletrônicos, Lâmpadas"
    ]
    const valuesPapersider = [
        "Paperside",
        "http://127.0.0.1:3000/assets/lixo-papel.jpg",
        "Guilherme Gemballa, Jardim America",
        "260",
        "Santa Catarina",
        "Rio do sul",
        "Papeis e Papelão"
    ]

    //debug
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this) // referencia a resposta do comando run
    }

    //executa o insert de dados
    // para não executar novamente comentar o codigo
    db.run(query, valuesPapersider, afterInsertData)

    // consultar dados
    // rows = registros localizados

    const querySelectAll = `SELECT * FROM places`
    const querySelectName = `SELECT name FROM places`
    // db.all(querySelectName, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    // deletar dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    //     if(err) {
    //         console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // });
})
*/

//torna acessivel a outros arquivos (server.js)
module.exports = db