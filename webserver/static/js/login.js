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
            crossDomain: true,
            data : JSON.stringify(my_data),
            contentType : 'application/json',
            //json object to sent to the authentication url
            success: function (result) {
                var output = '';
                user_id = result[0]["id"];
                identity = result[0]["identity"];
                if(user_id.length == 0){
                    document.getElementById("Success").innerHTML="Failed to login, please try again";
                    document.cookie = "";
                }
                else{
                    document.cookie = "id=" + user_id + ";path=/"+identity;
                    window.location = pre_url+identity;
                }
                }
        });
}

