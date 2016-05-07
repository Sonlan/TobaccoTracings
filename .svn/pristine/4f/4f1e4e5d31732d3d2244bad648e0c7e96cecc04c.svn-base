package com.song.DBUtils;

import java.util.List;

/*
 * 底层数据库操作接口，方法皆声明为范型，便于扩展
 * 提供方法如下：
 * 查找 select
 * 添加 add
 * 更新 update
 * 查找全部元素 queryAll
 * @param T: 数据库模型类
 * @param E: 查找依据
 * */
public interface MyDBUtils<T> {
	public T select(String element);
	public Boolean add(T object);
	public Boolean update(T object);
	public abstract <E> Boolean delete(E id); 
	public List<T> query(String sql);
	public boolean updateLogisticsId(String id, String lid);
}
