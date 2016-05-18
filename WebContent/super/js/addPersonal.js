document.write("<script type='text/javascript' src='js/jquery.js'></script>");

$(document).ready(function(){
	//关闭按钮，直接关闭当前信息显示页面
	$("#modifyReset").click(function(){	

		window.close();
		$("#content").attr("style","display:none");
	});
	//修改按钮
	$("#submit").click(function(){
		if(confirm("是否确认添加新用户?")){
			var userName=$('#ps1').val();
			var password=$('#ps2').val();
			var permission=$('#ps3').val();
			var scopes=$('#ps4').val();
			var name=$('#ps5').val();
			var email=$('#ps6').val();
			var phoneNumber=$('#ps7').val();
			var remark=$('#ps8').val();
			
			var datas ="&userName="+userName+"&password="+password+"&permission="+permission+"&scopes="+scopes+"&name="+name+
						"&email="+email+"&phoneNumber="+phoneNumber+"&remark="+remark;
			$.post("../user/add",datas,function(data,status){
				if(data.parameter==true)
					alert("添加成功!");
				else
					alert("添加失败，请重试!");
			},"json");
		}
	});
});