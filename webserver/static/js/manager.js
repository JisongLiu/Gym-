var pre_url = 'http://localhost:8111/';
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
function get_equipment(){
    console.log("I am here");
    $.ajax({
    url: pre_url+"manager/getequipments",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        buildtable('table',data);
    }
    });

}
function get_course(){
    console.log("I am here");
    $.ajax({
    url: pre_url+"manager/getcourses",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        buildtable('table',data);
    }
    });

}
function get_member(){
    console.log("I am here");
    $.ajax({
    url: pre_url+"manager/getMembers",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        buildtable('table',data);
    }
    });

}
function get_coach(){
    console.log("I am here");
    $.ajax({
    url: pre_url+"manager/getCoaches",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        buildtable('table',data);
    }
    });

}
function buildtable(my_table, data){
    $('#'+my_table).empty();
    var t_level1 = $('<div></div>').addClass('wrapper');
    var t_level2 = $('<div></div>').addClass('table');
    var t_level3 = $('<div></div>').addClass('row header');
    for (var property in data[0]){
        var t_level4 = $('<div></div>').addClass('cell').text(property);
        t_level3.append(t_level4);
    }
    t_level2.append(t_level3);

    for (var i =0; i < data.length;i++) {
        t_level3 = $('<div></div>').addClass('row');
        var temp_dict = data[i];
        for(var property in temp_dict){
            var t_level4 = $('<div></div>').addClass('cell').text(temp_dict[property]);
            t_level3.append(t_level4);
        }
        t_level2.append(t_level3);
    }
    t_level1.append(t_level2);
    $('#'+my_table).append(t_level1);
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
