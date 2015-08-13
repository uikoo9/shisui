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
		switch (e.index){
			case 0:
				break;
			case 1:
				choiceCamera();
				break;
			case 2:
				choicePic();
				break;
		}
	});
}
function choiceCamera(){
	var cmr = plus.camera.getCamera();
	cmr.captureImage( function ( p ) {
		plus.io.resolveLocalFileSystemURL( p, function ( entry ) {
			
		}, function ( e ) {
		} );
	}, function ( e ) {
	}, {filename:"_doc/camera/",index:1} );
}
function choicePic(){
	plus.gallery.pick( function(path){
    	console.log(path);
    }, function ( e ) {
    	console.log( "取消选择图片" );
    }, {filter:"image"} );
}