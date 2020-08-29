
function onSuccess(googleUser)
{
   localStorage.setItem("usuario", googleUser.getBasicProfile().getName());
   localStorage.setItem("pass", "Google no me da la contraseña :(");
   localStorage.setItem("img", googleUser.getBasicProfile().getImageUrl());
   
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
      localStorage.setItem("usuario", email.value);
      localStorage.setItem("pass", email.pass);
      
      window.location.assign("index.html");
   }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){} );