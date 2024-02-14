
// globals
const myFeaturedElement = document.getElementById('ShowProduct');
console.log(myFeaturedElement);
let myProducts

GetProductData()

// model
function GetProductData() {
    fetch('https://dummyjson.com/products?limit=100')
        .then((result) => {

            return result.json();
        })
        .then((json) => {

            ProductsRecived(json);

        });
}


// controller
function ProductsRecived(productData) {

    //console.log(productData)

    myProducts = productData.products

    let myFeaturedProducts = [];

    myFeaturedProducts.push(myProducts[3], myProducts[6], myProducts[8])
    //console.log(myFeaturedProducts);

    CreateProductView(myFeaturedProducts)
    //CreateProductView(myProducts)
}


// view code
function CreateProductView(myCards) {
    //console.log(myCards);


    myCards.forEach(product => {
        console.log(product);


      let myHTML = `<figure onclick="ProductCallback(${product.id})" ><h2>${product.title}</h2><img src="${product.thumbnail}"><h3><span id=testOne>PRIS: ${product.price}</span> <span id="test"> rabat: ${product.discountPercentage}</h3></span> <h2 id="Nu">Nu: ${product.price - product.discountPercentage} </h2></figure>`


        myFeaturedElement.innerHTML += myHTML
    });
}






