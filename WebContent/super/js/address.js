$(document).ready(function(){
	 var deleteAble = false;  //是否删除选中项的标志量
	 var addType = 0;  //用于增添下拉菜单选项时区分是哪个下拉菜单，0：type 1:region
	 var type="";//产品种类
	 var region="";//地理区域
	 //插件初始化
	 $.post("../manage/configInit","cmd=proType",function(data,stadus){
		 var options = "";
		 var i = 0;
		 $("#typeSelect").trigger("liszt:updated");
		 var protypes = data.parameter.split("&")[0].split(",");
		 for(i=0;i<protypes.length;i++){
			 options+="<option value='"+protypes[i]+"'>"+protypes[i]+"</option>";
		 }
		 $("#typeSelect").append(options);
		 
		 $("#regionSelect").trigger("liszt:updated");
		 options = "";
		 var regions = data.parameter.split("&")[1].split(",");
		 for(i=0;i<regions.length;i++){
			 options+="<option value='"+regions[i]+"'>"+regions[i]+"</option>";
		 }
		 $("#regionSelect").append(options);
		 
		 $("#typeSelect").chosen({no_results_text: "没有匹配结果",search_contains: true});
		 $("#regionSelect").chosen({no_results_text: "没有匹配结果",search_contains: true});
	 },"json");
	 
	 /**
	  * 查看按钮点击变色效果
	  */
	 $(".click").mousedown(function(){
		$(".click").css("background-color", "#FFE4C4");
	 });
	 $(".click").mouseup(function(){
		$(".click").css("background-color", "#F0FFFF");
	 });
	 /**
	  * 查看按钮响应事件
	 */
	 $(".click").click(function(){
		 $(".container").attr("style","display:none");
		 $(".container1").attr("style","display:none");
		 //产品种类选择
		 if($("#typeCheckbox").attr("checked")==true) {
			 if(typeSelect.length>1){
				 for(i=1;i<typeSelect.length;i++){ //从1开始，避免第一默认项
						if(typeSelect.options[i].selected == true)
							type = typeSelect.options[i].text;
				 }
			 }else  type="";
		 }else type="";
		//地域选择
		 if($("#regionCheckbox").attr("checked")==true) {
			 if(regionSelect.length>1){
				 for(i=1;i<regionSelect.length;i++){
						if(regionSelect.options[i].selected == true)
							region = regionSelect.options[i].text;
				 }	
			 }else region="";
		 }else region="";
		 if(region!="" || type!=""){  //一项非空则开启查询
			 $.post("../manage/dataAnalysis","type="+type+"&region="+region,function(data,stadus){
				 if(type!=""){
					 if(region!=""){
						 var i =0;
						 var time = new Array();
						 var nums = new Array();
						 for(var index in data.parameter){
							 time[i]=index;
							 nums[i]=data.parameter[index];
							 i++;
						 }
						 $(".container1").attr("style","display:block");
						 lineChart(type+'全国销量统计曲线图',time,nums);
					 }else{//按种类查询，不同地区销量分布
						 var i =0;
						 var regions = new Array();
						 var nums = new Array();
						 for(var index in data.parameter){
							 regions[i]=index;
							 nums[i]=data.parameter[index];
							 i++;
						 }
						 $(".container").attr("style","display:block");
						 barCharts(type+'全国销量统计知方图',regions,nums);
						 pieCharts(type+'全国销量统计饼图',regions,nums);
					 }
				 }else{
					 if(region!=""){//按地区查询，不同产品销量分布
						 var i =0;
						 var pNames = new Array();
						 var nums = new Array();
						 for(var index in data.parameter){
							 pNames[i]=index;
							 nums[i]=data.parameter[index];
							 i++;
						 }
						 $(".container").attr("style","display:block");
						 barCharts(region+"地区产品销量直方图",pNames,nums);
						 pieCharts(region+"地区产品销量饼图",pNames,nums);
					 }else{
						 
					 }
				 }
			 },"json");
		 }
	 });
			/**
			 * 添加以及删除条目操作
			 */
			$("#deleteCheckbox").click(function(){
				if($("#deleteCheckbox").attr("checked")==true) {
					deleteAble = true;
				}
				else {
					deleteAble = false;
				}
			});
			/**
			 * 产品种类下拉菜单响应
			 */
			$('#typeSelect').change(function(){
				var maxIndex=$("#typeSelect option:last").attr("index");  //获取Select最大的索引值
				var checkIndex=$("#typeSelect ").get(0).selectedIndex;  //获取Select选择的索引值
				if(checkIndex==maxIndex){//+
					addType = 0;
					$("#addOption").fadeIn(200);  //添加操作在该div中完成
				}
				else if(deleteAble==true && checkIndex!=0){
					$("#typeSelect option[index="+checkIndex+"]").remove();
					$("#typeSelect ").get(0).selectedIndex=0;
				}
			});
			/**
			 * 地理区域下拉菜单响应
			 */
			$('#regionSelect').change(function(){
				var maxIndex=$("#regionSelect option:last").attr("index");  //获取Select最大的索引值
				var checkIndex=$("#regionSelect ").get(0).selectedIndex;  //获取Select选择的索引值
				if(checkIndex==maxIndex){//+
					addType = 1;
					$("#addOption").fadeIn(200);  //添加操作在该div中完成
				}
				else if(deleteAble==true && checkIndex!=0){
					$("#regionSelect option[index="+checkIndex+"]").remove();
					$("#regionSelect ").get(0).selectedIndex=0;
				}
			});
			/**
			 * 新增条目div响应
			 */
			$("#addOK").click(function(){
				var newOption = $(".newOptionText").val();
				if(newOption!=null){
					if(addType==0) {
						$("#typeSelect option:last").remove();
						$("#typeSelect").append("<option>"+newOption+"</option>");
						$("#typeSelect").append("<option>+</option>");
					}
					else{
						$("#regionSelect option:last").remove();
						$("#regionSelect").append("<option>"+newOption+"</option>");
						$("#regionSelect").append("<option>+</option>");
					}
				}
			});
			/**
			 * 新增条目栏确定取消效果响应
			 */
			 $(".sure").click(function(){
				 $(".tip").fadeOut(100);
			 });

			 $(".cancel").click(function(){
				 $(".tip").fadeOut(100);
			 });
			 /**
			  * 绘制柱形图
			  */
			 function barCharts(titile,xdatas,ydatas){
				 var chart = {
						 type: 'column',
						 options3d: {
						         enabled: true,     //显示图表是否设置为3D， 我们将其设置为 true
						         alpha: 7,         //图表视图旋转角度
						         beta: 13,          //图表视图旋转角度
						         depth: 50,         //图表的合计深度，默认为100
						         viewDistance: 25   //定义图表的浏览长度
						   }
					   };
					   var title = {
					      text: titile   
					   };
					   var subtitle = {
					      text: 'Source: runoob.com'  
					   };
					   var xAxis = {
					      categories: xdatas,
					      crosshair: true
					   };
					   var yAxis = {
					      min: 0,
					      title: {
					         text: '销量 (包)'         
					      }      
					   };
					   var tooltip = {
					      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					         '<td style="padding:0"><b>{point.y:.1f} 包</b></td></tr>',
					      footerFormat: '</table>',
					      shared: true,
					      useHTML: true
					   };
					   var plotOptions = {
					      column: {
					         pointPadding: 0.2,
					         borderWidth: 0
					      }
					   };  
					   var credits = {
					      enabled: false
					   };
					   
					   var series= [{
					        name: '红塔山',
					        data: ydatas
					        }];     
					      
					   var json = {};   
					   json.chart = chart; 
					   json.title = title;   
					   json.subtitle = subtitle; 
					   json.tooltip = tooltip;
					   json.xAxis = xAxis;
					   json.yAxis = yAxis;  
					   json.series = series;
					   json.plotOptions = plotOptions;  
					   json.credits = credits;
					   $('#container').highcharts(json);

			 }//end of barCharts()
	/**
	* 画饼图
	* @param datas 各部分百分比数组
	*/
	function pieCharts(titile,xdatas,ydatas){
		var percent =  new Array();
		var i=0;
		for(i=0;i<xdatas.length;i++){	
			percent[i] = new Array(xdatas[i],ydatas[i]);
		}
		var chart = {      
				      type: 'pie',     
				      options3d: {
				         enabled: true,
				         alpha: 45,
				         beta: 0
				      }
				   };
				   var title = {
				      text: titile   
				   };   
				   var tooltip = {
				      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				   };

				   var plotOptions = {
				      pie: {
				          allowPointSelect: true,
				          cursor: 'pointer',
				          depth: 35,
				          dataLabels: {
				             enabled: true,
				             format: '{point.name}'
				          }
				      }
				   };   
				   var series= [{
				         type: 'pie',
				            name: '市场占有率',
				            data: percent
				   }];     
				      
				   var json = {};   
				   json.chart = chart; 
				   json.title = title;       
				   json.tooltip = tooltip; 
				   json.plotOptions = plotOptions; 
				   json.series = series;   
				   $('#container1').highcharts(json);
	}
	/**
	 * 绘制曲线图
	 */
	function lineChart(title,xdatas,ydatas){
		   var title = {
		      text: title  
		   };
//		   var subtitle = {
//		      text: 'Source: runoob.com'
//		   };
		   var xAxis = {
			  name:"产品销量",
		      categories:xdatas
		   };
		   var yAxis = {
		      title: {
		         text: '销量 (包)'
		      },
		      plotLines: [{
		         value: 0,
		         width: 1,
		         color: '#808080'
		      }]
		   };   

		   var tooltip = {
		      valueSuffix: '包'
		   }

		   var legend = {
		      layout: 'vertical',
		      align: 'right',
		      verticalAlign: 'middle',
		      borderWidth: 0
		   };

		   var series =  [
		      {
		         data: ydatas
		      }
		   ];

		   var json = {};

		   json.title = title;
//		   json.subtitle = subtitle;
		   json.xAxis = xAxis;
		   json.yAxis = yAxis;
		   json.tooltip = tooltip;
		   json.legend = legend;
		   json.series = series;

		   $('#container2').highcharts(json);
	}
});