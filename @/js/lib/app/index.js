// 初始化
mui.init({
});

// 所有方法都放到这里
mui.plusReady(function(){
	if(mui.os.ios) plus.navigator.setStatusBarBackground('#EFEFF4');	

	qiao.on('#choiceImg', 'tap', choiceImg);
	qiao.on('#choiceBtn', 'tap', facepp);
	
	qiao.qiniu.uptoken();
});

// choice img
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

// face pp
function facepp(){
	var src = $('#choiceImg').attr('src');
	if(src){
		qiao.h.waiting();
	    var api = new FacePP('3bbeeac39cd5e8600d2cb05ac97f15fd', '4lf9qM6e7GVLVAfKYITYx9R7GX6_5Taa');
	    api.request('detection/detect', {
//	      url: 'http://7sbn90.com1.z0.glb.clouddn.com/@/img/me/face1.jpg',
	      img : src,
	      attribute: 'gender,age'
	    }, function(err, result) {
	    	qiao.h.closeWaiting();
			if(err){
				showRes('识别失败，请重试！');
				showRes(JSON.stringify(err))
				return;
			}
			  
			if(result && result.face && result.face.length){
				var face = result.face[0].attribute;
				var str = '性别：' + (face.gender.value == 'Male' ? '男':'女') + '，年龄：' + face.age.value;
				showRes(str);
			}
	    });
	}else{
		showRes('请先选择要识别的照片！');
	}
}
function showRes(msg){
	$('#res').text(msg);
}