package org.dxc.onlineOrder.controller;

import java.util.List;

import org.dxc.onlineOrder.model.Usertb;
import org.dxc.onlineOrder.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user/info")
public class UserController  {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService ;
    
    @ResponseBody
    @RequestMapping("/{id}")
    public Usertb getRandomOne (@PathVariable String id){
    	LOGGER.info("id:{}",id);
    	Usertb us =  userService.getRandomOne();
    	return us;
    }
    
    @ResponseBody
    @RequestMapping("/list")
    public List<Usertb> queryList (){
    	LOGGER.info("method:{}","queryList");
    	List<Usertb> list = userService.queryList();
    	LOGGER.info("FINISHED");
    	return list;
    }
    
    @ResponseBody
    @RequestMapping("/updtAge")
    public void updateAge (){
    	LOGGER.info("method:{}","updtAge");
    	userService.updateAge();
    }
}