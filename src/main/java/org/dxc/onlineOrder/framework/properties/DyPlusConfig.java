package org.dxc.onlineOrder.framework.properties;

import java.util.List;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.lang3.StringUtils;


public class DyPlusConfig {
	
	private String env;
	private String appCode;
	private String rtxServer = "http://rtxmsg.dooioo.com/rtx/sendRtx";
	private String version;
	private String domain;
	private int memExpired = 2592000; //memCache过期时间,秒	
	private int logTime = 2; //checkToken中，超过2秒就记录日志
	
	
	public int getMemExpired() {
		return memExpired;
	}
	public void setMemExpired(int memExpired) {
		this.memExpired = memExpired;
	}
	public int getLogTime() {
		return logTime;
	}
	public void setLogTime(int logTime) {
		this.logTime = logTime;
	}
	public String getEnv() {
		return env;
	}
	public void setEnv(String env) {
		this.env = env;
	}
	
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	/**
	 * 获取应用程序环境 ，主要跟权限相关
	 * @return
	 */
	public String getAppCode() {
		return appCode;
	}
	/**
	 * 设置应用个程序环境 ，主要跟权限相关
	 * @param appCode
	 */
	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}
	/**
	 * 获得RTX服务器地址
	 * @return
	 */
	public String getRtxServer() {
		return rtxServer;
	}
	/**
	 * 设置RTX服务器地址
	 * @param rtxServer
	 */
	public void setRtxServer(String rtxServer) {
		this.rtxServer = rtxServer;
	}
	/**
	 * 获得系统版本号，根据配置文件的 version字段获取
	 * @return String
	 */
	public String getVersion() {
		return version;
	}
	/**
	 * 设置系统版本号
	 * @param version
	 */
	public void setVersion(String version) {
		this.version = version;
	}
	private static DyPlusConfig config;
	public synchronized static DyPlusConfig getInstance(){
		if(config==null){
			config = new DyPlusConfig();
			PropertiesConfiguration prop = new PropertiesConfiguration();
	        prop.setEncoding("utf-8");
	        try {
	            prop.load("global.properties");
	            setEnv(prop);
		        config.setAppCode(prop.getString("appCode", ""));
		        String tempRtxServer = prop.getString("rtxServer");
		        if(!StringUtils.isBlank(tempRtxServer)){
		        	config.setRtxServer(tempRtxServer);
		        }
		        config.setVersion(prop.getString("version"));
	        } catch (ConfigurationException e) {
	        	 config.setEnv(DyPlusConstants.DEVELOPMENT);
	        	 config.setAppCode("");
	        }
	        String env=config.getEnv();
	       if (DyPlusConstants.PRODUCTION.equalsIgnoreCase(env)) {
			  config.setDomain(DyPlusConstants.DOMAIN_COM);
	       }else if (DyPlusConstants.INTEGRATION.equalsIgnoreCase(env)) {
			  config.setDomain(DyPlusConstants.DOMAIN_ORG);
	       }else if (DyPlusConstants.PREVIEW.equalsIgnoreCase(env)) {
	    	   config.setDomain(DyPlusConstants.DOMAIN_ME);
	       }else if (DyPlusConstants.DEVELOPMENT.equalsIgnoreCase(env)) {
	    	   config.setDomain(DyPlusConstants.DOMAIN_NET);
	       }else if (DyPlusConstants.TEST.equalsIgnoreCase(env)) {
	    	   config.setDomain(DyPlusConstants.DOMAIN_NET);
	       }
		}
		return config;
	}
	
	/**
	 * 设置envirement
	 * @param prop 系统配置对象
	 */ 
	private static void setEnv(PropertiesConfiguration prop ){
		String productionIp = prop.getString("production_ip", "");
		String testIp = prop.getString("test_ip", "");
		String developmentIp = prop.getString("development_ip", "");
		String integrationIp=prop.getString("integration_ip","");
		String previewIp=prop.getString("preview_ip","");
		if (StringUtils.isNotBlank(productionIp)
				|| StringUtils.isNotBlank(integrationIp)
				|| StringUtils.isNotBlank(developmentIp)
				|| StringUtils.isNotBlank(testIp)
				|| StringUtils.isNotBlank(previewIp)) {
			List<String> localIps = org.dxc.onlineOrder.util.IPUtil.getLocalIp();
			if (StringUtils.isNotBlank(productionIp)
					&& containsIp(productionIp, localIps)) {
				config.setEnv(DyPlusConstants.PRODUCTION);
			}else if (StringUtils.isNotBlank(integrationIp)
					&& containsIp(integrationIp, localIps)) {
				config.setEnv(DyPlusConstants.INTEGRATION); 
			}else if (StringUtils.isNotBlank(testIp)
					&& containsIp(testIp, localIps)) {
				config.setEnv(DyPlusConstants.TEST);
			} else if (StringUtils.isNotBlank(developmentIp)
					&& containsIp(developmentIp, localIps)) {
				config.setEnv(DyPlusConstants.DEVELOPMENT);
			}else if (StringUtils.isNotBlank(previewIp)
					&& containsIp(previewIp, localIps)) {
				config.setEnv(DyPlusConstants.PREVIEW);
			}
		}
		if (StringUtils.isBlank(config.getEnv())) {
			String env = prop.getString("env", "");
			config.setEnv(StringUtils.isEmpty(env) ? DyPlusConstants.DEVELOPMENT
					: env);
			
		}
		if (!config.getEnv().equals(DyPlusConstants.DEVELOPMENT)
				&& !config.getEnv().equals(DyPlusConstants.PRODUCTION)
				&& !config.getEnv().equals(DyPlusConstants.PREVIEW)
				&& !config.getEnv().equals(DyPlusConstants.TEST)
				&& !config.getEnv().equals(DyPlusConstants.INTEGRATION)) {
			config.setEnv(DyPlusConstants.DEVELOPMENT);
		}
	}
	
	/**
	 * 检查ip设置是否在本地ip内
	 * @param ipSet global中的ip设置
	 * @param localIps 本地ip集合
	 * @return boolean
	 */
	private static boolean containsIp(String ipSet, List<String> localIps) {
		String[] ips = ipSet.split("\\|\\|");
		for (String ip : ips) {
			if (localIps.contains(ip.trim())) {
				return true;
			}
		}
		return false;
	}
}

