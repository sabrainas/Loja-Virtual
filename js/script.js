//indice de slide
var slideIndex = 1
mostrarSlide(slideIndex)

function mudarSlide(n){
    mostrarSlide(slideIndex += n)
}

function slideAtual(n){
    mostrarSlide(slideIndex = n)
}

function mostrarSlide(n){
    var slides = document.getElementsByClassName("slide")
    var indicador = document.getElementsByClassName("indicador")

    if(n > slides.length){
        slideIndex = 1
    }
    if(n < 1){
        slideIndex = slides.length
    }
    for(var i = 0; i < slides.length; i++){
        slides[i].style.display = "none"
    }
    for(var i = 0; i < indicador.length; i++){
        indicador[i].className = indicador[i].className.replace(" ativo", "")
    }

    slides[slideIndex - 1].style.display = "block"
    indicador[slideIndex-1].className += " ativo"
}

setInterval(function() {
    mudarSlide(1);
}, 4000);

//carrinho
//remover produto do carrinho
const removerProduto = document.getElementsByClassName("removerProduto")
for(var i = 0; i < removerProduto.length; i++){
    removerProduto[i].addEventListener("click", removeProduct)
}

function removeProduct(event){
    event.target.parentElement.parentElement.remove()
} 

//adicionar produto no carrinho
const btnCarrinho = document.getElementsByClassName("btnCarrinho")
for (var i = 0; i < btnCarrinho.length; i++){
    btnCarrinho[i].addEventListener("click", addProduto)
}

function addProduto(event){
    const button = event.target
    const infoProduto = button.parentElement
    const imgProduto = infoProduto.getElementsByClassName("imgProdutos")[0].src
    const titleProduto = infoProduto.getElementsByClassName("titleProduto")[0].innerText
    
    // Verificar se o produto já existe
    const nameProduct = document.getElementsByClassName("nameProduct")
    let produtoExistente = false

    for (var i = 0; i < nameProduct.length; i++) {
        if (nameProduct[i].innerText === titleProduto) {
        const qtdInput = nameProduct[i].parentElement.parentElement.querySelector(".qtdCarrinho")
        const quantidade = parseInt(qtdInput.value)
        qtdInput.value = quantidade + 1
        produtoExistente = true
        break
        }
    }
    
    if (!produtoExistente) {
        // Criar novo item no carrinho
        const tbody = document.querySelector(".tableCarrinho tbody")
        const novoProduto = document.createElement("tr")
        novoProduto.classList.add("produtoCarrinho")
        novoProduto.innerHTML = `
        <td class="itemCarrinho">
            <img src="${imgProduto}" class="img-fluid imgCarrinho" alt="">
            <span class="nameProduct">${titleProduto}</span>
        </td>
        <td>
            <input type="number" class="qtdCarrinho" min="1" value="1">
        </td>
        <td>
            <button class="btn btn-danger removerProduto" type="button">Remover</button>
        </td>
        `
        tbody.appendChild(novoProduto)
    }

    const removerProduto = document.getElementsByClassName("removerProduto")
    
    for(var i = 0; i < removerProduto.length; i++){
        removerProduto[i].addEventListener("click", removeProduct)
    }
}