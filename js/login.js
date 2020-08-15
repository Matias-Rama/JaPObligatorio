
function onSuccess(googleUser)
{
   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
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
   let email = document.getElementById("inputEmail").value;
   let pass = document.getElementById("inputPassword").value;

   if(pass == "")
      pass.style.borderColor = "red";
   
   if(email == "")   
      email.style.borderColor = "red";

   if(email != "" && pass != ""){
      localStorage.usuario = email;
      localStorage.pass = pass;
      /* document.body.style.backgroundColor = "red"; */
      window.location.assign("index.html");
   }
} 

document.getElementById("inputPassword").addEventListener("click",function(ev){ ev.target.style.borderColor = "grey"; });

document.getElementById("inputEmail").addEventListener("click", function(ev){ ev.target.style.borderColor = "grey"; });

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){} );