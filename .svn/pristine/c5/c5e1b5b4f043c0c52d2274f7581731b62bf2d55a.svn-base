package com.song.DBUtils;

import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonUtils {
public  static <T> String statusResponse (int statusCode, T parameter){
		
		HashMap<String, Object> statusResponse = new HashMap<String, Object>();
		statusResponse.put("statuscode", statusCode);
		statusResponse.put("parameter", parameter);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		System.out.println(gson.toJson(statusResponse));
		return gson.toJson(statusResponse);
		
	}
}
