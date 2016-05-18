document.write("<script type='text/javascript' src='js/jquery.js'></script>");

$(document).ready(function(){
//	alert(location.href.split("=")[1]);
	//获取连接中的用户id参数
	var id = location.href.split("=")[1];
	var permission = "1";
	//像servlet提交请求，根据返回数据，读取个人信息显示在桌面上
	$.post("../user/aboutSelf","id="+id,function(data,status){
		if(data.statuscode==1)
		{	
			id = data.parameter.id;
			permission = data.parameter.permission;
			$('#ps1').val(data.parameter.userName);
			$('#ps2').val(data.parameter.password);
			$('#ps3').val(data.parameter.permission);
			$('#ps4').val(data.parameter.scopes);
			$('#ps5').val(data.parameter.name);
			$('#ps6').val(data.parameter.email);
			$('#ps7').val(data.parameter.phoneNumber);
			$('#ps8').val(data.parameter.remark);
		}
	},"json");
	//关闭按钮，直接关闭当前信息显示页面
	$("#modifyReset").click(function(){	

		window.close();
		$("#content").attr("style","display:none");
	});
	//修改按钮
	$("#submit").click(function(){
		if(confirm("是否确认修改?")){
			var userName=$('#ps1').val();
			var password=$('#ps2').val();
			var scopes=$('#ps4').val();
			var name=$('#ps5').val();
			var email=$('#ps6').val();
			var phoneNumber=$('#ps7').val();
			var remark=$('#ps8').val();
			
			var datas ="id="+id+"&userName="+userName+"&password="+password+"&permission="+permission+"&scopes="+scopes+"&name="+name+
						"&email="+email+"&phoneNumber="+phoneNumber+"&remark="+remark;
			$.post("../user/update",datas,function(data,status){
				if(data.parameter==true)
					alert("修改成功!");
				else
					alert("修改失败，请重试!");
			},"json");
		}
	});
});