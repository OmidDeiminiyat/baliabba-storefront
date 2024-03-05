
// globals
const productSection = document.getElementById('ShowProduct');
const navElenent = document.getElementById('navigation');
const secondaryElements = document.getElementById('secondary');
const basketIcon = document.getElementById('basket')


let myProducts = null


InitializeBasket()
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


// This one
function GetProductsByCategory(myCategoryURL) {

    fetch(myCategoryURL)

        .then((result) => {
            //console.log(result);
            return result.json()
        }
        )

        .then((json) => {



            recivedProductsByCategory(json)
        });

}


function recivedProductsByCategory(productsByC) {

    let myProductArray = productsByC.products

    CreateProductView(myProductArray)

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
    myHtml += `<div class="myDiv" onclick="NavigationCallback('all')" >All</div>`
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



// view code landing page
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



//view code single page
function buildProduct(product) {

    let myHTML = `<figure class="productDetails" onclick="GetProductData()" ><h2>${product.title}</h2>
  
    <img src="${product.images[0]}" id="imgLarge">
    <h3>PRICE: ${product.price}</h3>
    <p>${product.description}</p>
    </figure>
    <div class="secondImage">
    <img src="${product.images[2]}" onclick="changeImage('${product.images[2]}')">
    <img src="${product.images[3]}" onclick="changeImage('${product.images[3]}')">
    <img src="${product.images[0]}" onclick="changeImage('${product.images[0]}')">
    </div>
    <section class="Extra">
    <h1>${product.title}</h1>
    <h2>PRICE: ${product.price}</h2>
     ${product.discountPercentage} Off 
    <p>${product.description}</p>
    <h4>Shipping info:  <a href="#"> click here </a> </h4>
    <h4>Return Policy: <a href="#"> click here </a> </h4>
    <button class="myButton" onclick="insertCard(${product.id})"> Add to Card</button>

  
    </section>
    
    `     

    productSection.innerHTML = myHTML 
   
  
    
}





// Product call back
function insertCard(myId) {



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


// view code
function clearApp() {
    productSection.innerHTML = ""
}


// change image single page
function changeImage(newImage) {
    document.getElementById('imgLarge').src = newImage;
  }



  function cartView() {
    console.log("Oooooppps");
  }






  function SaveBasketData(basketData) {
    let mySerializedData = JSON.stringify(basketData)
    localStorage.setItem('myBasket', mySerializedData)
}


function ReadLocalStorageData() {

    let mybasketstring = localStorage.getItem('myBasket')
    // @ts-ignore
    let myBasket = JSON.parse(mybasketstring)
    return myBasket
}

function InitializeBasket() {
    //myBasket
    let myBasket = localStorage.getItem('myBasket')

    if (!myBasket) {
        console.log('no basket');

        let newBasket = {
            products: [],
            total: 0
        }


        UpdateBasketIcon(0)

        /*    let mySerializedData = JSON.stringify(newBasket)
   
           localStorage.setItem('myBasket', mySerializedData) */

        SaveBasketData(newBasket)

    } else {
        // console.log('Dooouuudd');
        let myData = JSON.parse(myBasket)

        UpdateBasketIcon(myData.products.length)


    }

}




// ---------- here -------//

function updateItemCount() {
    // Retrieve data from local storage
    const dataFromLocalStorage = localStorage.getItem('myBasket');

    // Check if there is any data in local storage
    if (dataFromLocalStorage) {
        // Parse the JSON data
        const parsedData = JSON.parse(dataFromLocalStorage);
        
        // Get the number of items
        const itemCount = Object.keys(parsedData).length;
        
        // Update the HTML element with the item count
        document.getElementById('itemCount').textContent = itemCount;
    } else {
        // If there is no data in local storage, set item count to 0
        document.getElementById('itemCount').textContent = '0';
    }
}

// Call the function when the page loads
updateItemCount();



// ------------- //

function insertCard(productId) {


    let myBasket = ReadLocalStorageData()


    myBasket.products.push(productId);

    UpdateBasketIcon(myBasket.products.length)

    /*  let mySerializedData = JSON.stringify(myBasket)
     localStorage.setItem('myBasket', mySerializedData) */

    SaveBasketData(myBasket)
}



//----------------//


function BasketIconCallback() {
    /*  let mybasketstring = localStorage.getItem('myBasket')
     let myBasket = JSON.parse(mybasketstring) */
    let myBasket = ReadLocalStorageData()


    let myProducts = []

    myBasket.products.forEach(productId => {
        let myProduct = getProduct(productId)
        if (myProduct) {

            myProducts.push(myProduct)
        }
    });

    BuildBasket(myProducts)
}


// ------// 
function BasketRemove(id) {


    /*  let mybasketstring = localStorage.getItem('myBasket')
     let myBasket = JSON.parse(mybasketstring) */
    let myBasket = ReadLocalStorageData()

    myBasket.products.forEach((productId, index) => {
        if (id == productId) {
            myBasket.products.splice(index, 1)
            return;
        }
    });
    /* 
        let mySerializedData = JSON.stringify(myBasket)
        localStorage.setItem('myBasket', mySerializedData) */

    SaveBasketData(myBasket)

    BasketIconCallback()
}



//----------------------------------------------------------------------


function paymentCallBack() {
    alert('weee i am getting paid');
}

//----------------------------------------------------------------------

function BasketClear() {
    let newBasket = {
        products: [],
        total: 0
    }
    UpdateBasketIcon(0)
    /*   mySerializedData = JSON.stringify(newBasket)
      localStorage.setItem('myBasket', mySerializedData) */

    SaveBasketData(newBasket)

    BasketIconCallback()
}


//----------------------------------------------------------------------


function getProduct(id) {
    let myProduct = false
    myProducts.forEach(product => {
        if (id == product.id) {
            myProduct = product
        }
    });

    return myProduct
}

function ToggleMenu() {
    let myMenues = document.getElementById('menuLists')
    myMenues.classList.toggle('hidden')

}



/* view code------------------------------------------------------------- */

function BuildBasket(products) {
    clearApp()

    let myBasketHTML = '<section id="basketWiev">'
    if (products.length > 0) {
        products.forEach(product => {
            // console.log(product);

            let myHTML = `<figure><img src="${product.thumbnail}"><h2>${product.title}</h2><p>PRIS: ${product.price}</p><button onclick="BasketRemove(${product.id})">remove</button></figure>`


            myBasketHTML += myHTML
        })
        myBasketHTML += `<section id="basketTools"><button onclick="paymentCallBack()">Go to payment</button><button onclick="BasketClear()">clear basket</button></section>`
    } else {
        myBasketHTML += `<h1>basket empty go buy stuff</h1><button onclick="GetProductData()">OK</button>`

    }

    myBasketHTML += '</section>'

    productSection.innerHTML = myBasketHTML
}


function UpdateBasketIcon(items) {

    let myUpdateElement = document.getElementById('basketProductText')
    myUpdateElement.innerHTML = items
}

function CreateNavBar(Categorydata) {

    navElement.innerHTML = ''

    let navHTML = ' <img id="navIcon" class="hidden" onClick="ToggleMenu()" src="assets/img/burger.svg"><section id="menuLists" class="menuListsLook">'


    Categorydata.forEach(superCatData => {

        // ul from category array

        let mySubCats = '<ul>'
        superCatData.subCategories.forEach(subCatName => {
            let myListElement = `<li><div class="navRollover"onClick="NavCallback('${subCatName}')">${subCatName}</div></li>`
            mySubCats += myListElement
        });
        mySubCats += '</ul>'

        //console.log(mySubCats);
        //console.log(superCat.superCategoryname);
        navHTML += `<div class="navCategories"><h3>${superCatData.superCategoryname}</h3>
        ${mySubCats}
        </div>`

    });
    navHTML += '</section>'

    navElement.innerHTML += navHTML
}
