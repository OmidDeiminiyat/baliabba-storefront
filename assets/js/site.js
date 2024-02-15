
// globals
const productSection = document.getElementById('ShowProduct');
const navElenent = document.getElementById('navigation');

let myProducts = null


GetProductData()
GetCategoryData()

// model
function GetProductData() {

    fetch('https://dummyjson.com/products?limit=100')

        .then((result) => {
            //console.log(result);
            return result.json()
        }
        )

        .then((json) => {
            ProductsRecived(json)
        });

}

// model
function GetCategoryData() {

    fetch('https://dummyjson.com/products/categories')

        .then((result) => {
            //console.log(result);
            return result.json()
        }
        )

        .then((json) => {
            Categoriesrecived(json)
        });

}


function Categoriesrecived(categoryData) {
    // temporary code
    //console.log(categoryData);
    CreateNavigation(categoryData)
}

// controller
function ProductsRecived(productData) {

    //console.log(productData)

    myProducts = productData.products

    let myFeaturedProducts = [];

    myFeaturedProducts.push(myProducts[8], myProducts[29], myProducts[19])
    //console.log(myFeaturedProducts);

    CreateProductView(myFeaturedProducts)
    // CreateProductView(myProducts)
}




//view code
function CreateNavigation(categoryArray) {
    // temporary code
    let myHtml = ""
    myHtml += `<div onclick="NavigationCallback('all')" >All</div>`
    categoryArray.forEach((category) => {
        myHtml += `<nav> <ul><li onclick="NavigationCallback('${category}')" >${category}</li></ul></nav>`

    });


    navElenent.innerHTML = myHtml
}



function NavigationCallback(myCategory) {

    let productByCategory = []
    if (myCategory === 'all') {
        CreateProductView(myProducts);
    }
    else {
        myProducts.forEach(product => {

            if (product.category == myCategory) {
                productByCategory.push(product)
            }
        }
        )

        CreateProductView(productByCategory);

    }

}



// view code
function CreateProductView(myCards) {
    //console.log(myCards);
    clearApp()

    myCards.forEach(product => {
        // console.log(product);


        let myHTML = `<figure onclick="ProductCallback(${product.id})" ><h2>${product.title}</h2><img src="${product.thumbnail}"><h3><span id=testOne>PRIS: ${product.price}</span> <span id="test"> rabat: ${product.discountPercentage}</h3></span> <h2 id="Nu">Nu: ${product.price - product.discountPercentage} </h2></figure>`


        productSection.innerHTML += myHTML
    })
}








// controller
function ProductCallback(myId) {



    console.log(myId);
    let myClickedProduct = null


    myProducts.forEach(product => {

        if (product.id == myId) {
            myClickedProduct = product
        }
    }
    )

    if (myClickedProduct == null) {
        // ingen produkt
        alert('no product')
    }
    else {
        // produkt
        console.log(myClickedProduct)
        clearApp();
        buildProduct(myClickedProduct)

    }



}



//view code
function buildProduct(product) {

    let myHTML = `<figure class="productDetails" onclick="GetProductData()" ><h2>${product.title}</h2>
  
    <img src="${product.images[0]}">
    <img src="${product.images[2]}">
    <img src="${product.images[3]}">
    <h3>PRIS: ${product.price}</h3>
    <p>${product.description}</p>
    </figure>
    `


    productSection.innerHTML = myHTML
}

// view code
function clearApp() {
    productSection.innerHTML = ""
}