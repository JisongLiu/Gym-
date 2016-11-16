var pre_url = 'http://localhost:8111/member';
var id = '';

function securitycheck(){
    var result = getCookie("id");
    if (result == "")
    {
        window.location = "login.html";
    }
    else
    {
        document.getElementById("Success").innerHTML="Welcome! "+result;
        id = result;
    }
}

function explore(){
    cleanup();
    $.ajax({
    url: pre_url+"/courses",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        buildtable('table',data);
    }
    });
}

function my_courses(){
    cleanup();
    var my_data = {'pid':id};
    $.ajax({
    url: pre_url+"/mycourse",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        buildtable('table',data);
        var result =[{'Drop_course':[]}];
        for(var i =0; i< data.length;i++){
            result[0]['Drop_course'].push(data[i]['cid'] +':'+data[i]['name']);
        }
        build_scroll('selection2',result);
    }
    });
    $.ajax({
    url: pre_url+"/studymat",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        build_scroll('selection',data);
    }
    });
    $('#selection').append('<input type="date" id="currdate"></input>');
    var button = $('<button onclick="submitcourse()"></button>').text("add");
    $('#selection').append(button);
    var button2 = $('<button onclick="dropcourse()"></button>').text("drop");
    $('#selection2').append(button2);
}

function submitcourse(){
    var result = {'pid':id} 
    result['ex_date'] = document.getElementById("currdate").value;
    var e = document.getElementById('course');
    result['cid']= e.options[e.selectedIndex].text.split(":")[0];
    $.ajax({
    url: pre_url+"/addstudy",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
        if(data["result"]=="Success"){
            my_courses();
        }
        else{
            document.getElementById("Message").innerHTML="Action Failed!";
        }
    }
    });
    
}

function dropcourse(){
    var result = {'pid':id} 
    var e = document.getElementById('Drop_course');
    result['cid']= e.options[e.selectedIndex].text.split(":")[0];
    $.ajax({
    url: pre_url+"/addstudy",
    type: "DELETE",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
        if(data["result"]=="Success"){
            my_courses();
        }
        else{
            document.getElementById("Message").innerHTML="Action Failed!";
        }
    }
    });
}

function add_private_train(){
    cleanup();
    var my_data = {'pid':id};
    $.ajax({
    url: pre_url+"/gettrain",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        buildtable('table',data);
        var result =[{'Drop_trainning':[]}];
        for(var i =0; i< data.length;i++){
            result[0]['Drop_trainning'].push(data[i]['coaid'] +':'+data[i]['Coach']);
        }
        build_scroll('selection2',result);
    }
    });

    $.ajax({
    url: pre_url+"/trainmat",
    type: "GET",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        build_scroll('selection',data);
    }
    });
    $('#selection').append('<input type="date" id="currdate"></input>');
    var button = $('<button onclick="submitreserve()"></button>').text("reserve");
    $('#selection').append(button);
    var button = $('<button onclick="deletereserve()"></button>').text("Drop_train");
    $('#selection2').append(button);
}

function submitreserve(){
    result = {'pid':id};
    var e = document.getElementById('coach');
    result['coaid']= e.options[e.selectedIndex].text.split(":")[0];
    e = document.getElementById('timeslot');
    result['time'] = e.options[e.selectedIndex].text;
    result['date'] = document.getElementById("currdate").value;
    $.ajax({
    url: pre_url+"/addtrain",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
        if(data["result"]=="Success"){
            add_private_train();
        }
        else{
            document.getElementById("Message").innerHTML="Action Failed!";
        }
    }
    });
}

function deletereserve(){
    result = {'pid':id};
    var e = document.getElementById('Drop_trainning');
    result['coaid']= e.options[e.selectedIndex].text.split(":")[0];
    $.ajax({
    url: pre_url+"/addtrain",
    type: "DELETE",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
        if(data["result"]=="Success"){
            add_private_train()
        }
        else{
            document.getElementById("Message").innerHTML="Action Failed!";
        }
    }
    });
}

function my_equipment(){
    cleanup();
    var my_data = {'pid':id};
    $.ajax({
    url: pre_url+"/myborrow",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(my_data),
    async: true,
    success: function (data) {
        buildtable('table',data);
        var result =[{'Cancel_Borrowing':[]}];
        for(var i =0; i< data.length;i++){
            result[0]['Cancel_Borrowing'].push(data[i]['eid'] +':'+data[i]['time']+':'+data[i]['date']);
        }
        build_scroll('selection2',result);
    }
    });

    $.ajax({
    url: pre_url+"/equipmat",
    type: "GET",
    contentType : 'application/json',
    async: true,
    success: function (data) {
        build_scroll('selection',data);
    }
    });
    $('#selection').append('<input type="date" id="currdate"></input>');
    var button = $('<button onclick="submitequip()"></button>').text("reserve");
    $('#selection').append(button);
    var button = $('<button onclick="delequip()"></button>').text("Cancel");
    $('#selection2').append(button);
}

function submitequip(){
    result = {'pid':id};
    var e = document.getElementById('equipment');
    result['eid']= e.options[e.selectedIndex].text.split(":")[0];
    e = document.getElementById('timeslot');
    result['time'] = e.options[e.selectedIndex].text;
    result['date'] = document.getElementById("currdate").value;
    $.ajax({
    url: pre_url+"/borrow",
    type: "POST",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
        if(data["result"]=="Success"){
            my_equipment();
        }
        else{
            document.getElementById("Message").innerHTML="Action Failed!";
        }
    }
    });
}

function delequip(){
    result = {};
    var e = document.getElementById('Cancel_Borrowing');
    data = e.options[e.selectedIndex].text.split(":");
    result['eid'] = data[0];
    result['time'] = data[1]+":00:00";
    result['date']= data[4];
    $.ajax({
    url: pre_url+"/borrow",
    type: "DELETE",
    contentType : 'application/json',
    data : JSON.stringify(result),
    async: true,
    success: function (data) {
        if(data["result"]=="Success"){
            my_equipment();
        }
        else{
            document.getElementById("Message").innerHTML="Action Failed!";
        }
    }
    });
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
    var t_level3 = $('<div></div>').addClass('row header green');
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
    $('#'+'selection2').empty();
    $('#'+'table').empty();
    $('#Message').empty();
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