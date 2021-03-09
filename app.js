fetch('http://localhost:3000/api/cameras', {method: 'GET'})
.then(function(response){ 
    if(response.status === 200) {
        return response.json()
    }
})
.then(function(data) {
    
    let template = document.querySelector('template.product');
    const products = document.querySelector('#products');

    data.forEach(element => {
        let product = document.importNode(template.content, true);
        product.querySelector('h4').innerHTML = element.name
        product.querySelector('p').innerHTML = element.description;
        product.querySelector('img').attributes.src.value = element.imageUrl;
        product.querySelector('a').attributes.href.value = 'product.html?id='+ element._id;

        products.appendChild(product)
    });

})