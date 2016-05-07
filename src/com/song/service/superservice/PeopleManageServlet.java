package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Administrators;
import com.song.DBUtils.AdminDbUtils;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class PeopleManageServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public PeopleManageServlet() {
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
		String permission = request.getParameter("permission");
		String scopes = request.getParameter("scopes");
		System.out.println("permission:"+permission + "scopes:"+scopes);
		MyDBUtils dbUtils = DBFactory.getDBFactory(0);
		//selectAll
		if(permission.equals("")&&scopes.equals("")){
//			System.out.println("Select ALL");
			response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from Administrators")));	
			return;
		}
		else if(permission.equals("")&&(!scopes.equals(""))){
//			System.out.println("Select scopes");
			response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from Administrators where scopes = '"+scopes+"'")));
			return;
		}
		else if((!permission.equals(""))&&scopes.equals("")){
//			System.out.println("Select permission");
			response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from Administrators where permission = "+permission)));
			return;
		}else{
			System.out.println("Select both");
			response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from Administrators where scopes = '"+scopes+"' and permission = "+permission)));
			return;
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
