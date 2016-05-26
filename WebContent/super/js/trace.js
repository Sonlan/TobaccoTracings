$(document).ready(function(){
	var lid="";  //物流信息编号
	var id = "";  //待查询id号，初始化为空,直接由页面获取
	
	//查询按钮响应
	$("#query").click(function(){
		id = $("#ids").val();
		if(id!=""){//输入不为空
			$.post("../manage/antiFake","id="+id,function(data,stadus){
				if(data.statuscode==0){//有误
					alert(data.parameter);  //警示，重新输入查询码
				}else if(data.statuscode==1){//正常
					if(data.parameter!=null){//查询到数据
						lid=data.parameter.logisticsId+"_"+id;  //将产品ID作为附加信息用于区分物流信息
						updateTable(0);  //查询物流信息
					}else{
						alert("暂无物流信息，请稍后查询");
					}
				}
			},"json");
		}else{
			alert("请重新输入");
		}
	});
	//输入页码跳转，回车键跳转
	toPageNum.onkeyup=function(){
		this.value=this.value.replace(/[^\r\n0-9\，]/g,'');  //只准输入数字
		if (event.keyCode == 13){//enter  27ESC
			updateTable(toPageNum.value-1);
		}
	};
	
	//返回json集合的长度
	function getJsonObjLength(jsonObj) {
        var Length = 0;
        for (var item in jsonObj) {
            Length++;
        }
        return Length;
    }
	function updateTable(pageNum){//输入为页数，从0开始
		$.post("../logistics/query","type=lid&id="+lid,function(data,stadus){
			var headHtml="";
			var bodyHtml="";
			var pageSize = 10; //页的大小
			var length = getJsonObjLength(data.parameter);
			
			if(pageNum<0) pageNum=0;
			if(pageNum>=Math.ceil(length/pageSize)) pageNum = Math.ceil(length/pageSize)-1;
			//显示页号及总数
			currentPage = pageNum;
			$("#pageNumber").html((pageNum+1)+"&nbsp;");
			$("#pageSum").html(Math.ceil(length/pageSize)+"&nbsp;");
			$("#dataSum").html(length+"&nbsp;");
			$("#toPageNum").val(pageNum+1);
			//逐行显示
			if(length!=0){
				//显示表头
				var i = pageNum*pageSize;
					headHtml = "<tr>"+
			        "<th>物流信息编号</th>"+
			        "<th>地点</th>"+
			        "<th>时间</th>"+
			        "<th>状态</th>"+
			        "</tr>";
					for(i = pageNum*pageSize;(i<length)&&(i<(pageNum+1)*pageSize);i++){
						bodyHtml += "<tr id="+i+">"+ 
									       "<td>"+data.parameter[i].logisticsID+"</td>"+
									       "<td>"+data.parameter[i].address+"</td>"+
									       "<td>"+data.parameter[i].time+"</td>"+
									       "<td>"+data.parameter[i].state+"</td>"+  
									       "</tr>";	
					}
				$(".pagin").attr("style","display:block");
				$("#tableHead").html(headHtml);
				$("#tableBody").html(bodyHtml);
			}
			//查无数据
			else{
				$(".pagin").attr("style","display:none");
				$("#noDataWarn").fadeIn(200);
				$("#tableHead").html("");
				$("#tableBody").html("");
			} 
			
		},"json");
	}
	$(".pagenxt").click(function (){
		updateTable(currentPage+1);
	});
	$(".pagepre").click(function (){
		updateTable(currentPage-1);
	});
	
	$(".sure").click(function(){
		$(".tip").fadeOut(100);
	});

	$(".cancel").click(function(){
		$(".tip").fadeOut(100);
	});
});
