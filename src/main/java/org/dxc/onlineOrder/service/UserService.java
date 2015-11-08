package org.dxc.onlineOrder.service;

import java.util.List;

import org.dxc.onlineOrder.dao.UserDao;
import org.dxc.onlineOrder.model.Usertb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService  {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserDao userDao ;
    
    
    public Usertb getRandomOne (){
    	return userDao.getRandomOne();
    }
    
    public List<Usertb> queryList (){
    	return userDao.queryList();
    }
    
    public void updateAge (){
    	userDao.updateAge();
    }
}
