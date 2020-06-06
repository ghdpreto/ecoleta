const express = require("express"); //usando o express
const server = express() //executando a express

const nunjucks = require("nunjucks") //usando nunjucks
const db = require("./database/db") // usando do banco de dados

//configurando o nunjucks
nunjucks.configure("src/views", {
    express: server,
    nocache: true
})

// configurar pasta public (css, js etc..)
server.use(express.static("public"))

// ligando o server
server.listen(3000)

console.log("Server on")

// configurando rotas
// paginal inicial
server.get("/", function (req, res) {
    return res.render("index.njk", {
        title: "teste"
    })
})

// pagina create-point
server.get("/create-point", function (req, res) {
    return res.render("create-point.njk")
})

// pagina search-result
server.get("/search", function (req, res) {

    // pegando os dados do db
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        //qnt de itens
        const total = rows.length

        //enviar os dados (places) do db para a pagina html
        return res.render("search-results.njk", { places: rows, total })
    })

    // return res.render("search-results.njk")
})



// configurando rotas (caminhos) sem nunjucks
// pagina incial
// server.get("/", function (req, res) {
//     //enviando a pagina inicial
//     return res.sendFile(__dirname + "/views/index.html")
// })

// //pagina create-point
// server.get("/create-point", function (req, res) {
//     return res.sendFile(__dirname + "/views/create-point.html")
// })

