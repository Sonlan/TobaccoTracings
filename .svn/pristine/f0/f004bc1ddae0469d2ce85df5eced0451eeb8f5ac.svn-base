package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Boxes;
import com.song.DBModule.Cases;
import com.song.DBModule.Logistics;
import com.song.DBModule.Products;
import com.song.DBModule.StoreInfo;
import com.song.DBUtils.AdminDbUtils;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class DeleteServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public DeleteServlet() {
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
		String PATH = request.getScheme() + "://"
				+ request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath() + "/";
		String id = request.getParameter("id");
		String type = request.getParameter("type");  //指示数据表类型
		if(type.equals("administrators")){
			MyDBUtils<AdminDbUtils> dbUtils = DBFactory.getDBFactory(0);
			dbUtils.delete(Integer.parseInt(id));
			response.sendRedirect(PATH+"super/peopleManage.html");
		}else if(type.equals("productID")){
			MyDBUtils<Products> dbUtils = DBFactory.getDBFactory(1);
			dbUtils.delete(id);
			response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
			//response.sendRedirect(PATH+"super/ProductInfo.html?type=productID");
		}else if(type.equals("boxID")){
			MyDBUtils<Boxes> dbUtils = DBFactory.getDBFactory(3);
			dbUtils.delete(id);
			response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
			//response.sendRedirect(PATH+"super/ProductInfo.html?type=boxID");
		}else if(type.equals("caseID")){
			MyDBUtils<Cases> dbUtils = DBFactory.getDBFactory(2);
			dbUtils.delete(id);
			response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
			//response.sendRedirect(PATH+"super/ProductInfo.html?type=caseID");
		}else if(type.equals("id")||type.equals("lid")){
			MyDBUtils<Logistics> dbUtils = DBFactory.getDBFactory(5);
			dbUtils.delete(Integer.parseInt(id));
			response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
			//response.sendRedirect(PATH+"super/LogisticsInfo.html?type="+type);
		}else if(type.equals("selStoreIds")||type.equals("selInDates")){
			MyDBUtils<StoreInfo> dbUtils = DBFactory.getDBFactory(4);
			dbUtils.delete(id);
			response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
			//response.sendRedirect(PATH+"super/StoreInfo.html?type="+type);
		}
		return;
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
