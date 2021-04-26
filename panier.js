var panier = getpanier()
let panierProducts = panier.products;
const template = document.querySelector('template.product');
const products = document.querySelector('#products');
function renderProducts(panierProducts){
    products.innerHTML = ''
    panierProducts.forEach((element,key) => {
        let product = document.importNode(template.content, true);
            product.querySelector('h4').innerText = element.name;
            product.querySelector('.description').innerText = element.description;
            product.querySelector('img').attributes.src.value = element.image;
            product.querySelector('.unitPrice').innerText = element.unitPrice;
            product.querySelector('.option').innerText = element.option;
            product.querySelector('.quantity').innerText = element.quantity;
            product.querySelector('.priceTotal').innerText = element.unitPrice * element.quantity;   
        
        let drop = product.querySelector('.supprimer');
        drop.attributes.getNamedItem('data-index').value = key;
        drop.addEventListener('click',event=>{
            event.preventDefault()
            let index = event.target.attributes.getNamedItem('data-index').value;
            panierProducts = panierProducts.filter((p,i) =>{
                return i != index
            })
            localStorage.clear()
            localStorage.setItem('panier' , JSON.stringify({products:panierProducts}))
            renderProducts(panierProducts)
            window.location.reload()
        })
            products.appendChild(product)    
    });
}
totalPrice = 0
totalProduit = 0
//Permet de faire le calcule de Sous-Total and Nombre de produit
for (let i = 0 ; i < panierProducts.length; i++ ){
    totalPrice = totalPrice + (panierProducts[i].unitPrice * panierProducts[i].quantity)
    totalProduit = totalProduit + panierProducts[i].quantity;
}
let sousTotal = document.querySelector('.sousTotal').innerText = totalPrice; 
// permet de mettre un S si il y à plusieurs produit 
if (totalProduit <= 1){
    let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produit";
}else{
    let totalArticle = document.querySelector('.totalArticle').innerText = totalProduit + " Produits";
}
renderProducts(panierProducts)
let date = new Date();
let form = document.querySelector("form");
form.addEventListener("submit",event =>{
    event.preventDefault()
    if(panierProducts.length === 0){
        window.alert("Votre Panier est vide.Vous allez être rediriger à la page d'acceuil")
        window.location.replace('index.html'); 
    }
    else{
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
    panierProducts.forEach(element => {
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
            localStorage.setItem('dateValidationCommande',JSON.stringify(date.toLocaleDateString()));
            window.location.replace('confirmation.html'); 
    }).catch(error => {
        document.querySelector('body').innerHTML = "Désolez une erreur avec le serveur s'est produite";
        console.log(error)
      })
    }
})