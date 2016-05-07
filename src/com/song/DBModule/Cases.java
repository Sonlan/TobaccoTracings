package com.song.DBModule;

/*
 * 盒体数据模型
 * */
public class Cases {
	private String caseID;  //盒体编号
	private String boxID;  //所属箱体编号
	private String logisticsId;//物流信息编号
	private String pd;  //生产日期product date
	private String  gp;  //有效期guarantee period
	private String manufacturer;  //生产厂家
	private String pb;  //生产批号 production batch
	private String pName; //品名
	private int amount;  //数量（case）
	private float price;  //零售价（￥）
	private String state;  //消费状态
	private String targetAddr;//目的销售地点
	private String consumeAddr; //消费地点
	private String consumeTime;//消费地点
	
	public String getConsumeAddr() {
		return consumeAddr;
	}
	public void setConsumeAddr(String consumeAddr) {
		this.consumeAddr = consumeAddr;
	}
	public String getConsumeTime() {
		return consumeTime;
	}
	public void setConsumeTime(String consumeTime) {
		this.consumeTime = consumeTime;
	}
	public String getTargetAddr() {
		return targetAddr;
	}
	public void setTargetAddr(String targetAddr) {
		this.targetAddr = targetAddr;
	}
	private String remark;// 备注
	public String getpName() {
		return pName;
	}
	public void setpName(String pName) {
		this.pName = pName;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
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
	public String getGp() {
		return gp;
	}
	public void setGp(String gp) {
		this.gp = gp;
	}
	public String getCaseID() {
		return caseID;
	}
	public void setCaseID(String caseID) {
		this.caseID = caseID;
	}
	public String getBoxID() {
		return boxID;
	}
	public void setBoxID(String boxID) {
		this.boxID = boxID;
	}
	public String getLogisticsId() {
		return logisticsId;
	}
	public void setLogisticsId(String logisticsId) {
		this.logisticsId = logisticsId;
	}

	public String getPd() {
		return pd;
	}
	public void setPd(String pd) {
		this.pd = pd;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getPb() {
		return pb;
	}
	public void setPb(String pb) {
		this.pb = pb;
	}
	
}
