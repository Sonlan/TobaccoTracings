package com.song.DBUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.song.DBModule.Logistics;
import com.song.factory.DBFactory;

public class LogisticsDbUtils implements MyDBUtils<Logistics> {
	private static final String TABLE_NAME = "logistics";
	private Connection conn = null;
	private PreparedStatement pre = null;
	private Logistics logistics = new Logistics();
	@Override
	public Logistics select(String id) {
		try {
//			System.out.println(t.getClass().toString().equals("class com.song.DBModule.Administrators")); 
			String sql = "select * from "+TABLE_NAME+" where id = '"+id+"'";
			System.out.println(sql);
			conn = DBFactory.getConnection();
				pre = (PreparedStatement) conn.prepareStatement(sql);
				ResultSet resultSet = pre.executeQuery();
				if(resultSet.next()){
					logistics.setId(resultSet.getInt(1));
					logistics.setLogisticsID(resultSet.getString(2));
					logistics.setAddress(resultSet.getString(3));
					logistics.setTime(resultSet.getString(4));
					logistics.setState(resultSet.getString(5));
					logistics.setRemark(resultSet.getString(6));
				}	
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
		return logistics;
	}

	@Override
	public Boolean add(Logistics logistics) {
		try {
			String sql = "insert into "+TABLE_NAME+"(id,logisticsID,address,time,state,remark)"+" values(?,?,?,?,?,?)";
		    conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setInt(1, logistics.getId());
			pre.setString(2, logistics.getLogisticsID());
			pre.setString(3, logistics.getAddress());
			pre.setString(4,logistics.getTime());
			pre.setString(5, logistics.getState());
			pre.setString(6, logistics.getRemark());
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
	public Boolean update(Logistics Logistics) {
		try {
			//String sql="update "+TABLE_NAME+" set userName=?,password=?... where id = ?";
			String sql = "update "+TABLE_NAME+" set logisticsID=?,address=?,time=?,state=?,remark=? where id="+Logistics.getId();
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, Logistics.getLogisticsID());
			pre.setString(2,Logistics.getAddress());
			pre.setString(3, Logistics.getTime());
			pre.setString(4, Logistics.getState());
			pre.setString(5, Logistics.getRemark());
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
			pre.setInt(1,  (Integer) id);
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
	public List<Logistics> query(String sql) {
		try {
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			List<Logistics> list = new ArrayList<Logistics>();
			ResultSet resultSet = pre.executeQuery();
			
			while(resultSet.next()){
				Logistics logistics = new Logistics();
				logistics.setId(resultSet.getInt(1));
				logistics.setLogisticsID(resultSet.getString(2));
				logistics.setAddress(resultSet.getString(3));
				logistics.setTime(resultSet.getString(4));
				logistics.setState(resultSet.getString(5));
				logistics.setRemark(resultSet.getString(6));
				list.add(logistics);
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

	@Override
	public boolean updateLogisticsId(String id, String lid) {
		// TODO Auto-generated method stub
		return false;
	}

	

}