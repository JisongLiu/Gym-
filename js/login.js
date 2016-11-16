var pre_url = 'https://35.185.2.157:8111/'

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
                    console.log("I have been here 1");
                }
                else{
                    window.location = identity+".html?identity="+user_id;
                    console.log("I have been here 2");
                }
                }
        });
        console.log("I have been here");
}

