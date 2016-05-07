/**
 * 用于页面left.html的页面事件处理，
 * 初衷是在产品页点击对应物流信息，自动跳转到物流信息页，而这需要模拟left.html页面上的点击事件
 */
document.write("<script type='text/javascript' src='js/jquery.js'></script>");
$(document).ready(function(){
	//选中项激活（背景改变）
	$(".menuson li").click(function(){
 		$(".menuson li.active").removeClass("active");
 		$(this).addClass("active");
// 		alert("click");
	});
	//伸缩列表
	$('.title').click(function(){
		//清除选中项目
		if($(".menuson li.active")!=null)
			$(".menuson li.active").removeClass("active");
		var $ul = $(this).next('ul');
		$('dd').find('ul').slideUp('fast');
		if($ul.is(':visible')){
			$(this).next('ul').slideUp('fast');
		}else{
			$(this).next('ul').slideDown('fast');
		}
	});
});
//供点击物流信息调用，问题是这里一直不能a标签跳转，只能放到ready函数里面，但那样又没办法调用了
function toLogisticsInfo(){
	$("#LogisticsInfo").click();	
}
function toStoreInfo(){
	$("#StoreInfo").click();	
}