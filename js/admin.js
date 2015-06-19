(function(){

    var idNuevo=0;
    var contacto="";
    var listOfUsers = [];/*lista de usuarios*/
    'use strict';
    var todosPAP={};
    var module = angular.module('admin', ['onsen']);

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


  


    /*obtengo todos los datos necesarios para el administrador*/
    module.controller('initializeadmin', function($scope, $data, $http) {

      
       



        $scope.register = function(){
            registerUSer();
        }
        
        $scope.Logout=function(){
            Logout();
        }
       
       
        /*obtengo los datos de los usuarios*/
        var myDataRef = new Firebase('https://userempowerlabs.firebaseio.com');
            
           
            myDataRef.on('child_added', function(snapshot) {
                var user = snapshot.val();
                var addUser = new Object();
                addUser.name=user.name;
                addUser.Password=user.password;
                addUser.id=user.id;
                addUser.email=user.email;
                addUser.rol=user.rol;
                listOfUsers.push(addUser);
                displayChatMessage(user.email,user.id,user.name, user.password, user.rol);
            });

    });

    /*funcion para el registro de un nuevo usuario*/
    function registerUSer(){
        var myDataRef = new Firebase('https://userempowerlabs.firebaseio.com');
                var email = $('#emailInput').val().trim();
                var name = $('#nameInput').val().trim();
                var role = $('#roleInput').val().trim();
                var password = $('#passwordInput').val().trim();
                /*obtengo todos los valores*/
                
                if(validateEmail(email))
                {
                    if(password.length>0)
                    {
                        if(name.length>0)
                        {
                            if(validateUseEmail(email))
                            {
                                $(".error").addClass("hide");
                                var id = idNuevo+1
                                myDataRef.push({email: email, id:id, name: name, password: password, rol: role});
                                $('#messageInput').val('');
                                showMessage("Usuario registrado correctamente");
                                $('#emailInput').val("");
                                $('#nameInput').val("");
                                $('#roleInput').val("Seleccione Rol");
                                $('#passwordInput').val("");
                            }else{
                                 showMessage("El correo ya fue utilizado anteriormente");
                            }
                        }else{
                            showMessage("Necesita proporcionar el nombre del usuario");
                        }
                    }else{
                        showMessage("Necesita proporcionar una contraseña");
                    }
                }else {
                    showMessage("Correo inválido");
                }

    }
    /*funcion para mostrar mensaje*/
    function showMessage(message)
    {
        $(".error").text(message);
        $(".error").removeClass("hide");
    }

    /*función para validar que el correo no ha sido utilizado*/
    function validateUseEmail(validateEmail_){
        var validate=true;
        if(listOfUsers.length==0)
        {
            validate=false;
        }
        listOfUsers.forEach(function(item_){
            if(item_.email==validateEmail_)
            {
                validate=false;
            }
        });
        return validate;
    }

     //funcion para validar el correo
    function validateEmail( email ) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        {return false;}
      return true;
    }




            /*función para mostrar los usuarios dados de alta*/
            function displayChatMessage(email, id ,name, password, rol) {


                contacto+='<div class="col-xs-12 col-sm-6 col-md-4"><div class="fondoAzul colorBlanco" align="center">'+
                    email+
                    '</div>'+
                    '<div class="fondoBlanco padding-min"><b>ID:</b> ' +
                    id+'<br><b>Nombre:</b> '+name+'<br><b>Rol: </b>'+rol+
                    '</div><br></div>';




                $('#usersDiv').append(contacto);

                $('#usersDiv')[0].scrollTop = $('#usersDiv')[0].scrollHeight;
                idNuevo++;
                contacto="";
            };

             /*funcion para cerrar sesion*/
    function Logout()
    {

        //elimino las cookies
        $.session.remove("EmailUser");
        $.session.remove("PasswordUser");
        detectLogin();


    }

    /*variables para saber si esta  o no logueado*/
    function detectLogin(){
        /*obtengo los valores*/
        var email_user_=$.session.get("EmailUser");
        var password_user_=$.session.get("PasswordUser");
        var Object_user_=JSON.parse($.session.get("ObjectUser"));
        if(typeof(email_user_)=='string' && typeof(password_user_)=="string")
        {
            $(".email-user").text(Object_user_.Name)

        }else{
            window.location="chat-login.html";
        }
    }



})();
