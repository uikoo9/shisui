// 初始化
mui.init({});

// 所有方法都放到这里
mui.plusReady(function(){
	if(mui.os.ios) plus.navigator.setStatusBarBackground('#EFEFF4');	

	qiao.on('#faceImg', 'tap', choiceImg);
	qiao.on('#faceBtn', 'tap', uploadImg);
	
	// 退出
	mui.back = function(){
		qiao.h.exit();
	};
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
	$('#faceImg').attr('src', src);
}

// uploadImg
var url;
function uploadImg(){
	var src = $('#faceImg').attr('src');
	if(src){
		beginw();
		
		var token = qiao.qiniu.uptoken(src);
		var filename = qiao.qiniu.file;
		qiao.h.upload({
			url: 'http://upload.qiniu.com/',
			filepath: src,
			datas: [
				{key: 'key', value : filename},
				{key: 'token', value : token}
			],
			success: function(){
				url = qiao.qiniu.url();
				facepp();
			},
			fail: function(s){
				showRes('上传文件失败：' + s);
			}
		});
	}else{
		showRes('请先选择要识别的照片！');
	}
}
function facepp(){
	if(url){
		qiao.facepp.do({
			url : url,
			success : function(result){
				if(result && result.face && result.face.length){
					var face = result.face[0].attribute;
					var str = '识别成功！性别：' + (face.gender.value == 'Male' ? '男':'女') + '，年龄：' + face.age.value;
					showRes(str);
				}else{
					showRes('识别失败，请上传包含人脸的图片！');	
				}
			},
			fail : function(){
				showRes('识别失败，请重试！');
			}
		});
	}
}
function showRes(msg){
	$('#res').text(msg);
	endw();
}
function beginw(){
	$('#faceBtn').attr('disabled', true);
	qiao.h.waiting();
}
function endw(){
	qiao.h.closeWaiting();
	$('#faceBtn').attr('disabled', false);
}
