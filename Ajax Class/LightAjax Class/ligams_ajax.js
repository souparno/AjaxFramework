/***********************************************
@author : Stéphane L - http://www.ligams.com
***********************************************/

/**
  * httpRequest : gère les requêtes http
  * @param url <string> : url de la page où la requête est effectuée
  * @param params <object> : paramètres de la requête 
  * @param methode <string> : GET ou POST
  * @param callback <function> : fonction à appeler en cas de réussite
  * @param async <boolean> : détermine si l'appel est synchrone ou non (true ou false)  
  */

httpRequest = function(url,params,method,callback,async)
{
	this.id = "id"+Math.round(Math.random()*10000000000);
	httpRequest.instance = new Array();
	httpRequest.instance[this.id] = this;
	this.async = async;
	this.params = params;
	this.getHTTPObject();
	this.url = url;
	this.method = method.toUpperCase();
	this.callback = callback;
	this.send();
}
httpRequest.prototype =  
{
	init:function()
	{
		if(this.method!='POST' || this.method!='GET')
			this.method = 'POST';
	},
	getHTTPObject:function()
	{
		this.xmlhttp = false;

	    if (window.ActiveXObject)
		{
			try 
			{
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e) 
			{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		if (!this.xmlhttp && typeof XMLHttpRequest != 'undefined')
		{
			try
			{	
				this.xmlhttp = new XMLHttpRequest();
			}
			catch (e)
		    {
		        this.xmlhttp = false;
		    }
		}
	},
	setParams : function()
	{
		if(this.params==null || this.params==undefined)
			return null;
		var aParams = new Array();
		for(a in this.params)
		{
			aParams.push(a+"="+this.params[a]);
		}
		var szParams = aParams.join('&');
		return szParams;
	},
	setEvents : function()
	{
		var id = this.id;
		if (this.xmlhttp)
		{
			this.xmlhttp.onreadystatechange=function()
			{
				if (this.readyState == 4)
				{
					if (this.status && this.status == 200) 
					{
						httpRequest.instance[id].callback(this.responseText);
					}
			    }
			}
		}	
	},
	send : function()
	{		
		var opener = '';
		var sender = null;
		switch(this.method)
		{
			case 'POST':
				opener = this.url;
				sender = this.setParams();
				break;
			case 'GET':
				var p = this.setParams();
				(p==null)? p = '' : p = "?"+p;
				opener = this.url+p;
				break;
			default:
				break;
		}
		if(this.async && null!=this.callback)
			this.setEvents();
		this.xmlhttp.open(this.method,opener,this.async);

		this.xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		if(this.xmlhttp.overrideMimeType)
			this.xmlhttp.overrideMimeType('text/xml; charset=UTF-8');
		this.xmlhttp.send(sender); 
		if(!this.async)
			this.callback(this.xmlhttp.responseText);
	}
}