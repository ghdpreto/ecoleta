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
    const stateInput = document.querySelector("input[name=state]")

    //pega o value do select estado
    const ufValue = event.target.value

    //verificar o valor selecionado (0 a 26)
    const indexOfSelectedState = event.target.selectedIndex

    //armazena o valor em texto no input escondido
    stateInput.value = event.target.options[index].text

    //url para acesso a api
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then((res) => { return res.json() })
        .then((cities) => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            //habilita a caixa de seleçao
            citySelect.disabled = false

        } )
}


//carrega as ufs
populateUFs()


