
function onSuccess(googleUser)
{
   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
   localStorage.flag = "false";
   window.location.assign("index.html");
}

function onFailure(error)
{
   console.log(error);
}

function signOut()
{
   gapi.auth2.getAuthInstance().auth2.signOut().then(function()
   {
      console.log('User signed out.');
   });
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

   if(pass.value.length === 0)
      pass.style.borderColor = "red";
   
   if(email.value.length === 0 || email.value.search("@") === -1)   
      email.style.borderColor = "red";

   if(email.value.length > 0 && pass.value.length > 0 && email.value.search("@") !== -1){
      localStorage.flag = "false";
      window.location.assign("index.html");
   }
} 

document.getElementById("inputPassword").addEventListener("click",function(ev){ ev.target.style.borderColor = "grey"; });

document.getElementById("inputEmail").addEventListener("click", function(ev){ ev.target.style.borderColor = "grey"; });

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){} );

