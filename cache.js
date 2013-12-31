
function cachechannel(url) {

    this.url = url;
    
    this.Ajax = function Ajax() {
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { return new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {
                try { return new XMLHttpRequest(); }
                catch (e) {
                    return false;
                }
            }
        }
    };

    this.connect = function connect() {
        var mypostrequest = this.Ajax();
        mypostrequest.open("GET", this.url, true);
        mypostrequest.onreadystatechange = function () { new cachechannel().update_chat_statechanged(mypostrequest); };
        mypostrequest.send();

    };

    this.update_chat_statechanged = function statechanged(RequestObj) {
        switch (RequestObj.readyState) {
            case 0: // UNINITIALIZED
                break;
            case 1: // LOADING
                break;
            case 2: // LOADED
                break;
            case 3: // INTERACTIVE
                break;
            case 4: //COMPLETED
                if (RequestObj.status === 200) {
                    var objChat = JSON.parse(RequestObj.responseText);
                    for (var i = 0; i < data.length; i++) {
                        var logstatus = false;
                        for (var j = 0; j < objChat.length; j++) {
                            if (objChat[i].userid == data[i].userid) {
                                logstatus = true;
                            }
                        }
                        alert(data[i].userid + "status="+logstatus);
                    }

                }
                break;
        }
    };
};

