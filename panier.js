var panier = getpanier()
let panierProduct = panier.products;
let buttonNegatif = document.querySelector(".buttonNegatif");
let buttonPossitif = document.querySelector(".buttonPossitif");

const template = document.querySelector('template.product');
const products = document.querySelector('#products');

panierProduct.forEach(element => {
    let product = document.importNode(template.content, true);
        product.querySelector('h4').innerText = element.name;
        product.querySelector('.description').innerText = element.description;
        product.querySelector('img').attributes.src.value = element.image;
        product.querySelector('.price').innerText = element.price;
        product.querySelector('.option').innerText = element.option;
        product.querySelector('.quantity').innerText = element.quantity;
    
        products.appendChild(product)  
});
totalPrice = 0
totalProduit = 0 

//Permet de faire le calcule de Sous-Total and Nombre de produit*/
for (let i = 0 ; i < panierProduct.length; i++ ){
    totalPrice = totalPrice + panierProduct[i].price++;
    totalProduit = totalProduit + panierProduct[i].quantity++;
}
let sousTotal = document.querySelector('.sousTotal').innerText = totalPrice; 
let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produit" + totalProduit > 1?"s" : "";

let form = document.querySelector("form");
form.addEventListener("submit",event =>{
    event.preventDefault()
    let recupFormulaire = new FormData(form)
    panier
    var data = {
        contact:{
            firstName : recupFormulaire.get("prenom"),
            lastName : recupFormulaire.get("nom"),
            address : recupFormulaire.get("adresse"),
            city : recupFormulaire.get("ville"),
            email : recupFormulaire.get("email")
        },
        products:["1"]
    }       
    fetch('http://localhost:3000/api/cameras/order',{
        method: 'POST' , 
        headers : { 
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(function(response){ 
        if(response.status === 200) {
            return response.json()
        }
    })
    .then(function(data){
        console.log(data)
    })
})