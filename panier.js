let panier = getpanier()

function test(){
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
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
}