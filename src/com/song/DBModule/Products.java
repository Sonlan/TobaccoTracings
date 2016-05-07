package com.song.DBModule;
/**
 * 
 * @author songsong
 * 
 */
public class Products {
	private String id;  //产品号
	private String caseID;  //盒号
	private String pd;  //生产日期product date
	private String  gp;  //有效期guarantee period
	private String manufacturer;  //生产厂家
	private String pl;  //生产线production line
	private String pName; //产品名称
	private String  ranges;  //产品档次划分
	private String material;  //生产原料
	private String pb;  //生产批号 production batch
	private String pa; //产地 production address
	private float price; //零售价格
	private String targetAddr;//目的销售地点
	private String state;  //产品状态
	private String logisticsId;//物流信息编号
	private String remark;  //备注
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
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCaseID() {
		return caseID;
	}
	public String getPd() {
		return pd;
	}
	public void setPd(String pd) {
		this.pd = pd;
	}
	public void setCaseID(String caseID) {
		this.caseID = caseID;
	}

	public String getGp() {
		return gp;
	}
	public void setGp(String gp) {
		this.gp = gp;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getPl() {
		return pl;
	}
	public void setPl(String pl) {
		this.pl = pl;
	}
	public String getpName() {
		return pName;
	}
	public void setpName(String pName) {
		this.pName = pName;
	}
	public String getRanges() {
		return ranges;
	}
	public void setRanges(String range) {
		this.ranges = range;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public String getPb() {
		return pb;
	}
	public void setPb(String pb) {
		this.pb = pb;
	}
	public String getPa() {
		return pa;
	}
	public void setPa(String pa) {
		this.pa = pa;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getTargetAddr() {
		return targetAddr;
	}
	public void setTargetAddr(String targetAddr) {
		this.targetAddr = targetAddr;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getLogisticsId() {
		return logisticsId;
	}
	public void setLogisticsId(String logisticsId) {
		this.logisticsId = logisticsId;
	}
	
}
