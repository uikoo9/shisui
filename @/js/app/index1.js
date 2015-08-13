$(function(){
	qiao.on('#faceImg', 'click', choiceImg);
	qiao.on('#faceBtn', 'click', uploadImg);
	
	$('#faceForm input[name="token"]').val(qiao.qiniu.uptoken());
});

// choice img
function choiceImg(){
	$('#faceForm input[name="file"]').click();
}

// uploadImg
function uploadImg(){
	console.log($('#faceForm input[name="file"]').val());
	console.log($('#faceForm input[name="token"]').val());
	$('#faceForm').submit(function(e){
		console.log(JSON.stringify(e));
	});
	$('#faceForm').submit();
}
function facepp(url){
    var api = new FacePP('3bbeeac39cd5e8600d2cb05ac97f15fd', '4lf9qM6e7GVLVAfKYITYx9R7GX6_5Taa');
    api.request('detection/detect', {
      url: url,
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
}
function showRes(msg){
	$('#res').text(msg);
}