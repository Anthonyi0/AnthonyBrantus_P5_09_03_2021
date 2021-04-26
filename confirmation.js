let totalArticle = localStorage.quantity;
let contact = localStorage.contact;
contact = JSON.parse(contact);

let date = document.querySelector('.date').innerText = JSON.parse(localStorage.dateValidationCommande);
let price = document.querySelector('.price').innerText = localStorage.totalPrice + " €";
let id = document.querySelector('.id').innerText = JSON.parse(localStorage.orderId);
let name = document.querySelector('.name').innerText = contact.firstName + " " + contact.lastName
let address = document.querySelector('.address').innerText = contact.address;
let city = document.querySelector('.city').innerText = contact.city;
let finish = document.querySelector('.finish').addEventListener("click",event=>{
    location.replace('index.html')
    localStorage.clear()
})

// permet de mettre un S si il y à plusieurs produit 
if (totalArticle <= 1){
    let quantity = document.querySelector('.quantity').innerText = totalArticle + " Produit";
}else{
    let quantity = document.querySelector('.quantity').innerText = totalArticle + " Produits";
} 