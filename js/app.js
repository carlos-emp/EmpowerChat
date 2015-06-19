(function(){

  var listOfUsers = [];
  'use strict';
  var todosPAP={};
  var module = angular.module('app', ['onsen']);


  

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert(''+device.uuid);
      }, 100);
    };
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = todosPAP;
      
      return data;
  });




/*obtengo todos los datos de firebase y los muestro en pantalla*/
  module.controller('initializeLogin', function($scope, $data, $http) {
    
   

    $scope.Login = function(){
         Login();
    }

    /*mando a traer todos los datos del usuario*/
     getUser();
  });





 /*funcion para loguearse dentro del chat*/
function Login()
{
  /*obtengo el correo y el passqword*/
  var email_user_=$(".email-user").val().trim();
  var password_user_=$(".password-user").val().trim();

  /*valido los campos*/
  if(validateEmail(email_user_) && password_user_.length>1)
  {
      $(".error").addClass("hide");//quito el menssage por si existe
      
      /*ahora redireccionalo siempre y cuanod sea valido el correo y contraseña*/
      getLogin(email_user_,password_user_)
     
    

  }else{
     $(".error").removeClass("hide");
  }


   
 }


/*método para obtener los datos del login si es o no un usuario */
function getLogin(email,password){
  email_=email;
  password_=password;
  login=false;
  userObject=true;
  /*checo todos los usuarios registrados*/
   listOfUsers.forEach(function(value){
      if(email_==value.email && password_==value.Password)
      {
        userObject=value;
        login=true;
        return;
      }
   });
  /*Checo si se logio de forma correct*/
  if(login)
  {
    $.session.set("EmailUser",email_);
    $.session.set("PasswordUser",password_);
    $.session.set("ObjectUser",JSON.stringify(userObject));
    detectLogin();
  }else{/*si no es un usuario y contraseña correcta entonces muestro el mensaje*/
     $(".error").removeClass("hide");
  }

}

/*Obtengo todos los usuarios*/
function getUser(){
var myDataRef=new Firebase('https://userempowerlabs.firebaseio.com/');
myDataRef.on('child_added', function(nameSnapshot) {
        var nameSnapshott = nameSnapshot.val();//obtengo los objetos 
        var addUser = new Object();
        addUser.Name=nameSnapshott.name;
        addUser.Password=nameSnapshott.password;
        addUser.id=nameSnapshott.id;
        addUser.email=nameSnapshott.email;
        addUser.rol=nameSnapshott.rol;
        addUser.key=nameSnapshot.key();
        listOfUsers.push(addUser);

        } );

}


 //funcion para validar el correo
    function validateEmail( email ) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        {return false;}
      return true;
    }








 /*variables para saber si esta  o no logueado*/
 function detectLogin(){
  /*obtengo los valores*/
  var email_user_=$.session.get("EmailUser");
  var password_user_=$.session.get("PasswordUser");
   if(typeof($.session.get("ObjectUser"))=="undefined")
        {
            $.session.delete("EmailUser");
        }
        var Object_user_=JSON.parse($.session.get("ObjectUser"));
  if(typeof(email_user_)=='string' && typeof(password_user_)=='string')
  {
      if(Object_user_.rol="usuario")
      {
        window.location="chat.html" ;
      }else{
        window.location="admin.html";
      }
  }
 }
  

  detectLogin();

})();
