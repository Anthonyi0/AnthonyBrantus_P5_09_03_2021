var panier = getpanier()
let panierProduct = panier.products;

const template = document.querySelector('template.product');
const products = document.querySelector('#products');

//Fonction qui utilise le localstorage pour crée le panier 
panierProduct.forEach(element => {
    let product = document.importNode(template.content, true);
        product.querySelector('h4').innerText = element.product.name;
        product.querySelector('.description').innerText = element.product.description;
        product.querySelector('img').attributes.src.value = element.product.imageUrl;
        product.querySelector('.price').innerText = "Prix : " + element.product.price + " €";
        product.querySelector('.option').innerText = element.option;
       
        products.appendChild(product)
});
//Fin de la Fonction qui utilise le localstorage pour crée le panier


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