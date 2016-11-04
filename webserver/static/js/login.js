jQuery.each( [ "get", "post","put", "delete" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});
function login() {
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        $.get('http://localhost:1234/user', {'name':name,'password': password}, function(result){
        var output = '';
            for (var property in result[0]) {
            output += property + ': ' + result[0][property]+'\n';
            }
        document.getElementById("Success").innerHTML=output;
        });
}
