package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Administrators;
import com.song.DBUtils.AdminDbUtils;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class AddNewPersonServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public AddNewPersonServlet() {
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
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
		String permission=request.getParameter("permission");
		String scopes=request.getParameter("scopes");
		String name=request.getParameter("name");
		String email=request.getParameter("email");
		String phoneNumber=request.getParameter("phoneNumber");
		String remark=request.getParameter("remark");
		Administrators admin = new Administrators();
		admin.setUserName(userName);
		admin.setPassword(password);
		admin.setPermission(Integer.parseInt(permission));
		admin.setScopes(scopes);
		admin.setName(name);
		admin.setEmail(email);
		admin.setPhoneNumber(phoneNumber);
		admin.setRemark(remark);
		
		MyDBUtils dbUtils = DBFactory.getDBFactory(0);
		boolean flag = dbUtils.add(admin);
		
		response.getWriter().write(JsonUtils.statusResponse(1, flag));
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
