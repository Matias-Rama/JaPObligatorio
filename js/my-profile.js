
document.getElementById("guardarCambios").addEventListener("click", e => 
{
   let nombreTxt = document.getElementById("nombre").value;
   let apellidoTxt = document.getElementById("apellido").value;
   let correoTxt = document.getElementById("correo").value;
   let edadTxt = document.getElementById("edad").value;
   let telefonoTxt = document.getElementById("telefono").value;

   let datos = 
   {
      nombre: nombreTxt,
      apellido: apellidoTxt,
      correo: correoTxt,
      edad: edadTxt,
      telefono: telefonoTxt,
   }

   localStorage.setItem("datosUsuario", JSON.stringify(datos));

   $("#alert").fadeIn(); 
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

   let datosString = localStorage.getItem("datosUsuario");

   if(datosString !== null)
   {
      datosObject = JSON.parse(datosString);

      document.getElementById("nombre").value = datosObject.nombre;
      document.getElementById("apellido").value = datosObject.apellido;
      document.getElementById("correo").value = datosObject.correo;
      document.getElementById("edad").value = datosObject.edad;
      document.getElementById("telefono").value = datosObject.telefono;
   }

   // Mostrar y guardar imagen en local storage.
   let img = document.getElementById("imgPerfilElement");
   if(!localStorage.getItem("imgPerfil"))
      localStorage.setItem("imgPerfil", "https://i.ibb.co/phrqg9g/perfil-hombre.jpg");
   img.src = localStorage.getItem("imgPerfil");
});
   
document.querySelectorAll("input").forEach(input => 
{
   input.addEventListener("input", e => 
   {
      document.getElementById("guardarCambios").disabled = false;
   });
});