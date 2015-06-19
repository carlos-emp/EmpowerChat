(function(){

    
/*PARA CREAR UN NUEVO USUARIO

var myDataRef = new Firebase('https://userempowerlabs.firebaseio.com/');

myDataRef.push({name:"Alejandro Luna Hernández",email:"alejandroisel@gmail.com",password:"123",id:1});
ENTRA A CONSAOLA Y PEGALO


PAra actualizar ne firebase elimina el usuario
var usersRef = ref.child("-Js5xXsykMRwVtW0-yXk");
usersRef.remove();


'https://chatempowelabs.firebaseio.com/'
'https://chatgroupempowerlabs.firebaseio.com/'
'https://groupempowerlabs.firebaseio.com/
 'https://userempowerlabs.firebaseio.com/'
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


        /*muestra el mensaje incial del chat*/
          var unique_id = $.gritter.add({
                    /*(string | mandatory) the heading of the notification*/
                    title: 'Bienvenido!',
                    /* (string | mandatory) the text inside the notification*/
                    text: 'Bienvenidos al chat en tiempo real desarrollado por Empowerlabs <a href="http://empowerlabs.com/convocatoria-2015/" target="_blank" style="color:#ffd777">empowerlabs</a>.',
                    /* (string | optional) the image to display on the left*/
                    image: '',
                    /*(bool | optional) if you want it to fade out on its own or just sit there*/
                    sticky: true,
                    /* (int | optional) the time you want it to be alive for before fading out*/
                    time: '',
                    /* (string | optional) the class name you want to apply to that specific message*/
                    class_name: 'my-sticky-class'
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

        $scope.showCreateUser = function(){/*funcion para cambiar el texto */
            selectGroup=false;
            $(".modal-footer").find("div").text("Crear Grupo")
            $(".modal-title").text("Crear nuevo grupo");
            $("#nombre-grupo").val("");
            noCheckUser();
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

        /*onbtengo todos los datos chats en grupos*/
        var myDataRefGroupChat = new Firebase('https://chatgroupempowerlabs.firebaseio.com/');


        myDataRefGroupChat.on('child_added', function(snapshot) {
    
            var message = snapshot.val();
            message.key=snapshot.key();
            listOfChatGroup.push(message);
            showchatUserSelectGroup();
            showNotificationGroup(message);/*muestra las notificaciones de los grupos*/
        });

    });





/*funcion para mostrar las notificaciones de grupos  */
    function  showNotificationGroup(message_notification){

        var time_=jQuery.timeago(message_notification.datetime);/*obtengo el valor del tiempo en texto*/
        var isNotification=false;
        message_notification.userSend.UserGroup.forEach(function(item_){
            if(JSON.parse($.session.get("ObjectUser")).email==item_.email)
            {
                isNotification=true;
                return;
            }
        });

        if(isNotification && message_notification.name.email!=JSON.parse($.session.get("ObjectUser")).email)
        {

            var name=message_notification.userSend.Name;
            if(name.length>12)
            {
                name=name.substring(0,13)+"...";
            }

            $("#notificationGroup-"+message_notification.userSend.id).remove();
            var inyectData='<div class="desc Group Notification-Group" id="notificationGroup-'+message_notification.userSend.id+'" data-id="'+message_notification.userSend.id+'">'+
                '<div class="thumb">'+
                '<span class="badge " style="margin-top: 13px;"><i class="icon-group"></i></span>'+
                '</div>'+
                '<div class="details">'+
                '<p><muted>'+time_+'</muted><br/>'+
                '<a >'+name+'</a><br>'+message_notification.message+'<br/>'+
                '</p>'+
                '</div>'+
                '</div>';


            $(".content-notification").append(inyectData);
             var objectEventClick = $($(".content-notification .Notification-Group").children()[$(".content-notification .Group").children().length-1]);
             
             eventClickChatUserGroup(objectEventClick);
        }

    }


/*fucntion no check en input*/
function noCheckUser(){
    var userGoup=$($("#integrantes").find("input"));
     for(var i=0;i< userGoup.length;i++)
      {
              userGoup[i].checked=false;
             
      }
 }

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
        listUserGroup.push(JSON.parse($.session.get("ObjectUser")));

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
          id_++;

          if(selectGroup)
        {/*significa que fue una actualización*/
            var usersRef = myDataRef.child(userChat.key);
            usersRef.remove();
            id_=userChat.id;
        }


            myDataRef.push({group: listUserGroup, id: id_, name: nameGroup});
            $("#nombre-grupo").val("");

            if(selectGroup)
            {
                $($($("#nav-accordion")).find("li.chat-group[data-id="+id_+"]")).click();
            }
        
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
            var inyectData='<div class="desc chat-user" id="notification-'+message_notification.name.id+'" data-email="'+message_notification.name.email+'">'+
                '<div class="thumb">'+
                '<span class="badge " style="margin-top: 13px;"><i class="icon-user"></i></span>'+
                '</div>'+
                '<div class="details">'+
                '<p><muted>'+time_+'</muted><br/>'+
                '<a >'+name+'</a><br>'+message_notification.message+'<br/>'+
                '</p>'+
                '</div>'+
                '</div>';


            $(".content-notification").append(inyectData);
             var objectEventClick = $($(".content-notification .chat-user").children()[$(".content-notification .chat-user").children().length-1]);
             
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

            var email_=$(this).attr("data-email");
            if(typeof(email_)=="undefined")
            {
                email_=$(this).parent().attr("data-email");
            }
            //.parent()
            clickUserChat(email_);
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


/*funcion para mostrar los chats correspondientes al grupo seleccionado*/
    function showchatUserSelectGroup(){
      if(userChat==null)
        {return;}
      $(".inyect-commit").html("");
      listOfChatGroup.forEach(function(message){/*recorro todos los chats*/
        if(userChat.id==message.userSend.id){

            eventAddChatGroup(message);
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
            listOfUsers=[];
            nameSnapshot.forEach(function(item_){
                var nameSnapshott = item_.val();//obtengo los objetos 
                var addUser = new Object();
                addUser.Name=nameSnapshott.name;
                addUser.Password=nameSnapshott.password;
                addUser.id=nameSnapshott.id;
                addUser.email=nameSnapshott.email;
                addUser.rol=nameSnapshott.rol;
                if(addUser.rol=="usuario") 
                {
                    listOfUsers.push(addUser);
                    /*No muestres a tu usuario*/
                    if($.session.get("EmailUser")!=addUser.email)
                    {
                        showUserConnect(addUser);
                        /*agregalo en el modal para crear un grupo*/
                        UseronGroup(addUser);
                    }
                }
            })
            getUsergroup();
            

        } );
    }


    /*funcion para mandar un chat a un grupo de personas correspondiete*/
    function sendChatGroup(message_)
    {
        var myDataRef = new Firebase('https://chatgroupempowerlabs.firebaseio.com/');
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


    /*Obtengo todos los grupos*/
    function getUsergroup(){
        var myDataRef=new Firebase('https://groupempowerlabs.firebaseio.com/');
        
        myDataRef.on('value', function(nameSnapshot) {
            $("#nav-accordion").find("li.chat-group").remove()
            listOfUsersGroup=[];
            nameSnapshot.forEach(function(item_){
                var nameSnapshott = item_.val();//obtengo los objetos 
                var addUser = new Object();
                addUser.key=item_.key();
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
            '<i class="fa icon-group"></i>'+
            '<span>'+UserGroup.Name+'</span> &nbsp;'+
            '<i class="fa icon-settings" style=" float: right; padding-right: 16px;" data-toggle="modal" data-target="#myGroup" data-id="'+UserGroup.id+'"></i>'+
            '</a>'+
            '</li>';
        /*se usa prepend por que se necesita meter todos los usuarios posibles por conectar */
        $("#nav-accordion").append(codeInyection);
        var objectEventClick=$($("#nav-accordion").children()[$("#nav-accordion").children().length-1]);
        var eventSetting=$(objectEventClick.find("i.icon-settings"));
        eventClickChatUserGroup(objectEventClick);//agrega elk evento de click
        clickupdateGroup(eventSetting);
    }

    /*funcion para el evnto de actualizar el grupo*/

    function clickupdateGroup(eventSetting){


        eventSetting.click(function() {
            var id_=$(this).attr("data-id");/*obtengo el id de grupo que se le dio click*/
            var objectUser=getUserObjectGroup(id_);
            $("#nombre-grupo").val(objectUser.Name);
            $(".modal-title").text("Actualizar grupo");
            $(".modal-footer").find("div").text("Actualizar Grupo")

            var userGoup=$($("#integrantes").find("input"));
            noCheckUser();//quita la seleccion de todo
             for(var i=0;i< userGoup.length;i++)
              {
                for (var j = 0; j < objectUser.UserGroup.length; j++) {
                    if($(userGoup[i]).attr("data-email")==objectUser.UserGroup[j].email)
                    {
                        userGoup[i].checked=true;
                    }
                };
                      
                     
              }


        });
        
    }


/*evento para poder chatear con usuario de un grupo*/
    function eventClickChatUserGroup(objectEventClick){
      
      objectEventClick.click(function(userConnect) {
            selectGroup=true;

            $("#content-chat").removeClass("hide");
            $(".inyect-commit").html("");
            $("#chat-content").val("");

            var id_=$(this).attr("data-id");
            if(typeof(id_)=="undefined")
            {
                id_=$(this).parent().attr("data-id");
            }

            clickUserChatGroup(id_);
            /*Se necesitan eliminar las notificaciones de los grupos*/
            $("#notificationGroup-"+id_).remove();
            /*ahora necesitas mostrar los chats correspondientes al grupo*/
            showchatUserSelectGroup();
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
            name+=item_.Name+" , ";
        });
        name=name.substring(0,name.length-3);/*quita la utlima coma para que no aparesca*/
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
            '<i class="fa icon-user"></i>'+
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
                        var message=$("#chat-content").val().trim();
                        if(!selectGroup)
                        {/*esto es si es solo un chat directo con otra persona*/
                            
                            if(message.length>0)
                            {
                                sendChat(message);

                            }
                        }else{
                            if(message.length>0)
                            {
                                sendChatGroup(message);
                            }
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
        
       var definition = {smile:{title:"Smile",codes:[":)",":=)",":-)"]},"sad-smile":{title:"Sad Smile",codes:[":(",":=(",":-("]},"big-smile":{title:"Big Smile",codes:[":D",":=D",":-D",":d",":=d",":-d"]},cool:{title:"Cool",codes:["8)","8=)","8-)","B)","B=)","B-)","(cool)"]},wink:{title:"Wink",codes:[":o",":=o",":-o",":O",":=O",":-O"]},crying:{title:"Crying",codes:[";(",";-(",";=("]},sweating:{title:"Sweating",codes:["(sweat)","(:|"]},speechless:{title:"Speechless",codes:[":|",":=|",":-|"]},kiss:{title:"Kiss",codes:[":*",":=*",":-*"]},"tongue-out":{title:"Tongue Out",codes:[":P",":=P",":-P",":p",":=p",":-p"]},blush:{title:"Blush",codes:["(blush)",":$",":-$",":=$",':">']},wondering:{title:"Wondering",codes:[":^)"]},sleepy:{title:"Sleepy",codes:["|-)","I-)","I=)","(snooze)"]},dull:{title:"Dull",codes:["|(","|-(","|=("]},"in-love":{title:"In love",codes:["(inlove)"]},"evil-grin":{title:"Evil grin",codes:["]:)",">:)","(grin)"]},talking:{title:"Talking",codes:["(talk)"]},yawn:{title:"Yawn",codes:["(yawn)","|-()"]},puke:{title:"Puke",codes:["(puke)",":&",":-&",":=&"]},"doh!":{title:"Doh!",codes:["(doh)"]},angry:{title:"Angry",codes:[":@",":-@",":=@","x(","x-(","x=(","X(","X-(","X=("]},"it-wasnt-me":{title:"It wasn't me",codes:["(wasntme)"]},party:{title:"Party!!!",codes:["(party)"]},worried:{title:"Worried",codes:[":S",":-S",":=S",":s",":-s",":=s"]},mmm:{title:"Mmm...",codes:["(mm)"]},nerd:{title:"Nerd",codes:["8-|","B-|","8|","B|","8=|","B=|","(nerd)"]},"lips-sealed":{title:"Lips Sealed",codes:[":x",":-x",":X",":-X",":#",":-#",":=x",":=X",":=#"]},hi:{title:"Hi",codes:["(hi)"]},call:{title:"Call",codes:["(call)"]},devil:{title:"Devil",codes:["(devil)"]},angel:{title:"Angel",codes:["(angel)"]},envy:{title:"Envy",codes:["(envy)"]},wait:{title:"Wait",codes:["(wait)"]},bear:{title:"Bear",codes:["(bear)","(hug)"]},"make-up":{title:"Make-up",codes:["(makeup)","(kate)"]},"covered-laugh":{title:"Covered Laugh",codes:["(giggle)","(chuckle)"]},"clapping-hands":{title:"Clapping Hands",codes:["(clap)"]},thinking:{title:"Thinking",codes:["(think)",":?",":-?",":=?"]},bow:{title:"Bow",codes:["(bow)"]},rofl:{title:"Rolling on the floor laughing",codes:["(rofl)"]},whew:{title:"Whew",codes:["(whew)"]},happy:{title:"Happy",codes:["(happy)"]},smirking:{title:"Smirking",codes:["(smirk)"]},nodding:{title:"Nodding",codes:["(nod)"]},shaking:{title:"Shaking",codes:["(shake)"]},punch:{title:"Punch",codes:["(punch)"]},emo:{title:"Emo",codes:["(emo)"]},yes:{title:"Yes",codes:["(y)","(Y)","(ok)"]},no:{title:"No",codes:["(n)","(N)"]},handshake:{title:"Shaking Hands",codes:["(handshake)"]},skype:{title:"Skype",codes:["(skype)","(ss)"]},heart:{title:"Heart",codes:["(h)","<3","(H)","(l)","(L)"]},"broken-heart":{title:"Broken heart",codes:["(u)","(U)"]},mail:{title:"Mail",codes:["(e)","(m)"]},flower:{title:"Flower",codes:["(f)","(F)"]},rain:{title:"Rain",codes:["(rain)","(london)","(st)"]},sun:{title:"Sun",codes:["(sun)"]},time:{title:"Time",codes:["(o)","(O)","(time)"]},music:{title:"Music",codes:["(music)"]},movie:{title:"Movie",codes:["(~)","(film)","(movie)"]},phone:{title:"Phone",codes:["(mp)","(ph)"]},coffee:{title:"Coffee",codes:["(coffee)"]},pizza:{title:"Pizza",codes:["(pizza)","(pi)"]},cash:{title:"Cash",codes:["(cash)","(mo)","($)"]},muscle:{title:"Muscle",codes:["(muscle)","(flex)"]},cake:{title:"Cake",codes:["(^)","(cake)"]},beer:{title:"Beer",codes:["(beer)"]},drink:{title:"Drink",codes:["(d)","(D)"]},dance:{title:"Dance",codes:["(dance)","\\o/","\\:D/","\\:d/"]},ninja:{title:"Ninja",codes:["(ninja)"]},star:{title:"Star",codes:["(*)"]},mooning:{title:"Mooning",codes:["(mooning)"]},finger:{title:"Finger",codes:["(finger)"]},bandit:{title:"Bandit",codes:["(bandit)"]},drunk:{title:"Drunk",codes:["(drunk)"]},smoking:{title:"Smoking",codes:["(smoking)","(smoke)","(ci)"]},toivo:{title:"Toivo",codes:["(toivo)"]},rock:{title:"Rock",codes:["(rock)"]},headbang:{title:"Headbang",codes:["(headbang)","(banghead)"]},bug:{title:"Bug",codes:["(bug)"]},fubar:{title:"Fubar",codes:["(fubar)"]},poolparty:{title:"Poolparty",codes:["(poolparty)"]},swearing:{title:"Swearing",codes:["(swear)"]},tmi:{title:"TMI",codes:["(tmi)"]},heidy:{title:"Heidy",codes:["(heidy)"]},myspace:{title:"MySpace",codes:["(MySpace)"]},malthe:{title:"Malthe",codes:["(malthe)"]},tauri:{title:"Tauri",codes:["(tauri)"]},priidu:{title:"Priidu",codes:["(priidu)"]}};

        $.emoticons.define(definition);

        message=$.emoticons.replace(message);

          


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



    /*evento para agregar un chat del grupo seleccioado*/
    function eventAddChatGroup(data){


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
                    '<div class="fecha">'+time_+'  -  <span class="user-message"  style="color: rgb(32, 200, 162);font-weight: bold;">'+data.name.Name+'</span></div>'/* <!--Hora-->*/
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
