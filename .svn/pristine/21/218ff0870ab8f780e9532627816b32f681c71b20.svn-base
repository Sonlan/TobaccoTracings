package com.song.service.superservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.interfaces.PBEKey;
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

public class UpdateProductInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public UpdateProductInfoServlet() {
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
		String type = request.getParameter("type");
		String addNew = request.getParameter("addNew");//区分update和add函数
		String pd = request.getParameter("pd");

		if(type.equals("productID")){
			Products pro = new Products();
			pro.setCaseID(request.getParameter("caseID"));
			pro.setGp(request.getParameter("gp"));
			pro.setId(request.getParameter("id"));
			pro.setLogisticsId(request.getParameter("logisticsId"));
			pro.setManufacturer(request.getParameter("manufacturer"));
			pro.setMaterial(request.getParameter("material"));
			pro.setPa(request.getParameter("pa"));
			pro.setPb(request.getParameter("pb"));
			pro.setPd(pd);
			pro.setPl(request.getParameter("pl"));
			pro.setpName(request.getParameter("pName"));
			pro.setPrice(Float.parseFloat(request.getParameter("price")));
			pro.setRanges(request.getParameter("range"));
			pro.setRemark(request.getParameter("remark"));
			pro.setState(request.getParameter("state"));
			pro.setTargetAddr(request.getParameter("targetAddr"));
			pro.setConsumeAddr(request.getParameter("consumeAddr"));
			pro.setConsumeTime(request.getParameter("consumeTime"));
			
			MyDBUtils<Products> dbUtils = DBFactory.getDBFactory(1);
			if(!Boolean.parseBoolean(addNew)){//update
				if(dbUtils.update(pro)){
					response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
				}else{
					response.getWriter().write(JsonUtils.statusResponse(0, "Failed update"));
				}
			}else {//add
				if(dbUtils.add(pro)){
					response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
				}else{
					response.getWriter().write(JsonUtils.statusResponse(0, "Failed add"));
				}
			}
		}
		else if(type.equals("boxID")){
			Boxes boxes = new Boxes();
			boxes.setBoxID(request.getParameter("boxID"));
			boxes.setPd(pd);
			boxes.setGp(request.getParameter("gp"));
			boxes.setStoreID(request.getParameter("storeID"));
			boxes.setLogisticsId(request.getParameter("logisticsId"));
			boxes.setManufacturer(request.getParameter("manufacturer"));
			boxes.setPb(request.getParameter("pb"));
			boxes.setRemark(request.getParameter("remark"));
			boxes.setpName(request.getParameter("pName"));
			boxes.setAmount(Integer.parseInt(request.getParameter("amount")));
			boxes.setPrice(Float.parseFloat(request.getParameter("price")));
			boxes.setState(request.getParameter("state"));
			boxes.setTargetAddr(request.getParameter("targetAddr"));
			boxes.setConsumeAddr(request.getParameter("consumeAddr"));
			boxes.setConsumeTime(request.getParameter("consumeTime"));
			
			MyDBUtils<Boxes> dbUtils = DBFactory.getDBFactory(3);
			if(!Boolean.parseBoolean(addNew)){//update
				if(dbUtils.update(boxes)){
					response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
				}else{
					response.getWriter().write(JsonUtils.statusResponse(0, "Failed update"));
				}
			}else {//add
				if(dbUtils.add(boxes)){
					response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
				}else{
					response.getWriter().write(JsonUtils.statusResponse(0, "Failed add"));
				}
			}
		}
		else if(type.equals("caseID")){
			Cases cases = new Cases();
			cases.setCaseID(request.getParameter("caseID"));
			cases.setPd(pd);
			cases.setGp(request.getParameter("gp"));
			cases.setBoxID(request.getParameter("boxID"));
			cases.setLogisticsId(request.getParameter("logisticsId"));
			cases.setManufacturer(request.getParameter("manufacturer"));
			cases.setPb(request.getParameter("pb"));
			cases.setRemark(request.getParameter("remark"));
			cases.setpName(request.getParameter("pName"));
			cases.setAmount(Integer.parseInt(request.getParameter("amount")));
			cases.setPrice(Float.parseFloat(request.getParameter("price")));
			cases.setState(request.getParameter("state"));
			cases.setTargetAddr(request.getParameter("targetAddr"));
			cases.setConsumeAddr(request.getParameter("consumeAddr"));
			cases.setConsumeTime(request.getParameter("consumeTime"));
			
			MyDBUtils<Cases> dbUtils = DBFactory.getDBFactory(2);
			if(!Boolean.parseBoolean(addNew)){//update
				if(dbUtils.update(cases)){
					response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
				}else{
					response.getWriter().write(JsonUtils.statusResponse(0, "Failed update"));
				}
			}else {//add
				if(dbUtils.add(cases)){
					response.getWriter().write(JsonUtils.statusResponse(1, "OK"));
				}else{
					response.getWriter().write(JsonUtils.statusResponse(0, "Failed add"));
				}
			}
		}
		else response.getWriter().write(JsonUtils.statusResponse(0, "Failed"));
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
