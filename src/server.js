const express = require("express"); //usando o express
const server = express() //executando a express

// configurar pasta public (css, js etc..)
server.use(express.static("public"))

// ligando o server
server.listen(3000)

console.log("Server on")

// configurando rotas (caminhos)
// pagina incial
server.get("/", function (req, res) {
    //enviando a pagina inicial
    res.sendFile(__dirname + "/views/index.html")
})

//pagina create-point
server.get("/create-point", function (req, res) {
    res.sendFile(__dirname + "/views/create-point.html")
})

