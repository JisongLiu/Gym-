function login() {
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var my_data = {"name":name,"password":password}
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: 'http://localhost:8111/login',
            async: false,
            data : JSON.stringify(my_data),
            contentType : 'application/json',
            //json object to sent to the authentication url
            success: function () {
                var output = '';
                for (var property in result[0]) {
                output += property + ': ' + result[0][property]+'\n';
                }
                document.getElementById("Success").innerHTML=output;
                }
        })
}
