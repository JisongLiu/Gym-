

var pre_url = 'http://104.196.133.44:8111/';
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

//function search_equipment(equipment){
//  console.log("I am here");
////  var keyword = $('#serachbox').val();
//  httpGetAsync("manager/searchequipments/", equipment);
//}
//
//function httpGetAsync(theUrl, equipment){
//
//    $.getJSON(theUrl + equipment, function(data){
//      buildtable('table', data);
//  });
//}
function search(){
  console.log("I am here");
  var keyword = document.getElementById("keyword").value;
  httpGetAsync("manager/search/", keyword);
}

function deleteX(){
  console.log("I am here");
  var keyword = document.getElementById("name").value;
  httpGetAsync2("manager/delete/", keyword);
}

function httpGetAsync(theUrl, keyword){
    $.getJSON(theUrl + keyword, function(data){
        if(data.length<=0){
                    document.getElementById("Success").innerHTML="Wrong Id";
                }
      else{document.getElementById("Success").innerHTML="Success!!!";buildinput('table', data);}
  });
}
function httpGetAsync2(theUrl, keyword){
    $.getJSON(theUrl + keyword, function(data){
        if(data.length<=0){
                    document.getElementById("Success").innerHTML="Wrong Id";
                }
      else{document.getElementById("Success").innerHTML="The following is what you have deleted";buildtable('table', data);}
  });
}
function add_instruction2(){
    cleanup();
    $.ajax({
    url: pre_url+"manager/insmat1",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        build_scroll('selection',data);
        $('#selection').append('<input type="text" id= "level" placeholder="level"></input>');//need to modify
        $('#selection').append('<input type="text" id= "times" placeholder="times"></input>');
        $('#selection').append('<input type="text" id= "ex_date" placeholder="ex_date"></input>');
        $('#selection').append('<input type="text" id= "pid" placeholder="member ID"></input>');
        $('#selection').append('<input type="text" id= "name" placeholder="name"></input>');
        $('#selection').append('<input type="text" id= "gender" placeholder="gender"></input>');
        $('#selection').append('<input type="text" id= "dob" placeholder="date of birth"></input>');
        $('#selection').append('<p></p>');
        var button = $('<button onclick=\'createmember()\'></button>').text('submit');
        $('#'+'selection').append(button);
    }
    });
}
function add_instruction1(){
    cleanup();
    $.ajax({
    url: pre_url+"manager/insmat1",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        build_scroll('selection',data);
        $('#selection').append('<input type="text" id= "coaid" placeholder="coach id"></input>');
        $('#selection').append('<input type="date" id= "ex_date" placeholder="ex_date"></input>');
        $('#selection').append('<input type="text" id= "name" placeholder="name"></input>');
        $('#selection').append('<input type="text" id= "gender" placeholder="gender"></input>');
        $('#selection').append('<input type="date" id= "dob" placeholder="date of birth"></input>');
        $('#selection').append('<p></p>');
        var button = $('<button onclick=\'createcoach()\'></button>').text('submit');
        $('#'+'selection').append(button);
    }
    });
}
function add_instruction3(){
    cleanup();
        $('#selection').append('<input type="text" id= "eid" placeholder="Equipment ID"></input>');
        $('#selection').append('<input type="text" id= "brand" placeholder="Brand"></input>');
        $('#selection').append('<input type="text" id= "status" placeholder="Status"></input>');//need to modify
        $('#selection').append('<input type="text" id= "category" placeholder="Category"></input>');
        $('#selection').append('<p></p>');
        var button = $('<button onclick=\'createequipment()\'></button>').text('submit');
        $('#'+'selection').append(button);
    }
