(function(){

    

    detectLogin();








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
            window.location="chat-login.html" ;
        }
    }




})();