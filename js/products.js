const ORDER_ASC_BY_PRICE = ">$";
const ORDER_DESC_BY_PRICE = "$<";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentProductsArray = [];
var minPrice = undefined;
var maxPrice = undefined;

function addMoreProducts(products)
{
   let bmwM4 = {
      "name": "BMW M4 Competition",
      "description": "Generación 2020, la variante más extrema de la familia Serie 4 de BMW, deportivo de aspecto fiero y formato coupé.",
      "cost": 95000,
      "currency": "USD",
      "imgSrc": "img/prod5.jpg",
      "soldCount": 5
   };
   let mitsubishiEclipseCross = {
      "name": "Mitsubishi Eclipse Cross",
      "description": "Todocamino con motor 1.5 gasolina turboalimentado con 163 CV.",
      "cost": 19550,
      "currency": "USD",
      "imgSrc": "img/prod6.jpg",
      "soldCount": 13
   };
   let citroenC3 = {
      "name": "Citroën C3",
      "description": "Dispone de motorizaciones de última generación PureTech, eficientes y de reducido consumo y emisiones.",
      "cost": 13999,
      "currency": "USD",
      "imgSrc": "img/prod7.jpg",
      "soldCount": 22
   };
   
   products.push(citroenC3);
   products.push(bmwM4);
   products.push(mitsubishiEclipseCross);
}

function sortProducts(products, criterion)
{
   if(criterion === ORDER_ASC_BY_PRICE)
   {
      products.sort(function(a, b)
      {
         if(a.cost > b.cost){ return -1;}
         if(a.cost < b.cost){ return 1;}
         return 0;
      })
   }else if(criterion === ORDER_DESC_BY_PRICE) 
   {
      products.sort(function(a, b)
      {
         if(a.cost > b.cost){ return 1;}
         if(a.cost < b.cost){ return -1;}
         return 0;
      })
   } else if(criterion === ORDER_BY_SOLD_COUNT)
   {
      products.sort(function(a, b)
      {
         if(a.soldCount > b.soldCount){ return -1}
         if(a.soldCount < b.soldCount){ return 1}
         return 0;
      })
   }
   return products;
}

// Muestra los productos en forma de lista.
function showProductsList(array){

   document.getElementById("cat-list-container").innerHTML = ``;   
   for(let i = 0; i < array.length; i++){
      let product = array[i];

      if((minPrice == undefined || parseInt(product.cost) >= minPrice) && 
         (maxPrice == undefined || parseInt(product.cost) <= maxPrice)){
         
         document.getElementById("cat-list-container").innerHTML += `
         <div class="list-group-item list-group-item-action shadow">
            <div class="row">
               <div class="col-3">
                  <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
               </div>
               <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                     <h4 class="pb-4"> <strong>${product.name}</strong> </h4>
                     <small class="text-muted">${product.soldCount} artículos</small>
                  </div>
                  <p class="lead"><em> ${product.currency} ${product.cost} </em></p>
                  <p class="lead"> ${product.description} </p>
               </div>
            </div>
         </div>`
      }   
   }
}

function showAndSortProducts(criterion, products)
{
   if(products != undefined)
      currentProductsArray = products;

   showProductsList(sortProducts(currentProductsArray, criterion));
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
   getJSONData(PRODUCTS_URL).then(function(resultObj){
      if(resultObj.status === "ok")
      {
         // Corregimos las imagenes del Peugeot y del Susuki
         let aux = resultObj.data[2].imgSrc;
         resultObj.data[2].imgSrc = resultObj.data[3].imgSrc;
         resultObj.data[3].imgSrc = aux;

         // Agregamos mas productos
         addMoreProducts(resultObj.data);

         currentProductsArray = resultObj.data;
         showAndSortProducts(ORDER_ASC_BY_PRICE, resultObj.data);
      }
   });

   document.getElementById("sortAscPrice").addEventListener("click", function(){
      showAndSortProducts(ORDER_ASC_BY_PRICE, undefined);
   });

   document.getElementById("sortDescPrice").addEventListener("click", function(){
      showAndSortProducts(ORDER_DESC_BY_PRICE, undefined);
   });

   document.getElementById("sortBySoldCount").addEventListener("click", function(){
      showAndSortProducts(ORDER_BY_SOLD_COUNT, undefined);
   });

   document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;

      showProductsList(currentProductsArray);
   });

   document.getElementById("rangeFilterPrice").addEventListener("click", function(){
      //Obtengo el mínimo y máximo de los intervalos para filtrar por precio los productos.
      minPrice = document.getElementById("rangeFilterPriceMin").value;
      maxPrice = document.getElementById("rangeFilterPriceMax").value;

      if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
         minPrice = parseInt(minPrice);
      }
      else{
         minPrice = undefined;
      }

      if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
         maxPrice = parseInt(maxPrice);
      }
      else{
         maxPrice = undefined;
      }

      showProductsList(currentProductsArray);
   });

   document.getElementById("search").addEventListener("keyup", function(ev)
   {  
      let searchTerms = document.getElementById("search").value;

      document.getElementById("cat-list-container").innerHTML = ``;
      
      for(let i = 0; i < currentProductsArray.length; i++){
         let product = currentProductsArray[i];
         let nombreAuto = product.name.toString();
         if(nombreAuto.includes(searchTerms)){
            document.getElementById("cat-list-container").innerHTML += `
            <div class="list-group-item list-group-item-action shadow">
               <div class="row">
                  <div class="col-3">
                     <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                  </div>
                  <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                        <h4 class="pb-4"> <strong>${product.name}</strong> </h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                     </div>
                     <p class="lead"><em> ${product.currency} ${product.cost} </em></p>
                     <p class="lead"> ${product.description} </p>
                  </div>
               </div>
            </div>`
         }
      }
   });

});
