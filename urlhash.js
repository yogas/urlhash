// Обработка хеша адресной строки
var urlHash = {
	removed:'',
	// получение переменных хэша
	getHash:function(){
		var ahash = document.location.hash.split("?");
		//получение переменных хэша
		if(ahash.length>1){
			var ap = ahash[1].split("&"); // переменные хэша key=value
			var  p = {};
			
			for(var key in ap){
				var key_value = ap[key].split("=");
				p[key_value[0]] = key_value[1];
			}
			
			return p;
		}else{
			return {};
		}
	},	
	getValue:function(name){
		var p  = this.getHash();
		return p[name];
	},
	// добавление переменной в хэш строку
	addValue:function(name,value){
		var p    = this.getHash();
		var hash = []; 
		for(var key in p){
			if(key!=name && key!=this.removed){
				hash.push(key+"="+p[key]);
			}
		}
		hash.push(name+"="+value);
		this.removed = '';
	
		document.location = "#!/?"+hash.join("&");
	},
	// наличие значения в массиве
	inArray:function(v,array){
		for(var key in array){
			if(v == array[key]) return true;
		}
		return false;
	},
	// добавление переменных в хэш строку
	addValues:function(o){
		var names = [];
		
		for(var v in o){
			names.push(v);			
		}
		
		var p    = this.getHash();
		var hash = []; 
		for(var key in p){
			if(!this.inArray(key,names) && key!=this.removed){
				hash.push(key+"="+p[key]);
			}
		}
				
		for(var v in o){
			hash.push(v+"="+o[v]);
		}
		
		
		this.removed = '';
	
		document.location = "#!/?"+hash.join("&");
	},
	// удаление переменной
	removeValue:function(name){
		this.removed = name;
	},
	// слушаем события изменения хэша
	eventListener:function(f){
		var h = document.location.hash;
		setInterval(function(){
			if(h!=document.location.hash){
				h = document.location.hash;
				f();
			}
		},100);
	}
};