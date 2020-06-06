//importar a dependencia do sqlite3
//verbose retorna informaçoes no terminal
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira fazer operações no db
// comando node src/database/db.js
const db = new sqlite3.Database("./src/database/database.db") 
 
 // deletar dado da tabela
     db.run(`DELETE FROM places WHERE id = ?`, [2], function (err) {
         if(err) {
             console.log(err)
         }
         console.log("Registro deletado com sucesso")
     });

    