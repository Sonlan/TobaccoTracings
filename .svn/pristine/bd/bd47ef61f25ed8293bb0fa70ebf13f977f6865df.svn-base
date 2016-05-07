package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Boxes;
import com.song.DBModule.Cases;
import com.song.DBModule.Products;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class ProductInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public ProductInfoServlet() {
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
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setCharacterEncoding("utf-8");
		request.setCharacterEncoding("utf-8");
		String id = request.getParameter("id");
		String type = request.getParameter("type");
		if(type.equals("boxID")){
			MyDBUtils<Boxes> dbUtils = DBFactory.getDBFactory(3);
			if(id.equals("")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from boxes")));
			else response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from boxes where boxID='"+id+"'")));
		}else if(type.equals("caseID")){
			MyDBUtils<Cases> dbUtils = DBFactory.getDBFactory(2);
			if(id.equals("")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from cases")));
			else response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from cases where caseID='"+id+"'")));
		}else if(type.equals("productID")){
			MyDBUtils<Products> dbUtils = DBFactory.getDBFactory(1);
			if(id.equals("")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from products")));
			else response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from products where id='"+id+"'")));
		}else{
			
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

}
