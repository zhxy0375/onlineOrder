/*
 * Copyright 2002-2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.dxc.onlineOrder.framework.session.webSocket;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dxc.onlineOrder.controller.UserController;
import org.dxc.onlineOrder.model.Usertb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

/**
 * Controller for managing {@link Message} instances.
 *
 * @author Rob Winch
 *
 */
@Controller
@RequestMapping("/")
public class MessageController {
	 private static final Logger logger = LoggerFactory.getLogger(MessageController.class);
	private SimpMessageSendingOperations messagingTemplate;

	@Autowired
	public MessageController( SimpMessageSendingOperations messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@RequestMapping("/")
	public String im() {
		return "index";
	}
	
	@ResponseBody
	@RequestMapping("/send")
	public String send(@RequestParam String dest) {
		logger.info("dest:{}",dest);
		messagingTemplate.convertAndSend(dest,"test1");
		return JSON.toJSONString(new Usertb());
	}

	@MessageMapping("/queue/messages/{uniqueId}")
	public void im(@RequestParam String uniqueId,Usertb userChat) {
		logger.info("msg get uniqueId:"+uniqueId+";"+JSON.toJSONString(userChat)); 
		//messagingTemplate.convertAndSend("/queue/messages",content);
	}
	
	/**
     *
     * @param userChat 关于用户聊天的各个信息
     */
    @MessageMapping("/userChat")
    public void userChat(Usertb userChat,@RequestParam(value="uniqueId") String uniqueId) {
    	String json = JSON.toJSONString(userChat);
    	logger.info(uniqueId+"##########:"+json);
        //找到需要发送的地址
       // String dest = "/userChat/chat" + userChat.getCoordinationId();
//        try {
//            userChat.setName(URLDecoder.decode(userChat.getName(), "utf-8"));
//            userChat.setChatContent(URLDecoder.decode(userChat.getChatContent(), "utf-8"));
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
        
        messagingTemplate.convertAndSend("/topic/messages",json);
        Map<String,Object> result = new HashMap<>();
        result.put("oppositeSide", "zhxy");
        result.put("alias", "stefan");
        
        // messagingTemplate.convertAndSend("/queue/messages/"+uniqueId,JSON.toJSONString(result));
        messagingTemplate.convertAndSend("/queue/messages/"+userChat.getUcreatetime().getTime(),JSON.toJSONString(result));
        
    }

	@SubscribeMapping("/users")
	public List<Usertb> subscribeMessages() throws Exception {
		messagingTemplate.convertAndSend("/topic/messages","{Subscrib:"+System.currentTimeMillis()+"}");
		List<Usertb> lst = new ArrayList<>();
		for(int i = 0;i<5;i++){
			Usertb us = new Usertb();
			us.setAge(20+i);
			us.setId(i);
			us.setUname("name"+i);
			us.setUcreatetime(new Date());
			lst.add(us);
		}
		return lst;
	}
}
