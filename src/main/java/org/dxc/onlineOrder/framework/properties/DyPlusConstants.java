package org.dxc.onlineOrder.framework.properties;

/**
 * @author Jail E -Mail:86455@ dooioo.com
 */
public class DyPlusConstants {

	/**
	 * 开发环境
	 */
	public static final String DEVELOPMENT = "development";
	/**
	 * 正式环境
	 */
	public static final String PRODUCTION = "production";
	/**
	 * 测试环境
	 */
	public static final String TEST = "test";
	/**
	 * 集成测试环境
	 */
	public static final String INTEGRATION = "integration";
	/**
	 * 试用环境
	 */
	public static final String PREVIEW = "preview";


	public static final int USERCODEMASK = 997;      //用户工号掩码
	public static final String SESSION_USER = "SESSION_USER";   //用户SESSION名字
	public static final String COOKIENAME = "ui"; //COOKIE名
	public static final String COMPANYID = "companyId"; //COOKIE名
	public static final String TOKENNAME = "token"; //token名
    public static final String SECURITY_SESSION_USER = "SECURITY_SESSION_USER"; //用户二次登录的session名字
    public static final String SESSION_USER_KEY="_DY_OMS_PLUS_SESSION_USER_KEY";//获取Session中的用户对应的key
    public static final long   SESSION_EXPIRES = 1200000;   //二次校验的session过期时间 毫秒
    public static final int CONVERSION_RATE= 60000;  //分到豪秒的转换率
    public static final String DOMAIN_COM="com";
    public static final String DOMAIN_CN="cn";
    public static final String DOMAIN_ME="me";
    public static final String DOMAIN_ORG="org";
    public static final String DOMAIN_NET="net";
    
    public static final String DEFAULT_TOKEN_ERROR_MESSAGE="token过期，请重新登录。";//默认token出问题的提示
    public static final String STATUS_OK="ok";//ajax response ok
    public static final String STATUS_FAIL="fail";//ajax response fail

    public static final String JSON_RESULT_STATUS = "status";
    public static final String JSON_RESULT_MESSAGE = "message";

    public static final String JSON_ERROR = "{\"status\":\"error\",\"message\":\"请求报错！\"}";

	/***
	 * ldap 的最大使用次数，用来重置
	 */
	public static final int maxUseTimes = 100;
}

