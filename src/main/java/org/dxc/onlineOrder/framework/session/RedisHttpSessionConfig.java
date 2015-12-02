package org.dxc.onlineOrder.framework.session;

import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
//
//@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 7200)
//public class RedisHttpSessionConfig {
//
//    @Bean
//    public RedisConnectionFactory connectionFactory() {
//        JedisConnectionFactory connectionFactory = new JedisConnectionFactory();
//        connectionFactory.setPort(6379);
//        connectionFactory.setHostName("127.0.0.1");
//        return connectionFactory;
//    }
//}