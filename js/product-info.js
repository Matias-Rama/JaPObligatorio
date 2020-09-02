var products = [];

function showRelatedProducts(releatedProducts)
{
   let releatedContainer = document.getElementById("releatedProducts");
   
   releatedProducts.forEach(relIndex => 
   {
      releatedContainer.innerHTML += `
         <a href="product-info.html" class="card custom-card" style="max-width: 200px;">
            <img class="card-img-top" src="${products[relIndex].imgSrc}">
            <div class="card-body">
               <h6 class="card-title"> <strong>${products[relIndex].name}</strong> </h6>
               <p class="card-text">${products[relIndex].currency} ${products[relIndex].cost}</p>
            </div>
         </a>`;
   });
}

function showProductImages(productImages)
{
   let listImages = document.getElementById("list-images");
   let imagesContainer = document.getElementById("productImages");

   // Colocamos las barritas para pasar imagenes.
   listImages.innerHTML += `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;
   for(let i=1; i < productImages.length; i++)
   {
      listImages.innerHTML += `
         <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
   }

   // Colocamos las imagenes del producto.
   imagesContainer.innerHTML += `
      <div class="carousel-item active">
         <img class="d-block w-100" src="${productImages[0]}" alt="First slide">
      </div>`;
   for(let i=1; i < productImages.length; i++) 
   {
      imagesContainer.innerHTML += `
         <div class="carousel-item">
            <img class="d-block w-100" src="${productImages[i]}" alt="Second slide">
         </div>`;
   }
}

function showComments(comments)
{
   let commentsContainer = document.getElementById("productComments");
   let raitingSum = 0;

   comments.forEach((prodComment, index) => 
   {
      // Nombre del usuario, comentario y fecha.
      raitingSum += prodComment.score;
      commentsContainer.innerHTML += `
         <div>
            <p id="userComment${index}"><strong> ${prodComment.user} </strong></p>
            <p> ${prodComment.description} </p>
            <p> ${prodComment.dateTime} </p>
         </div>`;

      let userComment = document.getElementById(`userComment${index}`); 
      // Valoracion del usuario.
      for(let i=0; i<prodComment.score; i++)
      {
         userComment.innerHTML += `
            <span class="fas fa-star checked"></span>`;
      }
      // Estrellas restantes. 
      for(let i=prodComment.score; i<5; i++)
      {
         userComment.innerHTML += `
            <span class="fas fa-star"></span>`;
      }
   });
   
   document.getElementById("averageRaiting").innerHTML = `${raitingSum/comments.length}`;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   
   getJSONData(PRODUCTS_URL).then(function(resultObj)
   {
      if(resultObj.status === 'ok')
      {
         // Corregimos las imagenes del Peugeot y del Susuki
         let aux = resultObj.data[2].imgSrc;
         resultObj.data[2].imgSrc = resultObj.data[3].imgSrc;
         resultObj.data[3].imgSrc = aux;

         products = resultObj.data;
      }
   });

   getJSONData(PRODUCT_INFO_URL).then(function(resultObj)
   {
      if(resultObj.status === 'ok')
      {
         let product = resultObj.data;
         product.cost = "13.500";

         document.getElementById("productName").innerHTML = `<strong>${product.name}</strong>`;
         document.getElementById("productPrice").innerHTML = `<em> ${product.currency} ${product.cost} </em>`;
         document.getElementById("productSoldCount").innerHTML = `${product.soldCount} vendidos`;
         document.getElementById("productDescription").innerHTML = `${product.description}`;

         showProductImages(product.images);
         showRelatedProducts(product.relatedProducts);         
      }
   });

   getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj)
   {
      if(resultObj.status === 'ok')
      {
         showComments(resultObj.data);
      }
   });
});