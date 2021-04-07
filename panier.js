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
    console.log(data)       
    fetch('http://localhost:3000/api/cameras/order',{
        method: 'POST' ,
        body: JSON.stringify(data), 
        headers : { 
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        } 
    })
    .then(function(response){ 
        if(response.status === 201) {
            return response.json()
        }
    })
})