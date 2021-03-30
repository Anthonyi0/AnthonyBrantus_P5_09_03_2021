let panier = getpanier()
let params = (new URL(document.location)).searchParams;
    console.log(params.get('id'));
fetch('http://localhost:3000/api/cameras/'+params.get('id'), {method: 'GET'})
.then(response => { 
    if(response.status === 200) {
        return response.json()
    }
//Fonction qui utilise l'api pour crée la fiche produit
}).then( product  => {
    console.log(product);

    productNode = document.querySelector('#product');
    let name = productNode.querySelector('h4').innerText = product.name;
    let description = productNode.querySelector('.description').innerText = product.description;
    let image = productNode.querySelector('img').attributes.src.value = product.imageUrl;
    let price = productNode.querySelector('.price').innerText = product.price;
    let select = productNode.querySelector('select');
    product.lenses.forEach(element => {
        let option = document.createElement('option')
        option.text = element
        select.appendChild(option)
    }); 
    productNode.querySelector("a").addEventListener('click', event =>{
        event.preventDefault()
        panier.products.push({
            name: name,
            description: description,
            image: image,
            option: select.value,
            quantity: productNode.querySelector('.quantity').value,
            price: price * productNode.querySelector('.quantity').value,
        })
        if (window.confirm("Validation de l'article")){
            localStorage.setItem('panier',JSON.stringify(panier))
            window.location.replace('panier.html')
        }else{
            window.location.replace('index.html')
        }
        })
}).catch(error => {
    document.querySelector('#product').innerHTML = 'Le produit n\'existe pas';
    console.log(error)
})
//Fin de la fonction qui utilise l'api pour crée la fiche produit
