var pre_url = 'http://localhost:8111/coach';
var id = '';

function securitycheck(){
    var result = getCookie("id");
    if (result == "")
    {
        window.location = "http://localhost:8111/another";
    }
    else
    {
        document.getElementById("Success").innerHTML="Welcome! "+result;
        id = result;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}