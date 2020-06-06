const express = require("express"); //usando o express
const server = express() //executando a express

const nunjucks = require("nunjucks") //usando nunjucks
const db = require("./database/db") // usando do banco de dados

//configurando o nunjucks
nunjucks.configure("src/views", {
    express: server,
    nocache: true
})

// habilitando o uso do body para utilizar o metodo POST
server.use(express.urlencoded({ extended: true }))

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
    //verifica o que esta sendo recebido do form
    // console.log(req.query)

    return res.render("create-point.njk")
})

//envio de dados para o backend
server.post("/save-point", function (req, res) {
    //corpo do formulario enviado pelo post
    console.log(req.body)

    // inserindo dados no db
    const queryInsert = `
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

    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsetDate(err) {
        if(err) {

            // criar pagina de erro
            console.log(err)
            return res.send("Erro de cadastro")
        }
        console.log("Cadastrado com sucesso")    
        console.log(this)

        //saved true =  abre o modal com ok
        return res.render("create-point.njk", { saved: true })
    }

    //insert dos dados
    db.run(queryInsert, values, afterInsetDate)
})

// pagina search-result
server.get("/search", function (req, res) {
    const search = req.query.search

    console.log(search)

    if (search == "") {
        // pesquisa vazia
        // envia resultado, if dentro da pagina
        return res.render("search-results.njk", { total: 0 })
    }

    // pegando os dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
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

