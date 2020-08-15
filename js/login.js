
function onSuccess(googleUser)
{
   localStorage.usuario = googleUser.getBasicProfile().getName();
   localStorage.pass = "Google no me da la contraseña :("
   window.location.assign("index.html");
}

function onFailure(error)
{
   console.log(error);
}

function renderButton()
{
   gapi.signin2.render('my-signin2', 
   {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
   });
}

function signIn()
{
   let email = document.getElementById("inputEmail");
   let pass = document.getElementById("inputPassword");

   if(email.value != "" && pass.value != ""){
      if(!localStorage.getItem("usuario"))
         localStorage.setItem("usuario", email.value);
      else
         localStorage.usuario = email.value;

      if(!localStorage.getItem("pass"))
         localStorage.setItem("pass", email.pass);
      else
         localStorage.pass = pass.value;

      window.location.assign("index.html");
   }
      /* alert("Debe ingresar un nombre de usuario y contraseña.") */
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){} );