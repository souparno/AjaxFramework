function ajax(arguments, callback) {
    this.xhr = new XMLHttpRequest();
    this.xhr.open(arguments.requestType, arguments.requestUrl + arguments.requestParameters, true);
    this.xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            requestedData = JSON.parse(this.responseText);
            callback(requestedData);
        }
    }
    this.xhr.send();
}

var ajaxRequest = new ajax({ 
    requestType: 'GET',
    requestUrl: 'http://ezswag.com/bots/terms.php',
    requestParameters: ' ',
    }, function(json) {
        //console.log(json);  => json {apple: "red", cheery: "red"}
        return json;
    });

    console.log(ajaxRequest);