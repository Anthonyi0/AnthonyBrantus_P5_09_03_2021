var panier = getpanier()
let panierProduct = panier.products;

const template = document.querySelector('template.product');
const products = document.querySelector('#products');

//Fonction qui utilise le localstorage pour crée le panier 
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
//Fin de la Fonction qui utilise le localstorage pour crée le panier
totalPrice = 0
totalProduit = 0 

/*Permet de faire le calcule de Sous-Total 
and Nombre de produit*/
for (let i = 0 ; i < panierProduct.length; i++ ){
    totalPrice = totalPrice + panierProduct[i].price++;
    totalProduit = totalProduit + panierProduct[i].quantity++;
}
let sousTotal = document.querySelector('.sousTotal').innerText = totalPrice;

// permet de mettre un S si il y à plusieurs produit 
if (totalProduit <= 1){
    let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produit";
}else{
    let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produits";
}



function backEnd(){
    //Récupérer les valeurs du formulaire
    var contact = {
        firstName : nom.value,
        lastName : prenom.value,
        address : addresse.value,
        city : ville.value,
        email : email.value
    }
    //Envoyer les données au serveur        
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
    }
    .then(function(data){
        console.log(data)
    })
    )}