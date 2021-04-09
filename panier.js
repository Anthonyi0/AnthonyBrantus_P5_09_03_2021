var panier = getpanier()
let panierProduct = panier.products;
const template = document.querySelector('template.product');
const products = document.querySelector('#products');
panierProduct.forEach(element => {
    let product = document.importNode(template.content, true);
        product.querySelector('h4').innerText = element.name;
        product.querySelector('.description').innerText = element.description;
        product.querySelector('img').attributes.src.value = element.image;
        product.querySelector('.unitPrice').innerText = element.unitPrice;
        product.querySelector('.option').innerText = element.option;
        product.querySelector('.quantity').innerText = element.quantity;
        product.querySelector('.priceTotal').innerText = element.unitPrice * element.quantity;   

        products.appendChild(product)    
});
totalPrice = 0
totalProduit = 0
//Permet de faire le calcule de Sous-Total and Nombre de produit*/
for (let i = 0 ; i < panierProduct.length; i++ ){
    totalPrice = totalPrice + (panierProduct[i].unitPrice * panierProduct[i].quantity)
    totalProduit = totalProduit + panierProduct[i].quantity++;
}
let sousTotal = document.querySelector('.sousTotal').innerText = totalPrice; 
// permet de mettre un S si il y à plusieurs produit 
if (totalProduit <= 1){
    let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produit";
}else{
    let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produits";
}
let form = document.querySelector("form");
form.addEventListener("submit",event =>{
    event.preventDefault()
    let recupFormulaire = new FormData(form)
    var data = {
        contact:{
            firstName : recupFormulaire.get("prenom"),
            lastName : recupFormulaire.get("nom"),
            address : recupFormulaire.get("adresse"),
            city : recupFormulaire.get("ville"),
            email : recupFormulaire.get("email")
        },
        products:[]
    }
    panierProduct.forEach(element => {
        data.products.push(element.id)
    })     
    fetch('http://localhost:3000/api/cameras/order',{
        method: 'POST' ,
        headers : { 
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        if(response.status === 201) {
            console.log(response)
            return response.json()
        }
    })
    .then(data => {
        localStorage.clear()
        localStorage.setItem('contact',JSON.stringify(data.contact));
        localStorage.setItem('orderId',JSON.stringify(data.orderId));
        localStorage.setItem('totalPrice',JSON.stringify(sousTotal));
        localStorage.setItem('quantity',JSON.stringify(totalProduit));
        window.location.replace('confirmation.html'); 
    })
})