const CART_PRODUCTS = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
var cartProducts = []

/* ***** Actualiza el costo total, subtotal y costo de envio ***** */
let showCosts = () => 
{
   // Conseguimos todos los inputs con las cantidades de cada producto.
   let inputs = document.querySelectorAll("input[type='number']");
   let subtotal = 0;
   let costo_envio = 0;

   inputs.forEach((input, i) => 
   {
      let productIndex = input.getAttribute("name");
      subtotal += cartProducts[productIndex].currency == "$" ? cartProducts[productIndex].unitCost * input.value : cartProducts[productIndex].unitCost * input.value * 40;
   });

   // Establecemos el costo de envio obteniendo el input de tipo radio marcado.
   costo_envio = (document.querySelector('input[name="radio_envio"]:checked').value * subtotal) / 100;

   document.getElementById("subtotal").innerHTML = subtotal.toLocaleString();
   document.getElementById("costo_envio").innerHTML = costo_envio.toLocaleString();
   document.getElementById("total").innerHTML = (costo_envio + subtotal).toLocaleString();
}

/* ***** Agrega eventos a los input con las cantidades de los productos ***** */
let addInputsEvents = () =>
{
   // Conseguimos todos los inputs con las cantidades de cada producto.
   let inputs = document.querySelectorAll("input[type='number']");
   // Conseguimos la columna de los subtotales
   let subtotals = document.querySelectorAll("td > strong");
   
   inputs.forEach((input, i) => 
   {
      input.addEventListener("input", event => 
      {
         subtotals[i].innerHTML = `${cartProducts[i].currency} ${(cartProducts[i].unitCost * event.target.value).toLocaleString()}`;
         showCosts();
      });
   });

}

/* ***** Agrega los productos del carrito a la tabla ***** */
let ShowCartProducts = () => 
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
            <td><input name="${index}" type="number" class="form-control" value="${product.count}" min="${1}" style="max-width: 80px; margin-left: 80px;"></td>
            <td><strong id="subtotal${index}">${product.currency} ${(product.unitCost * product.count).toLocaleString()}</strong></td>
            <td><a href="#" onclick="javascript:eliminarFila(this);"><i class="fa fa-trash"></i></a></td>
         </tr>`
      ;
   });   
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
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
         
         ShowCartProducts();
         addInputsEvents();
         showCosts();
      }
   });

   // Agregamos los eventos a los inputs de envio para actualizar los costos
   document.querySelectorAll("input[name='radio_envio']").forEach(inputRadioEnvio => 
   {
      inputRadioEnvio.addEventListener("click", () => 
      {
         showCosts();
      });
   });   

   // Agregamos los eventos a los inputs de pago para habilitar los correspondientes.
   document.querySelectorAll("input[name='radio_pago']").forEach(inputRadioPago => 
   {
      inputRadioPago.addEventListener("click", () => 
      {
         let inputChecked = document.querySelector('input[name="radio_pago"]:checked');

         switch(inputChecked.value)
         {
            case "credito":
               document.getElementsByClassName("credito").forEach(inputsCredito => 
               {
                  inputsCredito.disabled = false;
               });
               document.getElementById("transBancaria").disabled = true;
               break;

            case "transBancaria":
               document.getElementsByClassName("credito").forEach(inputsCredito => 
               {
                  inputsCredito.disabled = true;
               });
               document.getElementById("transBancaria").disabled = false;
               break;
         }
      });
   });

   // Agreagamos evento al boton acptar del modal.
   document.getElementById("modal_aceptar").addEventListener("click", () => 
   {
      $('#modal_forma_pago').modal('hide');
   });

   document.getElementById("finalizarCompra").addEventListener('click', () => 
   {
      let compraValida = true;
      let inputsDireccion = document.querySelectorAll('input.direccion');
      inputsDireccion.forEach(input => 
      {
         if(input.value == "")
            compraValida = false;
      });
      if(compraValida)
         $(".alert").hide().show('medium');
      else
      {
         inputsDireccion.forEach(input => 
         {
            // estilos supongo...
         });
      }
   });

});
   
function eliminarFila(boton){
   let rowIndex = boton.parentElement.parentElement.rowIndex;
   // Eliminamos la fila de la tabla
   document.getElementById("table").deleteRow(rowIndex);
   // Volvemos a calcular los costos
   showCosts();
};