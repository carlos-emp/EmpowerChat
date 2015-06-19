(function(){

    

    detectLogin();








    /*variables para saber si esta  o no logueado*/
    function detectLogin(){
        /*obtengo los valores*/
        var email_user_=$.session.get("EmailUser");
        var password_user_=$.session.get("PasswordUser");
        if(typeof($.session.get("ObjectUser"))=="undefined")
        {
            window.location="chat-login.html" ;
            $.session.delete("EmailUser");
        }
        var Object_user_=JSON.parse($.session.get("ObjectUser"));
        if(typeof(email_user_)=='string' && typeof(password_user_)=="string")
        {
            if(Object_user_.rol=="usuario")
            {
                $(".email-user").text(Object_user_.Name)
            }else{
                window.location="admin.html" ;
            }

        }else{
            window.location="chat-login.html" ;
        }
    }




})();