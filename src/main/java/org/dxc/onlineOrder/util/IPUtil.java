package org.dxc.onlineOrder.util;


import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.google.common.base.Strings;

/** 
 * @Description: 与IP地址相关的UTIL
 */
public class IPUtil {

	/**
	 * 获得德佑的IP地址
	 * @return String
	 */
	public static String getDyIp(HttpServletRequest request){
		String ip = getIp(request);
		if(ip.equals("127.0.0.1")){
			ip = null;
			Enumeration<NetworkInterface> e;
			try {
				e = NetworkInterface.getNetworkInterfaces();
				while(e.hasMoreElements())
		        {
					NetworkInterface ee = e.nextElement();
					Enumeration<InetAddress> ads = ee.getInetAddresses();
					while(ads.hasMoreElements()){
						String tempIp = ads.nextElement().getHostAddress();
						if(tempIp.matches("(10|192)\\.(8|9|10|168)\\.[\\d\\.]+"))
						{
							ip = tempIp;
							break;
						}
					}
		            if(ip!=null)
		            	break;
		        }
				return ip;
			} catch (SocketException e1) {
				return "127.0.0.1";
			}
		}
		else
			return ip;
	}
	
	/**
	 * 获得IP地址
	 * @param request HttpServletRequest
	 * @return String
	 */
	public static String getIp(HttpServletRequest request){
		String ip = request.getHeader("Cdn-Src-Ip");//增加CDN获取ip
        if (Strings.isNullOrEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-For");
        }
        if (Strings.isNullOrEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (Strings.isNullOrEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (Strings.isNullOrEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (Strings.isNullOrEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (Strings.isNullOrEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;     
	}
	
	/**
	 * 获得Ip地址数据 
	 * @param request
	 * @return int[]
	 */
	public static int[] getIpArray(HttpServletRequest request){
		String ip = getIp(request);
		return getIpArray(ip);
	}
	
	/**
	 * 获得Ip地址数据 
	 * @param ip ip地址
	 * @return int[]
	 */
	public static int[] getIpArray(String ip){
		String[] ips = ip.split("\\.");
		if(ips.length!=4)
			return null;
		else{
			return new int[]{ Integer.valueOf(ips[0]) , Integer.valueOf(ips[1]) , Integer.valueOf(ips[2]) , Integer.valueOf(ips[3])};
		}
	}
	
	/**
	 * 获得本机IP地址 集合 （多网卡多ip的情况）
	 * @return List<String>
	 */
	public static List<String> getLocalIp() {
		List<String> ipList = new ArrayList<String>();
		Pattern pattern = Pattern.compile("\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}");
		try {
			Enumeration<NetworkInterface> networkList = NetworkInterface
					.getNetworkInterfaces();
			while (networkList.hasMoreElements()) {
				Enumeration<InetAddress> list = networkList.nextElement().getInetAddresses();
				while(list.hasMoreElements()){
					String ip = list.nextElement().getHostAddress();
					if(pattern.matcher(ip).matches()){
						ipList.add(ip);
					}
				}
			}
		} catch (SocketException e) {
			e.printStackTrace();
		}
		return ipList;
	}
	
}
  
    
