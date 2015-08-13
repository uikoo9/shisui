// 初始化
mui.init({
});

// 所有方法都放到这里
mui.plusReady(function(){
	setColor("#f7f7f7");
});

// set color
function setColor(color){
	if(mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
}
