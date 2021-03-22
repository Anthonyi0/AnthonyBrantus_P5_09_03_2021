function getpanier(){
    let panier = localStorage.getItem('panier') ;
    if (null === panier){
        panier = {
            products : []
        } 
    }
    else {
        panier = JSON.parse(panier);
    }
    return panier 
}