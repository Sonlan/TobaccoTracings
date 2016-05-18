document.write("<script type='text/javascript' src='js/jquery.js'></script>");

$(document).ready(function(){

	var toPageNum = document.getElementById("toPageNum");
	var datas = null;  //用于取出post得到的data 数据
	var addNew = false;  //用于区别update数据与add数据	
	//初始化表格全部
	var type=location.href.split("?")[1].split("&")[0].split("=")[1];  //通过参数传递,查询对象
	var selID=location.href.split("=")[2];//查询条件
	$("#"+type).val(selID);
	if(type=="selStoreIds")
		$("#storeIdsCheckbox").attr("checked","true");
	else if(type=="selInDates")
		$("#inDatesCheckbox").attr("checked","true");
	updateTable(0);
	$(".click").mousedown(function(){
		$(".click").css("background-color", "#FFE4C4");
	});
	$(".click").mouseup(function(){
		$(".click").css("background-color", "#F0FFFF");
	});
	//add new Items
	$(".addItems").click(function(){
		addNew=true;
		$("#editStoreInfo").css("display","inline");
		$("#editWarehouseIDs").removeAttr("readonly");
		$('#editstoreIDs').val("");
		$('#editWarehouseIDs').val("");
		$('#editInDates').val("");
		$('#editOutDates').val("");
		$('#editPbs').val("");
		$('#editLocations').val("");
	    $('#editStates').val("");
	    $('#editRemarks').val("");
	});
	$(".click").click(function(){
		$("#editStoreInfo").css("display","none");
		if($("#storeIdsCheckbox").attr("checked")==true) type = "selStoreIds";
		else if ($("#inDatesCheckbox").attr("checked")==true) {
			type="selInDates";
		}else type="";
		if(type!="")
			updateTable(0);
	});
	//获取查询条件，是否启用筛选
	$("#storeIdsCheckbox").click(function(){
		if($("#storeIdsCheckbox").attr("checked")==true) {
			$("#inDatesCheckbox").removeAttr("checked");
		}else{
			$("#storeIdsCheckbox").attr("checked","true");
		}
	});
	$("#inDatesCheckbox").click(function(){
		if($("#inDatesCheckbox").attr("checked")==true) {
			$("#storeIdsCheckbox").removeAttr("checked");		
		}else{
			$("#inDatesCheckbox").attr("checked","true");
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
		$.post("../storeInfo/query","type="+type+"&id="+$("#"+type).val(),function(data,stadus){
			//取出数据，供其他函数调用
			datas = data;
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
			        "<th><input name='' type='checkbox' value='' checked='checked'/></th>"+
			        "<th>ID<i class='sort'><img src='images/px.gif' /></i></th>"+
			        "<th>仓库编号</th>"+
			        "<th>入库时间</th>"+
			        "<th>出库时间</th>"+
			        "<th>产品生产批号</th>"+
			        "<th>仓库地址</th>"+
			        "<th>是否为空</th>"+
			        "<th>备注</th>"+
			        "<th>操作</th>"+
			        "</tr>";
					for(i = pageNum*pageSize;(i<length)&&(i<(pageNum+1)*pageSize);i++){
						bodyHtml += "<tr id='"+i+"'>"+
									       "<td><input name='' type='checkbox' value='' /></td>"+
									       "<td>"+data.parameter[i].storeID+"</td>"+
									       "<td>"+data.parameter[i].warehouseID+"</td>"+
									       "<td>"+data.parameter[i].inDate+"</td>"+
									       "<td>"+data.parameter[i].outDate+"</td>"+
									       "<td>"+data.parameter[i].pb+"</td>"+
									       "<td>"+data.parameter[i].location+"</td>"+
									       "<td>"+data.parameter[i].state+"</td>"+
									       "<td>"+data.parameter[i].remark+"</td>"+
									       "<td><a href='#' class='editInfo' value='id="+i+"'>查看</a>     <a href='#' class='deleteInfo' value='id="+i+"&type="+type+"'>删除</a></td>"+
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
	//删除信息
	$(".deleteInfo").live("click",function(){
		if(confirm("你确定要删除这些数据?")){
//			var data = $(this).val();  ie可以，但chrome不兼容
			var data=$(this).attr('value');
			var type = data.split("=")[2];
			var i = data.split("&")[0].split("=")[1];
			if(datas!=null){
				$.post("../manage/delete","id="+datas.parameter[i].warehouseID+"&type="+type,function(data,status){
					//删除这一行
					$("tr[id='"+i+"']").remove();
				},"json");		
			}
		}	
	});
	$(".editInfo").live("click",function(){
//		var data = $(this).val();  ie可以，但chrome不兼容
		var data=$(this).attr('value');
		var i = data.split("=")[1];
		if(datas!=null){  //alert(datas.parameter[id].caseID);显示数据
			addNew=false;  //update操作
			
			$("#editWarehouseIDs").attr("readonly","readonly");
			$('#editstoreIDs').val(datas.parameter[i].storeID);
			$('#editWarehouseIDs').val(datas.parameter[i].warehouseID);
			$('#editInDates').val(datas.parameter[i].inDate);
			$('#editOutDates').val(datas.parameter[i].outDate);
			$('#editPbs').val(datas.parameter[i].pb);
			$('#editLocations').val(datas.parameter[i].location);
			$('#editStates').val(datas.parameter[i].state);	  
			$('#editRemarks').val(datas.parameter[i].remark);
			$("#editStoreInfo").css("display","inline");		
		}
			
	});
	$(".cancelEdit").live("click",function(){
		$("#editStoreInfo").css("display","none");

	});
	$(".saveEdit").live("click",function(){
		var sendData = "";
		if(confirm("你确定要修改这些数据?")){
			sendData="storeID="+$("#editstoreIDs").val()+"&warehouseID="+$("#editWarehouseIDs").val()+"&inDate="+$("#editInDates").val()
			+"&outDate="+$("#editOutDates").val()+"&pb="+$("#editPbs").val()+"&location="+$("#editLocations").val()+"&state="+$("#editStates").val()+"&remark="+$("#editRemarks").val();
	
			if(sendData!=""){//addNew用于区别update和add动作
				$.post("../storeInfo/update",sendData+"&addNew="+addNew,function(data,stadus){
					if(data.statuscode==0){//有错误
						alert("修改失败，请检查数据输入");
					}
					else if(data.statuscode==1){
						alert("修改成功");
						$(".click").click();//刷新数据
						$(".cancelEdit").click();  //关闭该栏
					}
					else{
						alert("未知错误，请稍候重试");
					}
				},"json");
			}
		}
	});
	
});
