//版权 晚九晚九©, 保留所有权利
//options url,data,timeout,success,error

/* 
function jsonp(options){
	return new Promise((resolve,reject)=>{
		console.log('resolve',resolve)
		console.log('reject',reject)
		setTimeout(()=>{
			if(Math.random()<.5) resolve(options)
			else reject({err:1,msg:'无偶粗'})
		},1000)
	})
} */

/* function jsonp(options){

	return new Promise((resolve,reject)=>{
		
		options = options || {};
		if(!options.url){
			return;
		}
		options.params = options.params || {};
		options.cbName = options.cbName || "cb";
		options.timeout = options.timeout || 0;
		
		var fnName = "jsonp_"+ Math.random();
		fnName = fnName.replace("." ,"");
		options.params[options.cbName] = fnName;
		
		var arr = [];
		for(var i in options.params){
			arr.push(i + "=" + encodeURIComponent(options.params[i]));
		}
		var str = arr.join("&");
		
		
		window[fnName] = function (json){
			console.log('windowFun',json)
			resolve(json)
			
			clearTimeout(timer);
			oHead.removeChild(oS);
			window[fnName] = null;
		}
			
		var oS = document.createElement("script");
		oS.src = options.url + "?" + str;
		var oHead = document.getElementsByTagName("head")[0];
		oHead.appendChild(oS);
		
		if(options.timeout){
			var timer = setTimeout(function(){
				reject()
				window[fnName] = null;
				window[fnName] = function(){};
			},options.timeout);
		}


	})
		
} */


let jsonp = (options) => new Promise((resolve,reject)=>{
		
	options = options || {};
	if(!options.url){
		return;
	}
	options.params = options.params || {};
	options.cbName = options.cbName || "cb";
	options.timeout = options.timeout || 0;
	
	var fnName = "jsonp_"+ Math.random();
	fnName = fnName.replace("." ,"");
	options.params[options.cbName] = fnName;
	
	var arr = [];
	for(var i in options.params){
		arr.push(i + "=" + encodeURIComponent(options.params[i]));
	}
	var str = arr.join("&");
	
	
	window[fnName] = function (json){
		// console.log('windowFun',json)
		resolve(json)
		
		clearTimeout(timer);
		oHead.removeChild(oS);
		window[fnName] = null;
	}
		
	var oS = document.createElement("script");
	oS.src = options.url + "?" + str;
	var oHead = document.getElementsByTagName("head")[0];
	oHead.appendChild(oS);
	
	if(options.timeout){
		var timer = setTimeout(function(){
			reject()
			window[fnName] = null;
			window[fnName] = function(){};
		},options.timeout);
	}


})


axios.jsonp=jsonp