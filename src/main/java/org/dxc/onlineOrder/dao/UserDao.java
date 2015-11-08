package org.dxc.onlineOrder.dao;

import java.util.List;

import org.dxc.onlineOrder.model.Usertb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao extends BaseDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDao.class);


    public Usertb getRandomOne (){
    	return sqlSession.selectOne("UsertbMapper.selectOne");
    }
    
    public List<Usertb> queryList (){
    	return sqlSession.selectList("UsertbMapper.queryList");
    }
    
    public void updateAge (){
    	 sqlSession.update("UsertbMapper.updateAge");
    }
        
}
