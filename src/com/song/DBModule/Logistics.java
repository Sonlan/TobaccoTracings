package com.song.DBModule;

public class Logistics {
	private int id;  //条目编号
	private String logisticsID;  //物流信息编号
	private String address;  //地点
	private String time;  //时间
	private String state; //状态
	private String remark;  //备注
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLogisticsID() {
		return logisticsID;
	}
	public void setLogisticsID(String logisticsID) {
		this.logisticsID = logisticsID;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
