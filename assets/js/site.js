
// globals
const productSection = document.getElementById('ShowProduct');
const navElenent = document.getElementById('navigation');
const secondaryElements = document.getElementById('secondary');
const basketMe = document.getElementById('basket');
const forthElement = document.getElementById('Forth');
const showMessage = document.getElementById('alert');

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




function Categoriesrecived(CategoryData) {
    // hoved kategori arrays
    let myElectronics = []
    let myCosmetics = []
    let myVehicles = []
    let womensFashion = []
    let mensFashion = []
    let myMisc = []

    CategoryData.forEach(category => {

        switch (category) {

            case 'laptops':
            case 'lighting':
            case 'smartphones':

                myElectronics.push(category)
                break;

            case 'fragrances':
            case 'skincare':
                myCosmetics.push(category)

                break;

            case 'automotive':
            case 'motorcycle':
                myVehicles.push(category)

                break;

            case 'tops':
            case 'womens-dresses':
            case 'womens-shoes':
            case 'womens-watches':
            case 'womens-bags':
            case 'womens-jewellery':

                womensFashion.push(category)

                break;

            case 'tops':
            case 'mens-shirts':
            case 'mens-shoes':
            case 'mens-watches':
                mensFashion.push(category)

                break;

            default:

                myMisc.push(category)
                break;
        }

    });

    // add all to misc
    myMisc.push('All')
       // build datastructure to view code
       let myNavigationData = [
        {
            superCategoryname: 'Electronics',
            subCategories: myElectronics
        },
        {
            superCategoryname: 'Cosmetics',
            subCategories: myCosmetics
        },
        {
            superCategoryname: 'Vehicles',
            subCategories: myVehicles
        },
        {
            superCategoryname: 'mens fashion',
            subCategories: mensFashion
        },
        {
            superCategoryname: 'womans fashion',
            subCategories: womensFashion
        },
        {
            superCategoryname: 'misc',
            subCategories: myMisc
        }
    ]



    CreateNavBar(myNavigationData)
}


