
// Muestra los productos en forma de lista.
function showProductsList(array){

   let aux = array[2].imgSrc;
   array[2].imgSrc = array[3].imgSrc;
   array[3].imgSrc = aux;

   let htmlContentToAppend = "";
   for(let i = 0; i < array.length; i++){
      let category = array[i];

      document.getElementById("cat-list-container").innerHTML += `
      <div class="list-group-item list-group-item-action shadow">
         <div class="row">
            <div class="col-3">
               <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
            </div>
            <div class="col">
               <div class="d-flex w-100 justify-content-between">
                  <h4 class="pb-4"> <strong>${category.name}</strong> </h4>
                  <small class="text-muted">${category.soldCount} artículos</small>
               </div>
               <p class=""> 
                  ${category.description} <br> 
                  ${category.currency} ${category.cost} 
               </p>
            </div>
         </div>
      </div>`
   }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
   getJSONData(PRODUCTS_URL).then(function(resultObj){
      if(resultObj.status === "ok")
         showProductsList(resultObj.data);
   })
});