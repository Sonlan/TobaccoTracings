$(document).ready(function(){
	//控件寻址
	var id = "";  //待查询id号，初始化为空
	
	//查询点击事件
	$("#query").click(function(){
		$(".result").attr("style","display:none");
		$(".noData").attr("style","display:none");
		id = $("#ids").val();
		var key = id.toUpperCase().substring(0,1); //截取首字符
		var html = "";
		$.post("../manage/antiFake","id="+id,function(data,status){
			if(data.statuscode==0){//有误
				alert(data.parameter);  //警示，重新输入查询码
			}else if(data.statuscode==1){//正常
				if(data.parameter==null){//无数据
					$(".result").attr("style","display:none");
					$(".noData").attr("style","display:block");
				}else{  //查询有结果
					$(".result").attr("style","display:block");
					$(".noData").attr("style","display:none");
					if(key=="P"){//查询产品product信息
						html="<tr><td>产品号</td><td>"+data.parameter.id+"</td><td>生产日期</td><td>"+data.parameter.pd+"</td></tr>"
								+"<tr><td>有效期</td><td>"+data.parameter.gp+"</td><td>生产厂家</td><td>"+data.parameter.manufacturer+"</td></tr>"
								+"<tr><td>品名</td><td>"+data.parameter.pName+"</td><td>成分</td><td>"+data.parameter.material+"</td></tr>"
								+"<tr><td>零售价</td><td>"+data.parameter.price+"￥</td><td>销售地</td><td>"+data.parameter.targetAddr+"</td></tr>"
								+"<tr><td>消费状态</td><td>"+data.parameter.state+"</td></tr>";
					}else if(key=="C"){//查询盒子case信息
						html="<tr><td>产品号</td><td>"+data.parameter.caseID+"</td><td>生产日期</td><td>"+data.parameter.pd+"</td></tr>"
						+"<tr><td>有效期</td><td>"+data.parameter.gp+"</td><td>生产厂家</td><td>"+data.parameter.manufacturer+"</td></tr>"
						+"<tr><td>品名</td><td>"+data.parameter.pName+"</td><td>数量</td><td>"+data.parameter.amount+"包</td></tr>"
						+"<tr><td>零售价</td><td>"+data.parameter.price+"￥</td><td>销售地</td><td>"+data.parameter.targetAddr+"</td></tr>"
						+"<tr><td>消费状态</td><td>"+data.parameter.state+"</td></tr>";
					}else if(key=="B"){//查询盒子case信息
						html="<tr><td>产品号</td><td>"+data.parameter.boxID+"</td><td>生产日期</td><td>"+data.parameter.pd+"</td></tr>"
						+"<tr><td>有效期</td><td>"+data.parameter.gp+"</td><td>生产厂家</td><td>"+data.parameter.manufacturer+"</td></tr>"
						+"<tr><td>品名</td><td>"+data.parameter.pName+"</td><td>数量</td><td>"+data.parameter.amount+"盒</td></tr>"
						+"<tr><td>零售价</td><td>"+data.parameter.price+"￥</td><td>销售地</td><td>"+data.parameter.targetAddr+"</td></tr>"
						+"<tr><td>消费状态</td><td>"+data.parameter.state+"</td></tr>";
					}
					//显示
					$("#InfoTable").html(html);
					$(".result").attr("style","display:block");
				}
			}
		},"json");
	});
	
});