var products = [];

// ***** Mostrar comentarios del producto. *****
function showComments(comments)
{
   let commentsContainer = document.getElementById("productComments");
   commentsContainer.innerHTML = "";
   let raitingSum = 0;

   comments.forEach((prodComment, index) => 
   {
      // Nombre del usuario, comentario y fecha.
      raitingSum += prodComment.score;
      commentsContainer.innerHTML += `
         <div>
            <p id="userComment${index}"><strong> ${prodComment.user} </strong></p>
            <p style="white-space: pre;"> ${prodComment.description} </p>
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
   
   // Actualizamos la valoracion promedio del producto.
   document.getElementById("averageRaiting").innerHTML = `${raitingSum/comments.length}`;
}

// ***** Publicar un comentario acerca del producto. *****
function postComment()
{
   // Obtenemos la calificacion en cantidad de estrellas seleccionadas.
   let estrellas = Array.from(document.querySelectorAll("input[type='radio']"));
   let i = 0;
   while(i<5 && !estrellas[i].checked)
      i++;
   let calificacion = 5-i;

   // Debe puntuar para dejar un comentario.
   if(calificacion === 0)
      document.getElementById("noPuntuo").style.display = 'inline';
   else
   {
      document.getElementById("noPuntuo").style.display = 'none';
   
      let texto = document.getElementById("textComentario").value;
      // Debe justifiacar su puntuacion para dejar un comentario.
      if(texto === "")
         document.getElementById("noJustifico").style.display = 'inline';
      else
      {
         document.getElementById("noJustifico").style.display = 'none';
         document.getElementById("textComentario").value = "";
         i<5 ? estrellas[i].checked = false : undefined;

         let nombreUsuario = localStorage.getItem("usuario");
         // Obtenemos la fecha actual del sistema.
         let fechaActual = new Date();
         let time = `${fechaActual.getFullYear()}-${fechaActual.getMonth()+1}-${fechaActual.getDate()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

         // Creamos el comentario.
         let comentario = {
            "score": calificacion,
            "description": texto,
            "user": nombreUsuario,
            "dateTime": time
         };

         // Guardamos el comentario en local storage para que no se borre.
         let comentarios = JSON.parse(localStorage.getItem("comentarios"));
         comentarios.push(comentario);
         localStorage.setItem("comentarios", JSON.stringify(comentarios));
         showComments(comentarios);
      }
   }
}

// ***** Mostrar productos relacionados. *****
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

// ***** Mostrar las imagenes del producto. *****
function showProductImages(productImages)
{
   let listImages = document.getElementById("list-images");
   let imagesContainer = document.getElementById("productImages");

   // Colocamos las barritas para pasar imagenes.
   for(let i=0; i < productImages.length; i++)
   {
      if(i === 0)
      {
         listImages.innerHTML += `
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;
         continue;
      }
      listImages.innerHTML += `
         <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
   }

   // Colocamos las imagenes del producto.
   for(let i=0; i < productImages.length; i++) 
   {
      if(i === 0)
      {
         imagesContainer.innerHTML += `
            <div class="carousel-item active">
               <img class="d-block w-100" src="${productImages[0]}" alt="First slide">
            </div>`;
         continue;
      }
      imagesContainer.innerHTML += `
         <div class="carousel-item">
            <img class="d-block w-100" src="${productImages[i]}" alt="Second slide">
         </div>`;
   }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   
   getJSONData(PRODUCTS_URL).then(function(resultObj)
   {
      if(resultObj.status === 'ok')
      {
         // Corregimos las imagenes del Peugeot y del Susuki.
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
         // Si no hay comentarios en el local storage agregamos los del JSON.
         if(!localStorage.getItem("comentarios"))
            localStorage.setItem("comentarios", JSON.stringify(resultObj.data));
         showComments(JSON.parse(localStorage.getItem("comentarios")));
      }
   });
});