package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Sales;
import com.song.DBModule.StoreInfo;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class salesInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public salesInfoServlet() {
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
		String id = request.getParameter("id");
		String type = request.getParameter("type");
		if(type!=null){
			MyDBUtils<Sales> dbUtils = DBFactory.getDBFactory(6);
			if(id.equals("")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from sales")));
			else if(type.equals("selpName")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from sales where pName='"+id+"'")));
			else if(type.equals("selRegion")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from sales where region='"+id+"'")));
		}else{
			response.getWriter().write(JsonUtils.statusResponse(0,"failed"));
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
