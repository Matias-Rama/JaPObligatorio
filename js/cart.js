const CART_PRODUCTS = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

let showCosts = (cartProducts) => 
{
   let inputs = document.querySelectorAll("input[type='number']");
   let subtotal = 0;
   let costo_envio = 0;

   inputs.forEach((input, i) => 
   {
      subtotal += cartProducts[i].currency == "$" ? cartProducts[i].unitCost * input.value : cartProducts[i].unitCost * input.value * 40;
   });

   costo_envio = (document.querySelector('input[name="radio_envio"]:checked').value * subtotal) / 100;

   document.getElementById("subtotal").innerHTML = subtotal.toLocaleString();
   document.getElementById("costo_envio").innerHTML = costo_envio.toLocaleString();
   document.getElementById("total").innerHTML = (costo_envio + subtotal).toLocaleString();
}

let addInputsEvents = (cartProducts) =>
{
   let inputs = document.querySelectorAll("input[type='number']");
   let subtotals = document.querySelectorAll("td > strong");
   
   inputs.forEach((input, i) => 
   {
      input.addEventListener("input", event => 
      {
         subtotals[i].innerHTML = `${cartProducts[i].currency} ${(cartProducts[i].unitCost * event.target.value).toLocaleString()}`;
         showCosts(cartProducts);
      });
   });

}

let ShowCartProducts = (cartProducts) => 
{
   let tableBody = document.getElementById("table_body");

   cartProducts.forEach((product, index) => 
   {  
      tableBody.innerHTML += `
         <tr>
            <th scope="row">${index + 1}</th>
            <td><img class="d-block w-100" src="${product.src}" style="max-width: 90px; margin-left: 80px"></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost.toLocaleString()}</td>
            <td><input id="input${index}" type="number" class="form-control" value="${product.count}" min="${1}" style="max-width: 80px; margin-left: 80px;"></td>
            <td><strong id="subtotal${index}">${product.currency} ${(product.unitCost * product.count).toLocaleString()}</strong></td>
         </tr>`
      ;
   });   
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   let cartProducts = [];

   getJSONData(CART_PRODUCTS).then(function(resultObj)
   {
      if(resultObj.status === "ok"){
         cartProducts = resultObj.data.articles;
         // Corregismos la imagen del susuki
         cartProducts[1].src = "img/prod4.jpg";

         // Corregimos las monedas
         cartProducts.forEach(product => 
         {
            product.currency = product.currency == "UYU" ? "$" : "U$S"; 
         });
         
         ShowCartProducts(cartProducts);
         addInputsEvents(cartProducts);
         showCosts(cartProducts);
      }
   });

   document.querySelectorAll("input[type='radio']").forEach(inputRadio => 
   {
      inputRadio.addEventListener("click", () => 
      {
         showCosts(cartProducts);
      });
   });   
});