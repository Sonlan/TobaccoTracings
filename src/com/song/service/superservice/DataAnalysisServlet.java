package com.song.service.superservice;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.omg.CORBA.PRIVATE_MEMBER;

import com.song.DBModule.Sales;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class DataAnalysisServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public DataAnalysisServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setCharacterEncoding("utf-8");
		request.setCharacterEncoding("utf-8");
		String type=request.getParameter("type");  //产品种类
		String region = request.getParameter("region"); //地域
		MyDBUtils<Sales> dbUtils = DBFactory.getDBFactory(6);
		List<Sales> list = new ArrayList<Sales>();
		//按箱搜索
		if(!type.equals("")){//非空
			if(!region.equals("")){//地区产品销量趋势图
				response.getWriter().write(JsonUtils.statusResponse(1, queryByTime(region, type)));
				
			}else{//按产品种类查询地域销量分布
				response.getWriter().write(JsonUtils.statusResponse(1, queryByregion(type)));
			}
		}else{
			if(!region.equals("")){//按地区查询不同产品销量分布
				response.getWriter().write(JsonUtils.statusResponse(1, queryByAddr(region)));				
			}else{//查询无效
				response.getWriter().write(JsonUtils.statusResponse(1, "both are null"));				
			}
		}
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}
	
	/**
	 * 按地域查询，得到一种商品在全国各省市的销量分布
	 * @param pName 产品名
	 * @return int [34] 按特定顺序的34个省级单位的销售额
	 */
	private HashMap<String , Integer> queryByregion(String pName){
		MyDBUtils<Sales> dbUtils = DBFactory.getDBFactory(6);
		List<Sales> list = new ArrayList<Sales>();
		list = dbUtils.query("select * from sales where pName='"+pName+"'");  //去除相应产品的所有销售记录
		HashMap<String, Integer> result = new HashMap<String, Integer>();
		for(int i=0;i<list.size();i++){//依次遍历取得的数据，统计各地区销售额
			result.put(list.get(i).getRegion(), list.get(i).getNum());
		}
		return result;
	} 
	/**
	 * 按产品查询，得到某一地区所有在册产品的销量分布
	 * @param region 地域名
	 * @return result 当前地域下，所有产品的销售额
	 */
	private HashMap<String , Integer> queryByAddr(String region){
		MyDBUtils<Sales> dbUtils = DBFactory.getDBFactory(6);
		List<Sales> list = new ArrayList<Sales>();
		if("中国".equals(region.trim())) list = dbUtils.query("select * from sales");
		else list = dbUtils.query("select * from sales where region='"+region+"'");  //某地相应产品的所有销售记录
		HashMap<String, Integer> result = new HashMap<String, Integer>();
		for(int i=0;i<list.size();i++){//依次遍历取得的数据，统计各地区销售额
			if(result.containsKey(list.get(i).getpName()))
				result.put(list.get(i).getpName(), list.get(i).getNum()+result.get(list.get(i).getpName()));
			else result.put(list.get(i).getpName(), list.get(i).getNum());
		}
		return result;
	}
	/**
	 * 用于查询某产品在某地区的销量变化趋势图
	 * @param region 地区
	 * @param pName  品名
	 * @return （时间，销量）
	 */
	private HashMap<String , Integer> queryByTime(String region,String pName){
//		Date date = new Date();
		MyDBUtils<Sales> dbUtils = DBFactory.getDBFactory(6);
		List<Sales> list = new ArrayList<Sales>();
		if("中国".equals(region.trim())) list = dbUtils.query("select * from sales where pName='"+pName+"'");
		else list = dbUtils.query("select * from sales where region='"+region+"' and pName='"+pName+"'");  //某地相应产品的所有销售记录
		HashMap<String, Integer> result = new HashMap<String, Integer>();
		if(null != list){
			for(int i=0;i<list.size();i++){//依次遍历取得的数据，统计各地区销售额
				if(result.containsKey(list.get(i).getTime()))
					result.put(list.get(i).getTime(), list.get(i).getNum()+result.get(list.get(i).getTime()));
				else result.put(list.get(i).getTime(), list.get(i).getNum());
			}
			return result;
		}else return null;
	}

}
