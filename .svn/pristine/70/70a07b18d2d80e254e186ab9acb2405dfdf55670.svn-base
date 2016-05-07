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
import com.song.DBUtils.JsonUtils;
import com.song.DBUtils.MyDBUtils;
import com.song.factory.DBFactory;
import com.sun.xml.internal.bind.v2.schemagen.xmlschema.List;

import sun.awt.SunHints.Value;

public class LogisticsInfoServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public LogisticsInfoServlet() {
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
		String pid = "";
		try {
			if(id.split("_").length>1)
				pid = id.split("_")[1];  //获取附加信息,产品ID，用于溯源区分物流信息
			else pid = "";
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			pid = "";
		}
		
		id = id.split("_")[0];
		System.out.println("查询物流");
		if(type!=null){
			MyDBUtils<Logistics> dbUtils = DBFactory.getDBFactory(5);
			if(id.equals("")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from Logistics")));
			else if(type.equals("id")) response.getWriter().write(JsonUtils.statusResponse(1, dbUtils.query("select * from Logistics where id="+id)));
			else if(type.equals("lid")){
				if(!pid.equals("")){
					String prefix = pid.substring(0, 1).toUpperCase();
					if(prefix.equals("B")){//Box
						response.getWriter().write(JsonUtils.statusResponse(1,dbUtils.query("select * from Logistics where logisticsID='"+id+"' and remark ='"+pid+"'")));
					}else if(prefix.equals("C")){//Case
						java.util.List<Logistics> list= dbUtils.query("select * from Logistics where logisticsID='"+id+"'");
						for(int i=0;i<list.size();i++){
							if(list.get(i).getRemark().substring(0, 1).equals("P") || (list.get(i).getRemark().substring(0, 1).equals("C") && !list.get(i).getRemark().equals(pid))) {list.remove(i);i--;}
							else{
								if(list.get(i).getState().equals("消费") && list.get(i).getRemark().substring(0, 1).equals("B")){
									list.get(i).setState("拆箱");
								}
							}
						}
						response.getWriter().write(JsonUtils.statusResponse(1,list));
					}
					else if(prefix.equals("P")){//product
						MyDBUtils<Products> dbUtils_P = DBFactory.getDBFactory(1);
						Products pro = dbUtils_P.select(pid);
						java.util.List<Logistics> list= dbUtils.query("select * from Logistics where logisticsID='"+id+"' and (remark='"+pro.getCaseID()+"' or remark= '"+pro.getId()+"')");
						for(int i=0;i<list.size();i++){
							if(list.get(i).getRemark().substring(0, 1).equals("B")){
								if(list.get(i).getState().equals("消费")){
									list.get(i).setState("拆箱");
								}
							}else if(list.get(i).getRemark().substring(0, 1).equals("C")){
								if(list.get(i).getState().equals("消费")){
									list.get(i).setState("拆盒");
								}
							}
						}
						response.getWriter().write(JsonUtils.statusResponse(1,list));
					}
				}
				else	response.getWriter().write(JsonUtils.statusResponse(1,dbUtils.query("select * from Logistics where logisticsID='"+id+"'")));
			}
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
