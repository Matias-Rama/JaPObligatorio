

document.getElementById("btnSignIn").addEventListener("click", function()
{
   let email = document.getElementById("inputEmail");
   let pass = document.getElementById("inputPassword");

   /* if(email.value != "")
      document.body.style.backgroundColor = "red";
   if(pass.value != "")
      document.body.style.backgroundColor = "red";
   if(email.value.search("@") != -1)
      document.body.style.backgroundColor = "red"; */

   if(pass.value == "")
      pass.style.borderColor = "red";
   
   if(email.value == "" || email.value.search("@") == -1)   
      email.style.borderColor = "red";

   if(email.value != "" && pass.value != "" && email.value.search("@") != -1)
      document.body.style.backgroundColor = "red";   

   if(email.value != "" && pass.value != "" && email.value.search("@") != -1)
      window.location.assign("index.html");
}); 

document.getElementById("inputPassword").addEventListener("click",function(ev){ ev.target.style.borderColor = "grey"; });

document.getElementById("inputEmail").addEventListener("click", function(ev){ ev.target.style.borderColor = "grey"; });

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){} );

