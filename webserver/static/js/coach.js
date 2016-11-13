var pre_url = 'http://localhost:8111/';
var id = '';

function securitycheck(){
    var result = getCookie("id");
    if (result == "")
    {
        window.location = pre_url+"another";
    }
    else
    {
        document.getElementById("Success").innerHTML="Welcome! "+result;
        id = result;
    }
}

function get_halls(){
    cleanup();
    $.ajax({
    url: pre_url+"coach/gethalls",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        buildtable('hall_table',data);
    }
    });
    
}

function get_private_train(){
    cleanup();
    var my_data = {'coaid': id}
    $.ajax({
    url: pre_url+"coach/gettrain",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        buildtable('hall_table',data);
    }
    });
    
}

function add_instruction(){
    cleanup();
    $.ajax({
    url: pre_url+"coach/insmat",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        build_scroll('selection',data);
    }
    });

    var button = $('<button onclick=\'add_ins()\'></button>').text('submit');
    $('#'+'hall_table').append(button);
    var my_data = {'coaid': id}
    $.ajax({
    url: pre_url+"coach/getinstruction",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        buildtable('hall_table',data);
    }
    });
}

function add_ins(){
    var result = {'course':'','hall':'','week':'','time':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
        var e = document.getElementById(keys[i]);
        result[keys[i]] = e.options[e.selectedIndex].text;
    }
    var data = result['course'].split(":");
    result['course'] = data[0];
    result['coaid']=id;
    $.ajax({
    url: pre_url+"coach/addinstruction",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
    }
    });
    add_instruction();
}

function build_scroll(my_scroll,dataset){
    var s_level1 = $('<fieldset></fieldset>');
    for (var i =0; i < dataset.length;i++){
        var id = Object.keys(dataset[i])[0];
        var s_level2 = $('<select '+' id='+id+'></select>').addClass('dropdown');
        var s_level3 = $('<option value=" " ></option>').addClass('label').text(id);
        s_level2.append(s_level3);
        for (var j =0; j < dataset[i][id].length;j++){
            s_level3 = $('<option value='+j+'></option>').text(dataset[i][id][j]);
            s_level2.append(s_level3);
        }
        s_level1.append(s_level2);
    }
    $('#'+my_scroll).append(s_level1);
}

function buildtable(my_table, data){
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

function cleanup(){
    $('#'+'selection').empty();
    $('#'+'hall_table').empty();
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