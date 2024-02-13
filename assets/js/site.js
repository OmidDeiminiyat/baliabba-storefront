
GetProductData()

function GetProductData(){
    fetch('https://dummyjson.com/products')
    .then((result) => {
        return result.json();
    })
    .then((json) => {
        ProductRecived(json);
    });
}



function ProductRecived(ProductData) {
     console.log(ProductData);

     console.log(ProductData.products[4]);
     let MyProduct = [];
     MyProduct.push(ProductData.products[4],ProductData.products[5],ProductData.products[9]);
     

 const Price = MyProduct[0].price;
console.log(Price);

const Title = MyProduct[0].title;
console.log(Title);

const Desctip = MyProduct[0].description;
console.log(Desctip);

const Image = MyProduct[0].thumbnail;
console.log(Image);
    // let myProducts = ProductData.products
    // console.log(myProducts[8]);
   const myTitle = document.getElementById('title');

   const image = document.createElement('img');
   image.src = MyProduct[0].thumbnail;
   
   const title = document.createElement('h2');
      title.textContent = MyProduct[0].title;

      const price = document.createElement('h4');
      price.textContent = MyProduct[0].price;

      const desc = document.createElement('p');
      desc.textContent = MyProduct[0].description;



      myTitle.appendChild(price);
      myTitle.appendChild(title);
      myTitle.appendChild(desc);
      myTitle.appendChild(image);
    

 
    
}
