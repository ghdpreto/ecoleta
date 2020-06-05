const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const modalClose = document.querySelector("#modal .header a")


//exibe o modal
buttonSearch.addEventListener("click", function () {
    modal.classList.remove("hide")
})

//fecha o modal
modalClose.addEventListener("click", function () {
    modal.classList.add("hide")
})