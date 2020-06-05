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
    stateInput.value = event.target.options[indexOfSelectedState].text

    //zera as opções de cidade após trocar o estado
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"

    //desativa a caixa de seleção
    citySelect.disabled=true

    //url para acesso a api
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then((res) => { return res.json() })
        .then((cities) => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            //habilita a caixa de seleçao
            citySelect.disabled = false

        } )
}


//carrega as ufs
populateUFs()


//---items de coleta---

//input escondido para envio das info
const collectedItems =  document.querySelector("input[name=items]")

//capturando todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")


//add ouvidor de eventos
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
    
}


//variavel para armazenar os itens selecionados
let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    //add uma classe do css com js
    // itemLi.classList.remove("selected")
    //remove uma classe do css com js
    // itemLi.classList.add("selected")

    //add ou remover uma classe do css com js
    itemLi.classList.toggle("selected")
    

    //captura os numeros do dataset-id
    const itemId = event.target.dataset.id


    //verificar itens selecionados
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(function (item) {
        //verifica se o item foi selecionado
        const itemFound = item == itemId
        //retorna true o false
        return itemFound
    })

    //console.log(alreadySelected)

    //se já selecionado
    if (alreadySelected >= 0) {
        //tirar da lista
        const filteredItems = selectedItems.filter(function (item) {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        //console.log(filteredItems)

        //atualiza a lista de selecionados
        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, add a seleção

        selectedItems.push(itemId)

    }

    //console.log(selectedItems)

    //atualizar o campo hidden para envio das info]
    collectedItems.value = selectedItems
}