function add_instruction4(){
    cleanup();
        $('#selection').append('<input type="text" id= "cid" placeholder="Course ID"></input>');
        $('#selection').append('<input type="text" id= "name" placeholder="Name"></input>');
        $('#selection').append('<input type="text" id= "description" placeholder="Description about the course"></input>');
        $('#selection').append('<input type="text" id= "tag" placeholder="Tag"></input>');
        $('#selection').append('<input type="text" id= "memlevel" placeholder="Member level requirement"></input>');// need to modify
        $('#selection').append('<p></p>');
        var button = $('<button onclick=\'createcourse()\'></button>').text('submit');
        $('#'+'selection').append(button);
    }
function createcoach(){
    var result = {'coaid':'','ex_date':'','name':'','gender':'','manid':'','dob':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
        if(keys[i]!='manid'){
            var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
        }
        else{
            var e = document.getElementById(keys[i]);
            console.log(keys[i]);
            result[keys[i]] = e.options[e.selectedIndex].text;
        }

    }
    var data = result['manid'].split(":");
    result['manid'] = data[0];
    $.ajax({
    url: pre_url+"manager/addinstruction",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
}
function createcourse(){
    var result = {'cid':'','name':'','description':'','tag':'','memlevel':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
            var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
    }
    $.ajax({
    url: pre_url+"manager/addinstruction4",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
}
function createmember(){
    var result = {'level':'','times':'','ex_date':'','pid':'','name':'','gender':'','manid':'','dob':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
        if(keys[i]!='manid'){
            var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
        }
        else{
            var e = document.getElementById(keys[i]);
            console.log(keys[i]);
            result[keys[i]] = e.options[e.selectedIndex].text;
        }

    }
    var data = result['manid'].split(":");
    result['manid'] = data[0];
    $.ajax({
    url: pre_url+"manager/addinstruction2",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
}
function createequipment(){
    var result = {'eid':'','brand':'','status':'','category':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
           console.log(keys[i]);
           var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
    }
    $.ajax({
    url: pre_url+"manager/addinstruction3",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
}
function updatesubmit(){
    if(document.getElementById('eid')){
    var result = {'eid':'','brand':'','status':'','category':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
           console.log(keys[i]);
           var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
    }
    $.ajax({
    url: pre_url+"manager/updateequipment",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
    }
    else if(document.getElementById('cid')){
    var result = {'cid':'','name':'','description':'','tag':'','memlevel':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
            var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
    }
    $.ajax({
    url: pre_url+"manager/updatecourse",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
    }
    else if(document.getElementById('pid')){
    var result = {'level':'','times':'','ex_date':'','pid':'','name':'','gender':'','manid':'','dob':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
           var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
    }
    $.ajax({
    url: pre_url+"manager/updatemember",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
    }
    else if(document.getElementById('coaid')){
    var result = {'coaid':'','ex_date':'','name':'','gender':'','manid':'','dob':''};
    keys = Object.keys(result);
    for(i =0; i<keys.length;i++){
            var e = document.getElementById(keys[i]);
           result[keys[i]] = document.getElementById(keys[i]).value;
        }
    $.ajax({
    url: pre_url+"manager/updatecoach",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
            if(data.length<=0){
                 document.getElementById("Success").innerHTML="Create fail";
             }
            else{ document.getElementById("Success").innerHTML="Create Success";}
    }
    });
    }
    else{}
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
    cleanup();
    $('#'+my_table).empty();
    var t_level1 = $('<div></div>').addClass('wrapper');
    var t_level2 = $('<div></div>').addClass('table');
    var t_level3 = $('<div></div>').addClass('row header blue');
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
function buildinput(my_input, data){
     cleanup();
     $('#'+my_input).empty();
     var t_level1 = $('<div></div>');
     for (var property in data[0]){
         var t_level2 = $('<input type="text" id='+property+' value='+data[0][property]+' />');
         t_level1.append(t_level2);
     }
     $('#'+my_input).append(t_level1);
     var button = $('<button onclick="updatesubmit()">update</button>');
     $('#'+my_input).append(button);
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
function cleanup(){
    $('#'+'selection').empty();
    $('#'+'table').empty();
}
