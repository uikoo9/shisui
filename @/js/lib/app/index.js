// 初始化
mui.init({
});

// 所有方法都放到这里
mui.plusReady(function(){
	setColor("#f7f7f7");
	qiao.on('#choiceImg', 'tap', choiceImg);
});

// set color
function setColor(color){
	if(mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
}

function choiceImg(){
	qiao.h.sheet('选择照片', ['拍照','相册'], function(e){
		var index = e.index;
		if(index == 1) choiceCamera();
		if(index == 2) choicePic();
	});
}
function choiceCamera(){
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function (p){
		plus.io.resolveLocalFileSystemURL(p, function(entry){
			setImg(entry.toLocalURL());
		}, function(e){});
	}, function(e){},{index:1,filename:"_doc/camera/"});
}
function choicePic(){
	plus.gallery.pick(function(path){setImg(path);},function(e){},{filter:'image'});
}
function setImg(src){
	$('#choiceImg').attr('src', src);
}