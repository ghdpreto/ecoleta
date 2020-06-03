const ufSelect = document.querySelector("select[name=uf]")

//houve a alteração no select uf
//aciona a function getCities

// document
//      .querySelector("select[name=uf]")
//      .addEventListener("change", getCities)

ufSelect.addEventListener("change", getCities)



function populateUFs() {
    //request para apo
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //transforma em json
    .then((res) => {return res.json()})
    //lista as uf
    .then((states) => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    //pega o value do select estado
    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then((res) => { return res.json() })
        .then((cities) => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false

        } )
}



//carrega as ufs
populateUFs()


