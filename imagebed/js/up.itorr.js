var staticPath = '';
var 
UP=function(o,success,error,upload,x,file,A){
	$.ajaxSettings.async = false; 
	$.get('http://danmu.fm/api/hosts',function(r){
	var ip=''+r.cmcc.match(/[\d\.]+/);
	staticPath='http://'+ip+':'+'672/';
	$.ajaxSettings.async = true; 
	// alert(staticPath);
});
	if(typeof success=='function'){
		var file = new FormData(); 
		file.append("file", o);
		// file=o;
	}
	else{
		if(!o.file)
			return console.log('并没有传入需要上传的文件')

		if(A=o.success)
			success=A

		if(A=o.upload)
			upload=A
		
		if(A=o.error)
			error=A
	}

	x=new XMLHttpRequest()
	// alert(staticPath+'v1/upload');
	x.open('POST',staticPath + 'v1/upload',true);
	// x.open('POST','http://114.86.196.54:672/v1/upload',true);
	x.setRequestHeader("X-Requested-With", "XMLHttpRequest");

	if(upload)
		x.upload.onprogress=function(e){
			upload(e.loaded/e.total)
		}

	x.onload=function(r){
		r=JSON.parse(x.responseText)
		// alert(r.wbpid);
		// alert(r.error);
		if(r.error&&error)
			return error(r.error)

		if(r.wbpid&&success)
			return success(r.wbpid)
	}
	x.send(file);
	
}
