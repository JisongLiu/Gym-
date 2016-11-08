var user_name = '';
var pre_url = 'http://localhost:8111/'

function login() {
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var my_data = {"name":name,"password":password}
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: pre_url+'login',
            async: true,
            data : JSON.stringify(my_data),
            contentType : 'application/json',
            //json object to sent to the authentication url
            success: function (result) {
                var output = '';
                user_name = result[0]["name"];
                if(user_name.length == 0){
                    document.getElementById("Success").innerHTML="Failed to login, please try again";
                }
                else{
                    window.location = pre_url;
                }
                }
        });
}
