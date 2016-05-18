document.write("<script type='text/javascript' src='js/jquery.js'></script>");

$(document).ready(function(){

	var toPageNum = document.getElementById("toPageNum");
	var datas = null;  //用于取出post得到的data 数据
	var addNew = false;  //用于区别update数据与add数据
	//定义表头
	var caseHead = "<tr>"+
    "<th><input name='' type='checkbox' value='' checked='checked'/></th>"+
    "<th>ID<i class='sort'><img src='images/px.gif' /></i></th>"+			    
    "<th>生产日期</th>"+
    "<th>生产厂家</th>"+
    "<th>生产批号</th>"+
    "<th>所属箱体编号</th>"+
    "<th>物流信息</th>"+
    "<th>备注</th>"+
    "<th>操作</th>"+
    "</tr>";
	var boxHead = "<tr>"+
    "<th><input name='' type='checkbox' value='' checked='checked'/></th>"+
    "<th>ID<i class='sort'><img src='images/px.gif' /></i></th>"+
    "<th>生产日期</th>"+
    "<th>生产厂家</th>"+
    "<th>生产批号</th>"+
    "<th>仓储信息编号</th>"+
    "<th>物流信息</th>"+
    "<th>备注</th>"+
    "<th>操作</th>"+
    "</tr>";
	
	//初始化表格全部
	var type=location.href.split("=")[1];  //通过参数传递
//	var type="boxID";  //查询条件
	if(type=="boxID")
		$("#boxCheckbox").attr("checked","true");
	else if(type=="caseID")
		$("#caseCheckbox").attr("checked","true");
	else if(type=="productID")
		$("#productCheckbox").attr("checked","true");
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
		//强制触发一次页面刷新事件，使type变量（新增类型与页面类型一致，避免混乱）
		$(".click").click();
		if(type=="productID"){//添加产品
			$("#editProduct").css("display","inline");
			$("#editIDp").removeAttr("readonly");
			$("#editIDp").val("");
			$("#editpNamep").val("");
			$("#editPbp").val("");
			$("#editPricep").val("");
			$("#editTargetAddrp").val("");
			$("#editPdp").val("");
			$("#editPap").val("");
			$("#editGpp").val("");
			$("#editManufacturerp").val("");
			$("#editPlp").val("");
			$("#editMaterialp").val("");
			$("#editRangep").val("");
			$("#editStatep").val("");
			$("#editCaseIDp").val("");
			$("#editLogisticsIdp").val("");
			$("#editRemarkp").val("");
			$("#editConsumeAddrp").val("");
			$("#editConsumeTimep").val("");
		}else if(type=="caseID"){//添加盒子
			$("#editCaseIDc").removeAttr("readonly");
			$('#editCaseIDc').val("");
		    $('#editPdc').val("");
		    $('#editGpc').val("");
		    $('#editManufacturerc').val("");
		    $('#editPbc').val("");
		    $('#editBoxIDc').val("");
		    $('#editLogisticsIdc').val("");
		    $('#editpNamec').val("");
		    $('#editAmountc').val("");
		    $('#editPricec').val("");
		    $('#editStatec').val("");
		    $('#editTargetAddrc').val("");
		    $('#editRemarkc').val("");	
		    $("#editConsumeAddrc").val("");
			$("#editConsumeTimec").val("");
		    $("#editCase").css("display","inline");
		}else if(type=="boxID"){
			$("#editBoxIDb").removeAttr("readonly");
			$('#editBoxIDb').val("");
		    $('#editPdb').val("");
		    $('#editGpb').val("");
		    $('#editManufacturerb').val("");
		    $('#editPbb').val("");
		    $('#editStoreIDb').val("");
		    $('#editLogisticsIdb').val("");
		    $('#editpNameb').val("");
		    $('#editAmountb').val("");
		    $('#editPriceb').val("");
		    $('#editStateb').val("");
		    $('#editTargetAddrb').val("");
		    $('#editRemarkb').val("");
		    $("#editConsumeAddrb").val("");
			$("#editConsumeTimeb").val("");
		    $("#editBox").css("display","inline");
		}
	});
	$(".click").click(function(){
		$("#editCase").css("display","none");
		$("#editBox").css("display","none");
		$("#editProduct").css("display","none");
		if($("#productCheckbox").attr("checked")==true) type = "productID";
		else if ($("#boxCheckbox").attr("checked")==true) {
			$("#productCheckbox").removeAttr("checked");
			$("#caseCheckbox").removeAttr("checked");
			type="boxID";
		}
		else if($("#caseCheckbox").attr("checked")==true) type="caseID";
		else type="";
		if(type!="")
			updateTable(0);
	});
	//获取查询条件，是否启用筛选
	$("#productCheckbox").click(function(){
		if($("#productCheckbox").attr("checked")==true) {
			$("#boxCheckbox").removeAttr("checked");
			$("#caseCheckbox").removeAttr("checked");
		}
	});
	$("#boxCheckbox").click(function(){
		if($("#boxCheckbox").attr("checked")==true) {
			$("#productCheckbox").removeAttr("checked");
			$("#caseCheckbox").removeAttr("checked");		
		}
	});
	
	$("#caseCheckbox").click(function(){
		if($("#caseCheckbox").attr("checked")==true) {
			$("#productCheckbox").removeAttr("checked");
			$("#boxCheckbox").removeAttr("checked");	
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
		$.post("../product/query","type="+type+"&id="+$("#"+type).val(),function(data,stadus){
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
				if(type=="productID"){
					headHtml = "<tr>"+
			        "<th><input name='' type='checkbox' value='' checked='checked'/></th>"+
			        "<th>ID<i class='sort'><img src='images/px.gif' /></i></th>"+
			        "<th>产品名称</th>"+
			        "<th>生产批号</th>"+
			        "<th>目的销售地</th>"+
			        "<th>产品状态</th>"+
			        "<th>物流信息</th>"+
			        "<th>操作</th>"+
			        "</tr>";
					for(i = pageNum*pageSize;(i<length)&&(i<(pageNum+1)*pageSize);i++){
						bodyHtml += "<tr id="+i+">"+
									       "<td><input name='' type='checkbox' value='' /></td>"+
									       "<td>"+data.parameter[i].id+"</td>"+
									       "<td>"+data.parameter[i].pName+"</td>"+
									       "<td>"+data.parameter[i].pb+"</td>"+
									       "<td>"+data.parameter[i].targetAddr+"</td>"+
									       "<td>"+data.parameter[i].state+"</td>"+
									       "<td><a href='#' class='toLogisticsInfo' value='logisticsId="+data.parameter[i].logisticsId+"'>"+data.parameter[i].logisticsId+ "</a></td>"+
									       "<td><a href='#' class='editInfo' value='id="+i+"&type="+type+"'>查看</a>     <a href='#' class='deleteInfo' value='id="+i+"&type="+type+"'>删除</a></td>"+
									       "</tr>";
					}
				}
				else if(type=="caseID"){
					headHtml = caseHead;
					for(i = pageNum*pageSize;(i<length)&&(i<(pageNum+1)*pageSize);i++){
						bodyHtml += "<tr id="+i+">"+
									       "<td><input name='' type='checkbox' value='' /></td>"+
									       "<td>"+data.parameter[i].caseID+"</td>"+
									       "<td>"+data.parameter[i].pd+"</td>"+
									       "<td>"+data.parameter[i].manufacturer+"</td>"+
									       "<td>"+data.parameter[i].pb+"</td>"+
									       "<td><a href=\"#\" class=\"tablelink\" onclick="+"\"$('#boxCheckbox').attr('checked','true');$('#boxID').val('"+data.parameter[i].boxID+"');$('.click').click();\" >"+data.parameter[i].boxID+ "</a></td>"+
									       "<td><a href='#' class='toLogisticsInfo' value='logisticsId="+data.parameter[i].logisticsId+"'>"+data.parameter[i].logisticsId+ "</a></td>"+
									       "<td>"+data.parameter[i].remark+"</td>"+
									       "<td><a href='#' class='editInfo' value='id="+i+"&type="+type+"'>编辑</a>     <a href='#' class='deleteInfo' value='id="+i+"&type="+type+"'>删除</a></td>"+
									       "</tr>";
					}
				}
				else if(type=="boxID"){
					headHtml = boxHead;
					for(i = pageNum*pageSize;(i<length)&&(i<(pageNum+1)*pageSize);i++){
						bodyHtml += "<tr id="+i+">"+
									       "<td><input name='' type='checkbox' value='' /></td>"+
									       "<td>"+data.parameter[i].boxID+"</td>"+
									       "<td>"+data.parameter[i].pd+"</td>"+
									       "<td>"+data.parameter[i].manufacturer+"</td>"+
									       "<td>"+data.parameter[i].pb+"</td>"+
									       "<td><a href='#' class='toStoreInfo' value='storeID="+data.parameter[i].storeID+"'>"+data.parameter[i].storeID+ "</a></td>"+
									       "<td><a href='#' class='toLogisticsInfo' value='logisticsId="+data.parameter[i].logisticsId+"'>"+data.parameter[i].logisticsId+ "</a></td>"+
									       "<td>"+data.parameter[i].remark+"</td>"+
									       "<td><a href='#' class='editInfo' value='id="+i+"&type="+type+"'>编辑</a>     <a href='#' class='deleteInfo' value='id="+i+"&type="+type+"'>删除</a></td>"+
									       "</tr>";
					}
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
			var id="";
			if(datas!=null){
				if(type=="boxID"){id=datas.parameter[i].boxID;}
				else if(type=="caseID"){id=datas.parameter[i].caseID;}
				else if(type=="productID"){id=datas.parameter[i].id;}
				$.post("../manage/delete","id="+id+"&type="+type,function(data,status){
					//删除这一行
					$("tr[id='"+i+"']").remove();
				},"json");		
			}
		}	
	});
	$(".editInfo").live("click",function(){
//		var data = $(this).val();  ie可以，但chrome不兼容
		var data=$(this).attr('value');
		var i = data.split("&")[0].split("=")[1];
		var type = data.split("&")[1].split("=")[1];
		var editHead = "";
		var editBody = "";
		if(datas!=null){  //alert(datas.parameter[id].caseID);显示数据
			addNew=false;  //update操作
			if(type=="productID"){
				$("#editIDp").attr("readonly","readonly");
				$("#editProduct").css("display","inline");
				$("#editIDp").val(datas.parameter[i].id);
				$("#editpNamep").val(datas.parameter[i].pName);
				$("#editPbp").val(datas.parameter[i].pb);
				$("#editPricep").val(datas.parameter[i].price);
				$("#editTargetAddrp").val(datas.parameter[i].targetAddr);
				$("#editPdp").val(datas.parameter[i].pd);
				$("#editPap").val(datas.parameter[i].pa);
				$("#editGpp").val(datas.parameter[i].gp);
				$("#editManufacturerp").val(datas.parameter[i].manufacturer);
				$("#editPlp").val(datas.parameter[i].pl);
				$("#editMaterialp").val(datas.parameter[i].material);
				$("#editRangep").val(datas.parameter[i].ranges);
				$("#editStatep").val(datas.parameter[i].state);
				$("#editCaseIDp").val(datas.parameter[i].caseID);
				$("#editLogisticsIdp").val(datas.parameter[i].logisticsId);
				$("#editRemarkp").val(datas.parameter[i].remark);
				$("#editConsumeAddrp").val(datas.parameter[i].consumeAddr);
				$("#editConsumeTimep").val(datas.parameter[i].consumeTime);
			}
			else if(type=="boxID"){
				$("#editBoxIDb").attr("readonly","readonly");
			    $('#editBoxIDb').val(datas.parameter[i].boxID);
			    $('#editPdb').val(datas.parameter[i].pd);
			    $('#editGpb').val(datas.parameter[i].gp);
			    $('#editManufacturerb').val(datas.parameter[i].manufacturer);
			    $('#editPbb').val(datas.parameter[i].pb);
			    $('#editStoreIDb').val(datas.parameter[i].storeID);
			    $('#editLogisticsIdb').val(datas.parameter[i].logisticsId);
			    $('#editpNameb').val(datas.parameter[i].pName);
			    $('#editAmountb').val(datas.parameter[i].amount);
			    $('#editPriceb').val(datas.parameter[i].price);
			    $('#editStateb').val(datas.parameter[i].state);
			    $('#editTargetAddrb').val(datas.parameter[i].targetAddr);
			    $('#editRemarkb').val(datas.parameter[i].remark);	 
			    $("#editConsumeAddrb").val(datas.parameter[i].consumeAddr);
				$("#editConsumeTimeb").val(datas.parameter[i].consumeTime);
			    $("#editBox").css("display","inline");
			}
			else if(type=="caseID"){
				$("#editCaseIDc").attr("readonly","readonly");
				$('#editCaseIDc').val(datas.parameter[i].caseID);
			    $('#editPdc').val(datas.parameter[i].pd);
			    $('#editGpc').val(datas.parameter[i].gp);
			    $('#editManufacturerc').val(datas.parameter[i].manufacturer);
			    $('#editPbc').val(datas.parameter[i].pb);
			    $('#editBoxIDc').val(datas.parameter[i].boxID);
			    $('#editLogisticsIdc').val(datas.parameter[i].logisticsId);
			    $('#editpNamec').val(datas.parameter[i].pName);
			    $('#editAmountc').val(datas.parameter[i].amount);
			    $('#editPricec').val(datas.parameter[i].price);
			    $('#editStatec').val(datas.parameter[i].state);
			    $('#editTargetAddrc').val(datas.parameter[i].targetAddr);
			    $('#editRemarkc').val(datas.parameter[i].remark);	
			    $("#editConsumeAddrc").val(datas.parameter[i].consumeAddr);
				$("#editConsumeTimec").val(datas.parameter[i].consumeTime);
			    $("#editCase").css("display","inline");
			}
			
		}
			
	});
	$(".cancelEdit").live("click",function(){
		if(type=="productID"){
			$("#editProduct").css("display","none");
		}
		else if(type=="caseID"){
			$("#editCase").css("display","none");
		}else if(type=="boxID"){
			$("#editBox").css("display","none");
		}
	});
	$(".saveEdit").live("click",function(){
		var sendData = "";
		if(confirm("你确定要修改这些数据?")){
			if(type=="productID"){
				sendData="type="+type+"&id="+$("#editIDp").val()+"&pName="+$("#editpNamep").val()+"&pb="+$("#editPbp").val()+"&price="+$("#editPricep").val()+"&targetAddr="+$("#editTargetAddrp").val()+"&pd="+$("#editPdp").val()+"&pa="+$("#editPap").val()+"&manufacturer="+$("#editManufacturerp").val()+"&pl="+$("#editPlp").val()
								+"&material="+$("#editMaterialp").val()+"&range="+$("#editRangep").val()+"&state="+$("#editStatep").val()+"&caseID="+$("#editCaseIDp").val()+"&logisticsId="+$("#editLogisticsIdp").val()+"&remark="+$("#editRemarkp").val()+"&gp="+$("#editGpp").val()+"&consumeAddr="+$("#editConsumeAddrp").val()+"&consumeTime="+$("#editConsumeTimep").val();
			}
			else if(type=="boxID"){
				sendData="type="+type+"&boxID="+$("#editBoxIDb").val()+"&pd="+$("#editPdb").val()+"&gp="+$("#editGpb").val()+"&manufacturer="+$("#editManufacturerb").val()+"&pb="+$("#editPbb").val()+"&storeID="+$("#editStoreIDb").val()+"&logisticsId="+$("#editLogisticsIdb").val()+"&remark="+$("#editRemarkb").val()
				+"&pName="+$("#editpNameb").val()+"&amount="+$("#editAmountb").val()+"&price="+$("#editPriceb").val()+"&state="+$("#editStateb").val()+"&targetAddr="+$("#editTargetAddrb").val()+"&consumeAddr="+$("#editConsumeAddrb").val()+"&consumeTime="+$("#editConsumeTimeb").val();
			}
			else if(type=="caseID"){
				sendData="type="+type+"&caseID="+$("#editCaseIDc").val()+"&pd="+$("#editPdc").val()+"&gp="+$("#editGpc").val()+"&manufacturer="+$("#editManufacturerc").val()+"&pb="+$("#editPbc").val()+"&boxID="+$("#editBoxIDc").val()+"&logisticsId="+$("#editLogisticsIdc").val()+"&remark="+$("#editRemarkc").val()
				+"&pName="+$("#editpNamec").val()+"&amount="+$("#editAmountc").val()+"&price="+$("#editPricec").val()+"&state="+$("#editStatec").val()+"&targetAddr="+$("#editTargetAddrc").val()+"&consumeAddr="+$("#editConsumeAddrc").val()+"&consumeTime="+$("#editConsumeTimec").val();
			}
			alert(sendData);
			if(sendData!=""){//addNew用于区别update和add动作
				$.post("../product/update",sendData+"&addNew="+addNew,function(data,stadus){
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
	//跳转到物流信息栏，子frame通信
	$(".toLogisticsInfo").live("click",function(){
		var data=$(this).attr('value');
		var logisticsId = data.split("=")[1];
		parent.frames["leftFrame"].toLogisticsInfo();  //使left.html页面选择物流信息栏，但此处实在没法让它跳转，所以加了下面一句话
		location.href="LogisticsInfo.html?type=lid&data="+logisticsId; //跳转到物流页面
	});
	//跳转到仓储信息栏，子frame通信
	$(".toStoreInfo").live("click",function(){
		var data=$(this).attr('value');
		var StoreId = data.split("=")[1];
		parent.frames["leftFrame"].toStoreInfo();  //使left.html页面选择物流信息栏，但此处实在没法让它跳转，所以加了下面一句话
		location.href="StoreInfo.html?type=selStoreIds&data="+StoreId; //跳转到物流页面
	});
	
});
