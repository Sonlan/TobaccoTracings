package com.song.DBUtils;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.song.DBModule.Cases;
import com.song.factory.DBFactory;

public class CasesDbUtils implements MyDBUtils<Cases> {
	private static final String TABLE_NAME = "Cases";
	private static ComboPooledDataSource ds = null;
	private Connection conn = null;
	private PreparedStatement pre = null;
	private Cases cases = new Cases();
	static{
		try {
			//连接池初始化
			ds=new ComboPooledDataSource("song");  //传入参数为c3p0配置文件中configname
		} catch (Exception e) {
			System.out.println("ERROR");
			throw new ExceptionInInitializerError(e);
		}
	}
	
	public static Connection getConnection() throws Exception{
		//从连接池获取连接
		return (Connection) ds.getConnection();
	}
	/**
	 * 更新物流ID
	 * @param id 产品ID
	 * @param lid 物流ID
	 * @return
	 */
	@Override
	public boolean updateLogisticsId(String id, String lid){
		try {
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement("update "+TABLE_NAME+" set logisticsId='"+lid+"'where caseID='"+id+"'");
			pre.executeUpdate();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		
	}
	@Override
	public Cases select(String caseID) {
		try {
//			System.out.println(t.getClass().toString().equals("class com.song.DBModule.Administrators")); 
			String sql = "select * from "+TABLE_NAME+" where caseID = '"+caseID+"'";
			System.out.println(sql);
			conn = CasesDbUtils.getConnection();
				pre = (PreparedStatement) conn.prepareStatement(sql);
				ResultSet resultSet = pre.executeQuery();
				if(resultSet.next()){
					cases.setCaseID(resultSet.getString(1));
					cases.setBoxID(resultSet.getString(2));
					cases.setLogisticsId(resultSet.getString(3));
					cases.setPd(resultSet.getString(4));
					cases.setGp(resultSet.getString(5));
					cases.setManufacturer(resultSet.getString(6));
					cases.setPb(resultSet.getString(7));
					cases.setpName(resultSet.getString(8));
					cases.setAmount(resultSet.getInt(9));
					cases.setPrice(resultSet.getFloat(10));
					cases.setState(resultSet.getString(11));
					cases.setTargetAddr(resultSet.getString(12));
					cases.setRemark(resultSet.getString(13));
					cases.setConsumeAddr(resultSet.getString(14));
					cases.setConsumeTime(resultSet.getString(15));
					return cases;
				}	
				return null;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}finally{
			try {
				conn.close();
				pre.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return null;
			}	
		}
	}

	@Override
	public Boolean add(Cases pro) {
		try {
			String sql = "insert into "+TABLE_NAME+"(caseID,boxID,logisticsId,pd,gp,manufacturer,pb,pName, amount, price,state,targetAddr,remark,consumeAddr,comsumeTime)"+" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		    conn = CasesDbUtils.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, pro.getCaseID());
			pre.setString(2, pro.getBoxID());
			pre.setString(3, pro.getLogisticsId());
			pre.setString(4, pro.getPd());
			pre.setString(5, pro.getGp());
			pre.setString(6, pro.getManufacturer());
			pre.setString(7, pro.getPb());
			pre.setString(8, pro.getpName());
			pre.setInt(9, pro.getAmount());
			pre.setFloat(10, pro.getPrice());
			pre.setString(11, pro.getState());
			pre.setString(12, pro.getTargetAddr());
			pre.setString(13, pro.getRemark());
			pre.setString(14, pro.getConsumeAddr());
			pre.setString(15, pro.getConsumeTime());
			pre.execute();			
		} catch (Exception e) {
			return false;
		}finally{
			try {
				conn.close();
				pre.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return false;
			}	
		}
		return true;
	}

	@Override
	public Boolean update(Cases Cases) {
		try {
			//String sql="update "+TABLE_NAME+" set userName=?,password=?... where id = ?";
			String sql = "update "+TABLE_NAME+" set boxID=?,logisticsId=?,pd=?,gp=?,manufacturer=?,pb=?,pName=?, amount=?, price=?,state=?,targetAddr=?,remark=?, consumeAddr=?, consumeTime=? where caseID='"+Cases.getCaseID()+"'";
			System.out.println(sql);
			conn = CasesDbUtils.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, Cases.getBoxID());
			pre.setString(2, Cases.getLogisticsId());
			pre.setString(3, Cases.getPd());
			pre.setString(4, Cases.getGp());
			pre.setString(5, Cases.getManufacturer());
			pre.setString(6, Cases.getPb());
			pre.setString(7, Cases.getpName());
			pre.setInt(8, Cases.getAmount());
			pre.setFloat(9, Cases.getPrice());
			pre.setString(10, Cases.getState());
			pre.setString(11, Cases.getTargetAddr());
			pre.setString(12, Cases.getRemark());
			pre.setString(13, Cases.getConsumeAddr());
			pre.setString(14, Cases.getConsumeTime());
			pre.execute();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}finally{
			try {
				conn.close();
				pre.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}	
		}
		return true;
	}
	@Override
	public <E> Boolean delete(E id) {
		try {
			String sql = "delete from "+TABLE_NAME+" where caseID = ?";
			conn = CasesDbUtils.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, (String) id);
			pre.execute();
		} catch (Exception e) {
			return false;
		}finally{
			try {
				conn.close();
				pre.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return false;
			}	
		}
		return true;
	}

	@Override
	public List<Cases> query(String sql) {
		try {
			System.out.println(sql);
			conn = CasesDbUtils.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			List<Cases> list = new ArrayList<Cases>();
			ResultSet resultSet = pre.executeQuery();
			
			while(resultSet.next()){
				Cases cases = new Cases();
				cases.setCaseID(resultSet.getString(1));
				cases.setBoxID(resultSet.getString(2));
				cases.setLogisticsId(resultSet.getString(3));
				cases.setPd(resultSet.getString(4));
				cases.setGp(resultSet.getString(5));
				cases.setManufacturer(resultSet.getString(6));
				cases.setPb(resultSet.getString(7));
				cases.setpName(resultSet.getString(8));
				cases.setAmount(resultSet.getInt(9));
				cases.setPrice(resultSet.getFloat(10));
				cases.setState(resultSet.getString(11));
				cases.setTargetAddr(resultSet.getString(12));
				cases.setRemark(resultSet.getString(13));
				cases.setConsumeAddr(resultSet.getString(14));
				cases.setConsumeTime(resultSet.getString(15));
				list.add(cases);
			}
			return list;
		} catch (Exception e) {
			return null;
		}finally{
			try {
				conn.close();
				pre.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return null;
			}	
		}
		
	}

	

}