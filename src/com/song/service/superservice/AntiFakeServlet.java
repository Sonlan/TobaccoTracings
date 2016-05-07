package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Administrators;
import com.song.DBModule.Boxes;
import com.song.DBModule.Cases;
import com.song.DBModule.Products;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class AntiFakeServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public AntiFakeServlet() {
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
		String id=request.getParameter("id");  //防伪查询，产品序列号
		System.out.println(id);
		if(id!=null){
			String key = id.trim().toUpperCase().substring(0, 1);  //截取首字符
			System.out.println(key);
			if(key.equals("P")){//产品
				queryInfo(0,id,response);
			}else if(key.equals("B")){
				queryInfo(2,id,response);
			}else if(key.equals("C")){
				queryInfo(1,id,response);
			}else response.getWriter().write(JsonUtils.statusResponse(0,"请输入有效查询码"));
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
	 * 
	 * @param key 整型 用于区分待查询的数据库
	 * @param 0 product 1 case 2 box
	 * @throws IOException 
	 */
	private void queryInfo(int key,String id,HttpServletResponse response) throws IOException{
		switch (key){
		case 0:{
			MyDBUtils<Products> dbUtils = DBFactory.getDBFactory(1);
			response.getWriter().write(JsonUtils.statusResponse(1,dbUtils.select(id)));
			break;
		}
		case 1:{
			MyDBUtils<Cases> dbUtils = DBFactory.getDBFactory(2);
			response.getWriter().write(JsonUtils.statusResponse(1,dbUtils.select(id)));
			break;
		}
		case 2:{
			MyDBUtils<Boxes> dbUtils = DBFactory.getDBFactory(3);
			response.getWriter().write(JsonUtils.statusResponse(1,dbUtils.select(id)));
			break;
		}
		default:response.getWriter().write(JsonUtils.statusResponse(0,"请输入有效查询码"));break;
		}
	}

}
