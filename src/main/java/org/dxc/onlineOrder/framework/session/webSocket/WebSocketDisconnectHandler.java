/*
 * Copyright 2002-2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.dxc.onlineOrder.framework.session.webSocket;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


public class WebSocketDisconnectHandler<S> implements ApplicationListener<SessionDisconnectEvent> {
	private static final Logger logger = LoggerFactory.getLogger(WebSocketDisconnectHandler.class);
	
	private SimpMessageSendingOperations messagingTemplate;

	public WebSocketDisconnectHandler(SimpMessageSendingOperations messagingTemplate) {
		super();
		this.messagingTemplate = messagingTemplate;
	}

	public void onApplicationEvent(SessionDisconnectEvent event) {
		String id = event.getSessionId();
		if(id == null) {
			return;
		}
		logger.info("Disconnect: sessionId:{}",id);
		messagingTemplate.convertAndSend("/topic/friends/signout",id);

	}
}