function CreateNavBar(Categorydata) {

    navElenent.innerHTML = ''

    let navHTML = ' <section id="menuLists" class="menuListsLook">'


    Categorydata.forEach(superCatData => {

        // ul from category array

        let mySubCats = '<ul>'
        superCatData.subCategories.forEach(subCatName => {
            let myListElement = `<li><div class="navRollover"onClick="NavigationCallback('${subCatName}')">${subCatName}</div></li>`
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

    navElenent.innerHTML += navHTML

}



// Create navigation bar 

/*
function CreateNavigation(categoryArray) {


    // temporary code
    let myHtml = ""
    myHtml += `<div class="myDiv" onclick="NavigationCallback('all')" >All</div>`
    categoryArray.forEach((category) => {
        myHtml += `<nav> <ul><li onclick="NavigationCallback('${category}')" >${category}</li></ul></nav>`
        
    });


    navElenent.innerHTML = myHtml
}

*/





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
    clearAppMe()

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
function insertCard(newId) {



    console.log(newId);
    let myClickedProduct = null


    myProducts.forEach(product => {

        if (product.id == newId) {
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


// Count the number of product in the local storage and show with Id front the basket





  // Update count display on page load

  var elementCount = 0;


  // Iterate through local storage keys and count elements within arrays
  for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var storedValue = localStorage.getItem(key);
  
      // Check if the stored value is not null or undefined
      if (storedValue !== null && storedValue !== undefined) {
          try {
              // Parse the stored value as JSON
              var parsedValue = JSON.parse(storedValue);
  
              // Check if the parsed value is an array
              if (Array.isArray(parsedValue)) {
                  // Increment the count by the number of elements in the array
                  elementCount = parsedValue.length;
              }
          } catch (error) {
              // Handle JSON parsing errors if any
              console.error('Error parsing JSON for key', key, ':', error);
          }
      }
  }
  
      var paragraph = document.createElement('span');
      paragraph.textContent = elementCount;
  
       basketMe.appendChild(paragraph);






//using a onclick function pushing new data to the local storage

function insertCard(myList) {
        
    
        console.log(myList);
    let myClickedProduct = null


    myProducts.forEach(product => {

        if (product.id == myList) {
            myClickedProduct = product

            console.log(product.price);


if (typeof(Storage) !== "undefined") {
    // Retrieve existing data from local storage
    var existingData = localStorage.getItem('ShoppingCars');

    // Parse existing data or initialize an empty array if no data exists
    var dataArray = existingData ? JSON.parse(existingData) : [];

    let myObject = {
        title: product.title,
        id: product.id,
        price: product.price,
        thumbnail: product.images[0],
        description: product.description
    };
     dataArray.push(myObject);

    localStorage.setItem('ShoppingCars', JSON.stringify(dataArray));


    console.log("New data has been pushed to local storage.");
    const dataAdd = document.createElement('h3');
    dataAdd.textContent = "New data has been pushed to local storage";

    showMessage.appendChild(dataAdd);
    
} else {
    console.log("Local storage is not supported in this browser.");
}

        }
    }
    )    

    const newElement = elementCount + 1;
    paragraph.textContent = newElement;

    basketMe.appendChild(paragraph);

 }





// ------------------------------ 

function cartView() {

// Retrieve the array from local storage
var storedArray = localStorage.getItem('ShoppingCars');

// Check if the array exists in local storage
if (storedArray !== null) {


    try {
        // Parse the array from its string representation
        var myArray = JSON.parse(storedArray);

        // Now you can access the values in the array
        console.log('Values in the array:');
   //     myArray.forEach(function(value, index) {

   let test = '<div>'
         myArray.forEach(function(value, index) {
            // console.log('Index', index, ':', value);

            console.log(value.title);
            console.log(value.id);
            console.log(index);

           
        


    let myHTML = `<section id="basketProduct" class="basketProduct"><img class="image" src="${value.thumbnail}"> <h2>${value.title}</h2><h3>${value.price}</h3>
    <p>${value.description}</p> <span onclick="deleteItem(${value.id})"> Delete </span></section>
    `   
    test += myHTML
            test += '</div>'
    productSection.innerHTML = ""
    forthElement.innerHTML = myHTML 


        } );

    } 
    

    catch (error) {
        console.error('Error parsing array:', error);
    }
} 
else {
    console.log('No array found in local storage.');
}

}








        // Delete product from local storage using id
function deleteItem(productId) {
    // Retrieve the array from local storage
    var productsString = localStorage.getItem('ShoppingCars');

    // Check if the array exists in local storage
    if (productsString) {
        // Parse the JSON string into a JavaScript array
        var products = JSON.parse(productsString);

        // Find the index of the item with the matching product ID
        var indexToDelete = -1;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === productId) {
                indexToDelete = i;
                break;
            }
        }


        // Check if the item was found
        if (indexToDelete !== -1) {
            // Remove the item from the array
            products.splice(indexToDelete, 1);

            // Update the local storage with the modified array
            localStorage.setItem('ShoppingCars', JSON.stringify(products));
            console.log('Product with ID ' + productId + ' deleted successfully.');

            //use -1 to encrease numbers of products in basket
     
                const thirdElemennt = elementCount - 1;
                paragraph.textContent = thirdElemennt;
            
                basketMe.appendChild(paragraph);
           
            
        } else {
            console.log('Product with ID ' + productId + ' not found in the array.');
        }
    } else {
        console.log('No products found in local storage.');

    }

}

var productIdToDelete = 'productId'; //I use product ID to delete Item
deleteItem(productIdToDelete);
















// view code
function clearApp() {
    productSection.innerHTML = ""
}



function clearAppMe() {
    forthElement.innerHTML = ""
}


// change image single page
function changeImage(newImage) {
    document.getElementById('imgLarge').src = newImage;
  }

  function closeBox() {
    showMessage.style.display="none";
  }
  







