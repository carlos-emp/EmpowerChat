(function(){

    
/*PARA CREAR UN NUEVO USUARIO

var myDataRef = new Firebase('https://userempowerlabs.firebaseio.com/');

myDataRef.push({name:"Alejandro Luna Hernández",email:"alejandroisel@gmail.com",password:"123",id:1});
ENTRA A CONSAOLA Y PEGALO

*/

    var listOfUsers = [];/*lista de usuarios*/
    var listOfChat = [];/*lista de chats*/
    var listOfUsersGroup = [];/*lista de usuarios*/
    var listOfChatGroup = [];/*lista de chats*/
    var userChat = null;/*usuario con el cual quieres chatear*/
    var selectGroup = false;/*para saber si esta seleccionado un grupo o un chat directo*/
    'use strict';
    var todosPAP={};
    var module = angular.module('chat', ['onsen']);

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


    /*funcion parta quitar el mensaje de la parte superior derecha*/
    function intervalnoShowMessageInitial()
    {
      setInterval(function () {$(".gritter-close").click()}, 1400);
    }


    /*obtengo todos los datos de el php y los muestro en pantalla*/
    module.controller('initializeChat', function($scope, $data, $http) {

      
        intervalnoShowMessageInitial();/*quita el mensaje que se muestra ya que estorba */



        $scope.Logout = function(){
            Logout();
        }

        $scope.createGroup = function(){
            creatGroupChat();
        }

       



        getUser();//obtengo todos los datos de los usuario
        /*onbtengo todos los datos*/
        var myDataRef = new Firebase('https://chatempowelabs.firebaseio.com/');


        myDataRef.on('child_added', function(snapshot) {
    
            var message = snapshot.val();
            listOfChat.push(message);
            /*eventAddChat(message);*/
            showchatUserSelect();
            showNotification(message);/*muestra las notificaciones*/
        });

    });


 /*function create group*/
 function creatGroupChat(){
    var nameGroup=$("#nombre-grupo").val().trim();/*obtenemos el nombre del grupo*/
    var showError=$(".error.alert");
    if(nameGroup.length>0)/*valida el nombre del grupo*/
    {
      
      var selectUserGroup=false;
      userGoup=$($("#integrantes").find("input"));/*obtenemos a los integrantes del grupo*/
      var listUserGroup = [];
      for(var i=0;i< userGoup.length;i++)
      {
        if($(userGoup[i]).is(':checked'))/*checa que por lo menos uno de ellos sea seleccionado*/
           {
              userGoup[i].checked=false;
              listUserGroup.push(getUserObject($(userGoup[i]).attr("data-email")));//almaceno el objeto dle usuario que se selecciono
              selectUserGroup=true;
            }
      }

      /*checa si se selecciono al gun usuario para el grupo*/
      if(selectUserGroup)
      {
        $(".close").click();
        createGroup(listUserGroup,nameGroup);
        showError.addClass("hide");
      }else{
        showError.removeClass("hide");
        showError.text("Necesitas seleccionar a los usuarios para el grupo");
      }

     /*$($("#integrantes").find("input")[0]).is(':checked')*/
    }else{
      
      showError.removeClass("hide");
      showError.text("Necesitas colocar el nombre del grupo");
    }
 }
/*funcion que crea un grupo*/
function createGroup(listUserGroup,nameGroup)
    {
        var myDataRef = new Firebase('https://groupempowerlabs.firebaseio.com/');
        /*guarda el nuevo nombre del grupo*/
          var id_=listOfUsersGroup.length;
          if(id_==0 || id_==1)/*para que no empieze con un id=0*/
          {
            id_++;
          }
            myDataRef.push({group: listUserGroup, id: id_, name: nameGroup});
            $("#nombre-grupo").val("");
        
    }

    
    /*funcion para mostrar las notificaciones */
    function  showNotification(message_notification){

        var time_=jQuery.timeago(message_notification.datetime);/*obtengo el valor del tiempo en texto*/

        if(message_notification.name.email!=JSON.parse($.session.get("ObjectUser")).email && message_notification.userSend.email ==JSON.parse($.session.get("ObjectUser")).email)
        {

            var name=message_notification.name.Name;
            if(name.length>12)
            {
                name=name.substring(0,13)+"...";
            }

            $("#notification-"+message_notification.name.id).remove();
            var inyectData='<div class="desc" id="notification-'+message_notification.name.id+'" data-email="'+message_notification.name.email+'">'+
                '<div class="thumb">'+
                '<span class="badge bg-theme"><i class="fa fa-clock-o"></i></span>'+
                '</div>'+
                '<div class="details">'+
                '<p><muted>'+time_+'</muted><br/>'+
                '<a >'+name+'</a><br>'+message_notification.message+'<br/>'+
                '</p>'+
                '</div>'+
                '</div>';


            $(".content-notification").prepend(inyectData);
             var objectEventClick = $($(".content-notification").children()[$(".content-notification").children().length-1]);
             
             eventClickChatUser(objectEventClick);
        }

    }





/*evento para poder chatear con algun usuario*/
    function eventClickChatUser(objectEventClick){
      
      objectEventClick.click(function(userConnect) {
            selectGroup=false;
            if($(this).hasClass("desc"))/*significa que es una notificación*/
            {
              objectEventClick.remove();
            }
            $("#content-chat").removeClass("hide");
            $(".inyect-commit").html("");
            $("#chat-content").val("");
            clickUserChat($(this).attr("data-email"));
            /*userChat  tengo el usuario que se le dio click*/
            /*Se necesitan eliminar las notificaciones*/
            $("#notification-"+userChat.id).remove();
            /*ahora necesitas mostrar los chats correspondientes*/
            showchatUserSelect();
        });
    }

    /*funcion para mostrar los chats correspondientes al ausuario seleccionado*/
    function showchatUserSelect(){
      if(userChat==null)
        {return;}
      /*eventAddChat(message);*/
      $(".inyect-commit").html("");
      listOfChat.forEach(function(message){
        if((message.name.id==userChat.id && message.userSend.id==JSON.parse($.session.get("ObjectUser")).id) || (message.name.id==JSON.parse($.session.get("ObjectUser")).id && message.userSend.id==userChat.id)){

            eventAddChat(message);
          }
      });
      $(".inyect-commit").scrollTo(10000,0)/*mejorar la parte del scroll*/
    }

    /*funcion para mandar un chat a una persona correspondiete*/
    function sendChat(message_)
    {
        var myDataRef = new Firebase('https://chatempowelabs.firebaseio.com/');
        /*formato de fecha 2014-02-20T12:29:45*/
        if(userChat!=null)
        {
            myDataRef.push({name: JSON.parse($.session.get("ObjectUser")), message: message_ , userSend: userChat,datetime:moment().format()});
            $('#chat-content').val("");
        }else{

            alert("Necesitas seleccionar el usuario a quien mandar el mensaje");
            $('#chat-content').val(message_);
        }
    }

    /*Obtengo todos los usuarios*/
    function getUser(){
        var myDataRef=new Firebase('https://userempowerlabs.firebaseio.com/');
        myDataRef.on('value', function(nameSnapshot) {

            $("#nav-accordion").find("li").remove();/*limpio los usuario que estan mostrandose en el lateral izquierdo*/
            $("#integrantes").find("li").remove();/*limpio los usuario que estan mostrandose en el modal*/
            nameSnapshot.forEach(function(item_){
                var nameSnapshott = item_.val();//obtengo los objetos 
                var addUser = new Object();
                addUser.Name=nameSnapshott.name;
                addUser.Password=nameSnapshott.password;
                addUser.id=nameSnapshott.id;
                addUser.email=nameSnapshott.email;

                listOfUsers.push(addUser);
                /*No muestres a tu usuario*/
                if($.session.get("EmailUser")!=addUser.email)
                {
                    showUserConnect(addUser);
                    /*agregalo en el modal para crear un grupo*/
                    UseronGroup(addUser);
                }
            })
            getUsergroup();
            

        } );
    }


    /*Obtengo todos los grupos*/
    function getUsergroup(){
        var myDataRef=new Firebase('https://groupempowerlabs.firebaseio.com/');
        
        myDataRef.on('value', function(nameSnapshot) {
            $("#nav-accordion").find("li.chat-group").remove()
            
            nameSnapshot.forEach(function(item_){
                var nameSnapshott = item_.val();//obtengo los objetos 
                var addUser = new Object();
                addUser.UserGroup=nameSnapshott.group;
                addUser.id=nameSnapshott.id;
                addUser.Name=nameSnapshott.name;
                listOfUsersGroup.push(addUser);
                showUserGroup(addUser);
            })

            $("#loader").addClass("hide");

        } );
    }
/*función para mostrar los grupos que estan dados de alta*/
    function showUserGroup(UserGroup){
        var codeInyection='<li class="sub-menu  chat-group" data-id="'+UserGroup.id+'">'+
            '<a href="javascript:;" >'+
            '<i class="fa fa-desktop"></i>'+
            '<span>'+UserGroup.Name+'</span>'+
            '</a>'+
            '</li>';
        /*se usa prepend por que se necesita meter todos los usuarios posibles por conectar */
        $("#nav-accordion").append(codeInyection);
        var objectEventClick=$($("#nav-accordion").children()[$("#nav-accordion").children().length-1]);
        eventClickChatUserGroup(objectEventClick);//agrega elk evento de click
        
    }


/*evento para poder chatear con usuario de un grupo*/
    function eventClickChatUserGroup(objectEventClick){
      
      objectEventClick.click(function(userConnect) {
            selectGroup=true;

            $("#content-chat").removeClass("hide");
            $(".inyect-commit").html("");
            $("#chat-content").val("");
            clickUserChatGroup($(this).attr("data-id"));
            /*userChat  tengo el usuario que se le dio click*/
            /*Se necesitan eliminar las notificaciones de los grupos*/
            /*$("#notification-"+userChat.id).remove();*/
            /*ahora necesitas mostrar los chats correspondientes*/
           // showchatUserSelect();
        });
    }

    /*metodo para el click de un usuario */
    function clickUserChatGroup(userClickid){
        var objectUser=getUserObjectGroup(userClickid);
        if(userChat!=objectUser)
        {
            userChat=objectUser;

        }
        var name="";
        objectUser.UserGroup.forEach(function(item_){
            name+=item_.Name+" ,";
        });
        $("#header-chat").text(name);
    }


    /*metodo para obtener el objecto del usuario al que se le dio click mandando el correo */
    function getUserObjectGroup(userClickid){
        userClickEmail_=userClickid;
        ObjectUserGroup=null;
        listOfUsersGroup.forEach(function(value){
            if(userClickid==value.id)
            {
                ObjectUserGroup=value;
                return;
            }
        });
        return ObjectUserGroup;
    }





    /*agrega los usuario al modal para crear un nuevo grupo*/
    function UseronGroup(addUser){
      var codeInyection='<li class="sub-menu" data-email="'+addUser.email+'">'+
            '<a  >'+
            '<input type="checkbox" name="option2" value="user"  data-email="'+addUser.email+'"> '+
            '<span>'+addUser.Name+'</span>'+
            '</a>'+
            '</li>';
       $("#integrantes").append(codeInyection);

    }


    /*función para mostrar usuario en la barra lateral izquierda*/
    function showUserConnect(userConnect){
        var codeInyection='<li class="sub-menu" data-email="'+userConnect.email+'">'+
            '<a href="javascript:;" >'+
            '<i class="fa fa-desktop"></i>'+
            '<span>'+userConnect.Name+'</span>'+
            '</a>'+
            '</li>';
        /*se usa prepend por que se necesita meter todos los usuarios posibles por conectar */
        $("#nav-accordion").append(codeInyection);
        var objectEventClick=$($("#nav-accordion").children()[$("#nav-accordion").children().length-1]);
        eventClickChatUser(objectEventClick);//agrega elk evento de click
        
    }


    /*metodo para el click de un usuario*/
    function clickUserChat(userClickEmail){
        var objectUser=getUserObject(userClickEmail);
        if(userChat!=objectUser)
        {
            userChat=objectUser;

        }
        $("#header-chat").text(objectUser.Name);
    }






    /*metodo para obtener el objecto del usuario al que se le dio click mandando el correo */
    function getUserObject(userClickEmail){
        userClickEmail_=userClickEmail;
        ObjectUser=null;
        listOfUsers.forEach(function(value){
            if(userClickEmail==value.email)
            {
                ObjectUser=value;
                return;
            }
        });
        return ObjectUser;
    }


    /*obtengo el evento de enter en los text area*/
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });


                    ///ya tengo el comentario

                    if(attrs.action==="chat")
                    {
                        if(!selectGroup)
                        {/*esto es si es solo un chat directo con otra persona*/
                            var message=$("#chat-content").val().trim();
                            if(message.length>0)
                            {
                                sendChat(message);

                            }
                        }else{
                            alert("chat grupal  NO funcional jijijijj :)");
                        }
                    }


                    event.preventDefault();
                }
            });
        };
    });



    /*evento para agregar un chat*/
    function eventAddChat(data){


        var time_=jQuery.timeago(data.datetime);/*obtengo el valor del tiempo en texto*/
        var inyectHTML="";

        var message=data.message;
        var emoticons = {
          ':)'  : '1-feliz.gif',
          ':('  : 'enfadado.gif'
        }, url = "emoticonos/";
        // a simple regex to match the characters used in the emoticons
        message = message.replace(/[:\-)(D]+/g, function (match) {
          return typeof emoticons[match] != 'undefined' ?
                 '<img src="'+url+emoticons[match]+'" width="20px"/>' :
                 match;
        });


          


        if(data.name.email==JSON.parse($.session.get("ObjectUser")).email)
        {
            inyectHTML='<div class="mensaje-autor">'+/*Mensaje del usuario que inició sesión*/
                '<img width="50" src="https://desk-cdn.s3.amazonaws.com/unknown.png" class="img-circle"> '+/*Foto de perfil*/
                '<div class="flecha-derecha"></div>'+/* <!--Mensaje Alineado a la Izquierda-->*/
                '<div class="contenido">'+
                message+ /*<!--Mensaje-->*/
                '</div>'+
                '<div class="fecha">'+time_+'</div>'+/* <!--Hora-->*/
                '</div>';
        }else{
            inyectHTML='<div class="mensaje-amigo">'+ <!--Mensaje de otro contactol-->
                '<div class="contenido">'+
                    message+/* <!--Mensaje-->*/
                    '</div>'+
                    '<div class="flecha-izquierda"></div>'+/* <!--Mensaje Alineado a la Izquierda-->*/
                    '<img width="50" src="https://desk-cdn.s3.amazonaws.com/unknown.png" class="img-circle">'+/* <!--Foto de perfil-->*/
                    '<div class="fecha">'+time_+'</div>'/* <!--Hora-->*/
                '</div>';
        }



        $(".inyect-commit").append(inyectHTML);
        $("#commit-content").val("");

    }




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
    detectLogin();



})();
