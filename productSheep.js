 let params = (new URL(document.location)).searchParams;
    console.log(params.get('id'));



fetch('http://localhost:3000/api/cameras/'+params.get('id'), {method: 'GET'})
.then(response => { 
    if(response.status === 200) {
        return response.json()
    }
/*Fonction qui utilise l'api pour crée la fiche produit*/
}).then( product  => {
    console.log(product);

    productNode = document.querySelector('#product');
    productNode.querySelector('h4').innerText = product.name;
    productNode.querySelector('.text_card').innerHTML = product.description;
    productNode.querySelector('img').attributes.src.value = product.imageUrl;
    productNode.querySelector('.price').innerHTML = "Prix : " + product.price + "€";
    productNode.querySelector('option').innerHTML = product.lenses;
    
}).catch(error => {
    document.querySelector('#product').innerHTML = 'Le produit n\'existe pas';
})
/* Fin de la fonction qui utilise l'api pour crée la fiche produit*/