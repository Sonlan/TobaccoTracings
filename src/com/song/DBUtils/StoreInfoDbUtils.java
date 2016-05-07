package com.song.DBUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.song.DBModule.StoreInfo;
import com.song.DBModule.StoreInfo;
import com.song.factory.DBFactory;

public class StoreInfoDbUtils implements MyDBUtils<StoreInfo> {
	private static final String TABLE_NAME = "StoreInfo";
	private Connection conn = null;
	private PreparedStatement pre = null;
	private StoreInfo stores = new StoreInfo();
	@Override
	public StoreInfo select(String warehouseID) {  
		try {
//			System.out.println(t.getClass().toString().equals("class com.song.DBModule.Administrators")); 
			String sql = "select * from "+TABLE_NAME+" where warehouseID = '"+warehouseID+"'";
			System.out.println(sql);
			conn = DBFactory.getConnection();
				pre = (PreparedStatement) conn.prepareStatement(sql);
				ResultSet resultSet = pre.executeQuery();
				if(resultSet.next()){
					stores.setStoreID(resultSet.getString(1));
					stores.setWarehouseID(resultSet.getString(2));
					stores.setInDate(resultSet.getString(3));
					stores.setOutDate(resultSet.getString(4));
					stores.setPb(resultSet.getString(5));
					stores.setLocation(resultSet.getString(6));
					stores.setState(resultSet.getString(7));
					stores.setRemark(resultSet.getString(8));
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
		return stores;
	}

	@Override
	public Boolean add(StoreInfo stores) {
		try {
			String sql = "insert into "+TABLE_NAME+"(storeID,warehouseID,inDate,outDate,pb,location,state,remark)"+" values(?,?,?,?,?,?,?,?)";
		    conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, stores.getStoreID());
			pre.setString(2, stores.getWarehouseID());
			pre.setString(3, stores.getInDate());
			pre.setString(4, stores.getOutDate());
			pre.setString(5, stores.getPb());
			pre.setString(6, stores.getLocation());
			pre.setString(7, stores.getState());
			pre.setString(8, stores.getRemark());
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
	public Boolean update(StoreInfo stores) {
		try {
			//String sql="update "+TABLE_NAME+" set userName=?,password=?... where id = ?";
			String sql = "update "+TABLE_NAME+" set storeID=?,inDate=?,outDate=?,pb=?,location=?,state=?, remark=? where warehouseID='"+stores.getWarehouseID()+"'";
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, stores.getStoreID());
			pre.setString(2, stores.getInDate());
			pre.setString(3, stores.getOutDate());
			pre.setString(4, stores.getPb());
			pre.setString(5, stores.getLocation());
			pre.setString(6, stores.getState());
			pre.setString(7, stores.getRemark());
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
			String sql = "delete from "+TABLE_NAME+" where warehouseID = ?";
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
	public List<StoreInfo> query(String sql) {
		try {
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			List<StoreInfo> list = new ArrayList<StoreInfo>();
			ResultSet resultSet = pre.executeQuery();
			
			while(resultSet.next()){
				StoreInfo stores = new StoreInfo();
				stores.setStoreID(resultSet.getString(1));
				stores.setWarehouseID(resultSet.getString(2));
				stores.setInDate(resultSet.getString(3));
				stores.setOutDate(resultSet.getString(4));
				stores.setPb(resultSet.getString(5));
				stores.setLocation(resultSet.getString(6));
				stores.setState(resultSet.getString(7));
				stores.setRemark(resultSet.getString(8));
				list.add(stores);
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

