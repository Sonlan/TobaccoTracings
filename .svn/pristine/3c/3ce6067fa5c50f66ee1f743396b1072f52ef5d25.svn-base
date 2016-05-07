package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Administrators;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.AdminDbUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;
import com.sun.org.apache.bcel.internal.generic.Select;

public class ReadPersonalInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public ReadPersonalInfoServlet() {
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
		String id = request.getParameter("id").toString();
//		System.out.println("id"+request.getParameter("id").toString());
		MyDBUtils dbUtils = DBFactory.getDBFactory(0);
		Administrators admin = new Administrators();
		if(id.equals("current")){
			String userName = request.getSession().getAttribute("_USERNAME").toString();
			admin = (Administrators) dbUtils.select(userName);
		}else{
			admin = (Administrators) dbUtils.query("select * from Administrators where id="+id).get(0);
		}
//		System.out.println("remark"+admin.getRemark());
//		response.getWriter().write(JsonUtils.statusResponse(1, "userName="+admin.getUserName()+"&password="+admin.getPassword()+"&permission="+admin.getPermission()
//				+"&scopes="+admin.getScopes()+"&name="+admin.getName()+"&email="+admin.getEmail()+"&phoneNumber="+admin.getPhoneNumber()
//				+"&remark="+admin.getRemark()));
		response.getWriter().write(JsonUtils.statusResponse(1,admin));
//		System.out.println(response.getCharacterEncoding().toString());
		return;
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
		System.out.println("readPersonalInfoServlet start");
	}

}
