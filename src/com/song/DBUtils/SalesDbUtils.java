package com.song.DBUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.song.DBModule.Sales;
import com.song.factory.DBFactory;

public class SalesDbUtils implements MyDBUtils<Sales> {
	private static final String TABLE_NAME = "sales";
	private Connection conn = null;
	private PreparedStatement pre = null;
	private Sales sales = new Sales();
	@Override
	public Sales select(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean add(Sales sales) {
		// TODO Auto-generated method stub
		try {
			String sql = "insert into "+TABLE_NAME+"(id,region,pName,time,num)"+" values(?,?,?,?,?)";
		    conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setInt(1, sales.getId());
			pre.setString(2, sales.getRegion());
			pre.setString(3, sales.getpName());
			pre.setString(4, sales.getTime());
			pre.setInt(5, sales.getNum());
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
	public Boolean update(Sales sales) {
		// TODO Auto-generated method stub
		try {
			//String sql="update "+TABLE_NAME+" set userName=?,password=?... where id = ?";
			String sql = "update "+TABLE_NAME+" set region=?,pName=?,time=?,num=? where id="+sales.getId();
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setString(1, sales.getRegion());
			pre.setString(2, sales.getpName());
			pre.setString(3, sales.getTime());
			pre.setInt(4, sales.getNum());
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
		// TODO Auto-generated method stub
		try {
			String sql = "delete from "+TABLE_NAME+" where id = ?";
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			pre.setInt(1,Integer.parseInt((String) id));
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
	public List<Sales> query(String sql) {
		// TODO Auto-generated method stub
		try {
			System.out.println(sql);
			conn = DBFactory.getConnection();
			pre = (PreparedStatement) conn.prepareStatement(sql);
			List<Sales> list = new ArrayList<Sales>();
			ResultSet resultSet = pre.executeQuery();
			
			while(resultSet.next()){
				Sales sales = new Sales();
				sales.setId(resultSet.getInt(1));
				sales.setRegion(resultSet.getString(2));
				sales.setpName(resultSet.getString(3));
				sales.setTime(resultSet.getString(4));
				sales.setNum(resultSet.getInt(5));
				list.add(sales);
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
