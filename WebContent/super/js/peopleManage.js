document.write("<script type='text/javascript' src='js/jquery.js'></script>");
$(document).ready(function(){
	var permission = "";  //权限等级
	var scopes = "";  //监管范围
	var deleteAble = false;  //是否删除选中选项
	var perAble = false; //权限选中
	var scoAble = false;  //监管范围选中
	var addType = 0;  //添加条目的类型
	var currentPage = 0;  //当前页码
	var permissionSelect = document.getElementById("permissionSelect");
	var scopesSelect = document.getElementById("scopesSelect");
	var toPageNum = document.getElementById("toPageNum");
	var newScopes = document.getElementById("newScopes");
	
	var count1 = 0 ;//计数变量，控制添加text栏的收缩
	var count2 = 0;
	//初始化表格全部
	updateTable(0);
	$(".click").mousedown(function(){
		$(".click").css("background-color", "#FFE4C4");
	});
	$(".click").mouseup(function(){
		$(".click").css("background-color", "#F0FFFF");
	});
	$(".click").click(function(){
		if(perAble) {
			for(i=0;i<permissionSelect.length;i++){
				if(permissionSelect.options[i].selected == true)
					permission = permissionSelect.options[i].text;
			}
		}else permission="";
		if(scoAble){
			for(i=0;i<scopesSelect.length;i++){
				if(scopesSelect.options[i].selected == true)
					scopes = scopesSelect.options[i].text;
			}
		}
		else scopes="";
		
		updateTable(0);
	});
	//获取查询条件，是否启用筛选
	$("#permissionCheckbox").click(function(){
		if($("#permissionCheckbox").attr("checked")==true) {
			$("#deleteCheckbox").removeAttr("checked");
			$("#deleteCheckbox").attr("disabled","disabled");
			deleteAble=false;
			perAble = true;
		}
		else {
			if(scoAble==false) $("#deleteCheckbox").removeAttr("disabled");
			perAble = false;
		}
	});
	//添加以及删除条目操作
	//
	$("#deleteCheckbox").click(function(){
		if($("#deleteCheckbox").attr("checked")==true) {
			deleteAble = true;
		}
		else {
			deleteAble = false;
		}
	});
	$('#scopesSelect').change(function(){
		var maxIndex=$("#scopesSelect option:last").attr("index");  //获取Select最大的索引值
		var checkIndex=$("#scopesSelect ").get(0).selectedIndex;  //获取Select选择的索引值
		if(checkIndex==maxIndex){//+
			addType = 1;
			$("#addOption").fadeIn(200);  //添加操作在该div中完成
		}
		else if(deleteAble==true){
			$("#scopesSelect option[index="+checkIndex+"]").remove();
			$("#scopesSelect ").get(0).selectedIndex=0;
		}
	});
	permissionSelect.onchange=function(){
		var maxIndex=$("#permissionSelect option:last").attr("index");  //获取Select最大的索引值
		var checkIndex=$("#permissionSelect ").get(0).selectedIndex;  //获取Select选择的索引值
		if(checkIndex==maxIndex){//+
			addType = 0;
			$("#addOption").fadeIn(200);  //添加操作在该div中完成
		}else if(deleteAble==true){
			$("#permissionSelect option[index="+checkIndex+"]").remove();
			$("#scopesSelect ").get(0).selectedIndex=0;
		}
	};
	
	$("#scopesCheckbox").click(function(){
		if($("#scopesCheckbox").attr("checked")==true) {
			$("#deleteCheckbox").removeAttr("checked");
			$("#deleteCheckbox").attr("disabled","disabled");
			deleteAble=false;
			scoAble = true;
			
		}
		else{
			if(perAble==false) $("#deleteCheckbox").removeAttr("disabled");
			scoAble= false;
		}
	});
	//新增条目输入框确定和取消按钮
	$("#addOK").click(function(){
		var newOption = $(".newOptionText").val();
		if(newOption!=null){
			if(addType==0) {
				$("#permissionSelect option:last").remove();
				$("#permissionSelect").append("<option>"+newOption+"</option>");
				$("#permissionSelect").append("<option>+</option>");
			}
			else{
				$("#scopesSelect option:last").remove();
				$("#scopesSelect").append("<option>"+newOption+"</option>");
				$("#scopesSelect").append("<option>+</option>");
			}
		}
	});
	//输入页码跳转，回车键跳转
	toPageNum.onkeyup=function(){
		this.value=this.value.replace(/[^\r\n0-9\，]/g,'');  //只准输入数字
		if (event.keyCode == 13){//enter  27ESC
			updateTable(toPageNum.value-1);
		}
	};
//	$("#toPageNum").change(function(){
//		
//	});
	
	//返回json集合的长度
	function getJsonObjLength(jsonObj) {
        var Length = 0;
        for (var item in jsonObj) {
            Length++;
        }
        return Length;
    }
	function updateTable(pageNum){//输入为页数，从0开始
		$.post("../user/query","permission="+permission+"&scopes="+scopes,function(data,stadus){
			var headHtml = "<tr>"+
	        "<th><input name='' type='checkbox' value='' checked='checked'/></th>"+
	        "<th>ID<i class='sort'><img src='images/px.gif' /></i></th>"+
	        "<th>用户名</th>"+
	        "<th>责任人姓名</th>"+
	        "<th>权限等级</th>"+
	        "<th>监管范围</th>"+
	        "<th>操作</th>"+
	        "</tr>";
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
				$("#tableHead").html(headHtml);
				//显示表体
				var i = pageNum*pageSize;
				var warming = "你确定删除该数据?";
				for(i = pageNum*pageSize;(i<length)&&(i<(pageNum+1)*pageSize);i++){
					bodyHtml += "<tr>"+
								       "<td><input name='' type='checkbox' value='' /></td>"+
								       "<td>"+data.parameter[i].id+"</td>"+
								       "<td>"+data.parameter[i].userName+"</td>"+
								       "<td>"+data.parameter[i].name+"</td>"+
								       "<td>"+data.parameter[i].permission+"</td>"+
								       "<td>"+data.parameter[i].scopes+"</td>"+
								       "<td><a href='personalInfo.html?id="+data.parameter[i].id+"' class='tablelink' target='_blank'>查看</a>     <a href='../manage/delete?id="+data.parameter[i].id+"&type=administrators' class='tablelink' onclick='if(confirm(\"你确定要删除这些数据?\")) return ture;else return false;'>删除</a></td>"+
								       "</tr>";
				}
				$(".pagin").attr("style","display:block");
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
});