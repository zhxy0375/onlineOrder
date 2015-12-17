
package org.dxc.onlineOrder.framework.interceptor;

import org.apache.commons.lang3.StringUtils;
import org.dxc.onlineOrder.framework.properties.ResourceMap;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 登录拦截器 User: kqy Date: 11-3-21 Time: 下午5:17
 */
public class LoginInterceptor implements HandlerInterceptor {


	public boolean preHandle(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse, Object o) throws Exception {
		String requestUrl = httpServletRequest.getRequestURL().toString();

        if (StringUtils.contains(requestUrl, "/static/")) {
            return true;
        }
        if (StringUtils.contains(requestUrl, "/api")) {
            return true;
        }

        if (StringUtils.contains(requestUrl, "/upload/")) {
            return true;
        }
        if (StringUtils.contains(requestUrl, "/house/autoUpdate")) {
            return true;
        }
        if (StringUtils.contains(requestUrl, "/login/ajax")) {
            return true;
        }
        if (StringUtils.contains(requestUrl, "/property/panorama/upload")) {
            return true;
        }
        
        
        HttpSession session = httpServletRequest.getSession(true);
        JSONObject json = new JSONObject();
        json.putAll(ResourceMap.getAllMap());
        session.setAttribute("AddrMap", json);
        session.getServletContext().setAttribute("ResourceAddrMap", json);
        //添加属性文件值到ServletContext
//        session.getServletContext().setAttribute("ResourceAddrMap",  ResourceMap.getAllMap());
        
        return true;
	}

	public void postHandle(HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView)
			throws Exception {
	}

	public void afterCompletion(HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }

}
