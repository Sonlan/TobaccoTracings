package com.song.service.superservice;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.song.DBModule.Logistics;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class UpdateLogisticsInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public UpdateLogisticsInfoServlet() {
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
		try{
			response.setCharacterEncoding("utf-8");
			request.setCharacterEncoding("utf-8");
			String addNew = request.getParameter("addNew");//区分update和add函数
			Logistics logistics = new Logistics();
			logistics.setId(Integer.parseInt(request.getParameter("id")));
			logistics.setAddress(request.getParameter("address"));
			logistics.setLogisticsID(request.getParameter("logisticsID"));
			logistics.setRemark(request.getParameter("remark"));
			logistics.setState(request.getParameter("state"));
			logistics.setTime(request.getParameter("time"));
				
			MyDBUtils<Logistics> dbUtils = DBFactory.getDBFactory(5);
			if(addNew!=null){
				if(!Boolean.parseBoolean(addNew)){//update
					if(dbUtils.update(logistics)){
						response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
					}else{
						response.getWriter().write(JsonUtils.statusResponse(0, "Failed update"));
					}
				}else {//add
					if(dbUtils.add(logistics)){
						response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
					}else{
						response.getWriter().write(JsonUtils.statusResponse(0, "Failed add"));
					}
				}
			}
			else response.getWriter().write(JsonUtils.statusResponse(0, "Failed"));
			return;
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			response.getWriter().write(JsonUtils.statusResponse(0, "Failed"));
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
