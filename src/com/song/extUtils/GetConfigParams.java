package com.song.extUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.song.DBUtils.JsonUtils;
import com.sun.security.ntlm.Client;

/**
 * Servlet implementation class GetConfigParams
 */
public class GetConfigParams extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetConfigParams() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");
		request.setCharacterEncoding("utf-8");
		
		Properties prop=new Properties();         
		prop.load(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("select.properties"), "UTF-8"));  
		String proTypes = prop.getProperty("proTypes");
		String regions = prop.getProperty("regions");
/*		String[] list = proTypes.split(",");*/
		String cmd = request.getParameter("cmd");
		if(null!=cmd){
			if("proType".equals(cmd)){
				response.getWriter().write(JsonUtils.statusResponse(1, proTypes+"&"+regions));
			}
		}else response.getWriter().write(JsonUtils.statusResponse(0, "ERROR"));
	}

}
