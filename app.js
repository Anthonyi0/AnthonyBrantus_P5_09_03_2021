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

/*if panier vide crée un tableau vide
else retourner le json.parse
return le résultats sur panier
*/