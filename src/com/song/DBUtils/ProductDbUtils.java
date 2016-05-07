package com.song.DBUtils;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.song.DBModule.Products;
import com.song.factory.DBFactory;

public class ProductDbUtils implements MyDBUtils<Products> {
	private static final String TABLE_NAME = "products";
	private Connection conn = null;
	private PreparedStatement pre = null;
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
			pre = (PreparedStatement) conn.prepareStatement("update "+TABLE_NAME+" set logisticsId='"+lid+"'where id='"+id+"'");
			pre.executeUpdate();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		
	}
	@Override
	public Products select(String id) {
		try {
//			System.out.println(t.getClass().toString().equals("class com.song.DBModule.Administrators")); 
			String sql = "select * from "+TABLE_NAME+" where id='"+id+"'";
			System.out.println(sql);
			conn = DBFactory.getConnection();
				pre = (PreparedStatement) conn.prepareStatement(sql);
				ResultSet resultSet = pre.executeQuery();
				if(resultSet.next()){
					Products pro = new Products();  //此处新建一个对象，默认Float变了price为0，始终不为空
					pro.setId(resultSet.getString(1));
					pro.setCaseID(resultSet.getString(2));
				    pro.setPd(resultSet.getString(3));
					pro.setGp(resultSet.getString(4));
					pro.setManufacturer(resultSet.getString(5));
					pro.setPl(resultSet.getString(6));
					pro.setpName(resultSet.getString(7));
					pro.setRanges(resultSet.getString(8));
					pro.setMaterial(resultSet.getString(9));
					pro.setPb(resultSet.getString(10));
				    pro.setPa(resultSet.getString(11));
					pro.setPrice(resultSet.getFloat(12));
					pro.setTargetAddr(resultSet.getString(13));
					pro.setState(resultSet.getString(14));
					pro.setLogisticsId(resultSet.getString(15));
					pro.setRemark(resultSet.getString(16));
					pro.setConsumeAddr(resultSet.getString(17));
					pro.setConsumeTime(resultSet.getString(18));
					return pro;
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
	public Boolean add(Products pro) {
		try {
			String sql = "insert into "+TABLE_NAME+"(id,caseID,pd,gp,manufacturer,pl,pName,range,material,pb,pa,price,targetAddr,state,logisticsId, remark,consumeAddr,comsumeTime)"+" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		    conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, pro.getId());
			pre.setString(2, pro.getCaseID());
			pre.setString(3, pro.getPd());
			pre.setString(4, pro.getGp());
			pre.setString(5, pro.getManufacturer());
			pre.setString(6, pro.getPl());
			pre.setString(7, pro.getpName());
			pre.setString(8, pro.getRanges());
			pre.setString(9, pro.getMaterial());
			pre.setString(10, pro.getPb());
			pre.setString(11, pro.getPa());
			pre.setFloat(12, pro.getPrice());
			pre.setString(13, pro.getTargetAddr());
			pre.setString(14, pro.getState());
			pre.setString(15, pro.getLogisticsId());
			pre.setString(16, pro.getRemark());
			pre.setString(17, pro.getConsumeAddr());
			pre.setString(18, pro.getConsumeTime());
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
	public Boolean update(Products pro) {
		try {
			//String sql="update "+TABLE_NAME+" set userName=?,password=?... where id = ?";
			String sql = "update "+TABLE_NAME+" set caseID=?,pd=?,gp=?,manufacturer=?,pl=?,pName=?,ranges=?,material=?,pb=?,pa=?,price=?,targetAddr=?,state=?,logisticsId=?, remark=?, consumeAddr=?, consumeTime=? where id='"+pro.getId()+"'";
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, pro.getCaseID());
			pre.setString(2, pro.getPd());
			pre.setString(3, pro.getGp());
			pre.setString(4, pro.getManufacturer());
			pre.setString(5, pro.getPl());
			pre.setString(6, pro.getpName());
			pre.setString(7, pro.getRanges());
			pre.setString(8, pro.getMaterial());
			pre.setString(9, pro.getPb());
			pre.setString(10, pro.getPa());
			pre.setFloat(11, pro.getPrice());
			pre.setString(12, pro.getTargetAddr());
			pre.setString(13, pro.getState());
			pre.setString(14, pro.getLogisticsId());
			pre.setString(15, pro.getRemark());
			pre.setString(16, pro.getConsumeAddr());
			pre.setString(17, pro.getConsumeTime());
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
			String sql = "delete from "+TABLE_NAME+" where id = ?";
			conn = DBFactory.getConnection();
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
	public List<Products> query(String sql) {
		try {
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			List<Products> list = new ArrayList<Products>();
			ResultSet resultSet = pre.executeQuery();
			
			while(resultSet.next()){
				Products pro = new Products();
				pro.setId(resultSet.getString(1));
				pro.setCaseID(resultSet.getString(2));
			    pro.setPd(resultSet.getString(3));
				pro.setGp(resultSet.getString(4));
				pro.setManufacturer(resultSet.getString(5));
				pro.setPl(resultSet.getString(6));
				pro.setpName(resultSet.getString(7));
				pro.setRanges(resultSet.getString(8));
				pro.setMaterial(resultSet.getString(9));
				pro.setPb(resultSet.getString(10));
			    pro.setPa(resultSet.getString(11));
				pro.setPrice(resultSet.getFloat(12));
				pro.setTargetAddr(resultSet.getString(13));
				pro.setState(resultSet.getString(14));
				pro.setLogisticsId(resultSet.getString(15));
				pro.setRemark(resultSet.getString(16));
				pro.setConsumeAddr(resultSet.getString(17));
				pro.setConsumeTime(resultSet.getString(18));
				list.add(pro);
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
