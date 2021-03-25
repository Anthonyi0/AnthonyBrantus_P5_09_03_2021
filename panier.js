var panier = getpanier()
let panierProduct = panier.products;
const template = document.querySelector('template.product');
const products = document.querySelector('#products');

panierProduct.forEach(element => {
    let product = document.importNode(template.content, true);
        product.querySelector('h4').innerHTML = element.name;
        product.querySelector('.description').innerHTML = element.description;
        product.querySelector('img').attributes.src.value = element.imageUrl;
        product.querySelector('.price').innerHTML = "Prix : " + element.price + " €";
       
        products.appendChild(product)
});

/*
for(let i = 0; i < products.length; i++){
    showPanier = products[i]
    console.log(showPanier);  
    
    productNode = document.querySelector('#product');
    productNode.querySelector('.title_card').innerText = showPanier.name;
    productNode.querySelector('.text_card').innerHTML = showPanier.description;
    productNode.querySelector('img').attributes.src.value = showPanier.imageUrl;
    productNode.querySelector('.price').innerHTML = "Prix : " + showPanier.price + " €";
     
    }
*/

function backEnd(){

    panier
    /*Récupérer les valeurs du formulaire*/
    var contact = {
        firstName : nom.value,
        lastName : prenom.value,
        address : addresse.value,
        city : ville.value,
        email : email.value
    }
    /* Envoyer les données au serveur*/        
    fetch('http://localhost:3000/api/cameras/order',{
        method: 'POST' , 
        headers : { 
            'Content-Type' : 'application/json'
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