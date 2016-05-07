package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBModule.Logistics;
import com.song.DBModule.StoreInfo;
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;

public class UpdateStoreInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public UpdateStoreInfoServlet() {
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

			String	inDate = request.getParameter("inDate");
			String	outDate = request.getParameter("outDate");

			
			StoreInfo stores = new StoreInfo();
			stores.setStoreID(request.getParameter("storeID"));
			stores.setWarehouseID(request.getParameter("warehouseID"));
			stores.setInDate(inDate);
			stores.setOutDate(outDate);
			stores.setPb(request.getParameter("pb"));
			stores.setState(request.getParameter("state"));
			stores.setLocation(request.getParameter("location"));
			stores.setRemark(request.getParameter("remark"));
				
			MyDBUtils<StoreInfo> dbUtils = DBFactory.getDBFactory(4);
			if(addNew!=null){
				if(!Boolean.parseBoolean(addNew)){//update
					if(dbUtils.update(stores)){
						response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
					}else{
						response.getWriter().write(JsonUtils.statusResponse(0, "Failed update"));
					}
				}else {//add
					if(dbUtils.add(stores)){
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
