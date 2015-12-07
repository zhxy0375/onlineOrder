package org.dxc.onlineOrder.framework.session.webSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.session.ExpiringSession;
import org.springframework.session.web.socket.config.annotation.AbstractSessionWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig
          extends AbstractSessionWebSocketMessageBrokerConfigurer<ExpiringSession> { 

        protected void configureStompEndpoints(StompEndpointRegistry registry) { 
               // registry.addEndpoint("/messages").withSockJS();
                registry.addEndpoint("/messages");
        }

        public void configureMessageBroker(MessageBrokerRegistry registry) {
                registry.enableSimpleBroker("/queue/", "/topic/");
                registry.setApplicationDestinationPrefixes("/app");
        }
}