package org.dxc.onlineOrder.framework.properties;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.util.Log4jConfigurer;

import java.io.IOException;
import java.util.Properties;

/**
 * 应用的配置文件
 * User: kqy
 * Date: 11-5-23 下午2:58
 */
public class AppPropertyConfigurer extends PropertyPlaceholderConfigurer {
    private static final Log log = LogFactory.getLog(AppPropertyConfigurer.class);

    @Override
    protected Properties mergeProperties() throws IOException  {

    	
//        //加载spring log4j.properties
       // Log4jConfigurer.initLogging(ResourceMap.getLog4jFile());
        
        Properties superProps = super.mergeProperties();
        
        //加载log4j.properties
        PropertyConfigurator.configure(ResourceMap.getLog4jFile());
        
        superProps.putAll(ResourceMap.getAllMap());
        superProps.put("env", ResourceMap.getEnv());
        
        log.error(">>>>> env:" + superProps.getProperty("env"));
        return superProps;
    }
}
