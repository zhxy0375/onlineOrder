package org.dxc.onlineOrder.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;

public class BaseDao {

	@Resource(name="sqlSession")
    protected SqlSession sqlSession;

}
