package org.dxc.onlineOrder.framework.properties;

import org.dxc.onlineOrder.util.DyDateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.URL;
import java.util.*;

/**
 * 属性文件Map集合
 * 在程序启动的时候 会根据环境获取当前环境的属性文件key value值
 * 环境分为 development  test  integration  production
 * 分别会读取 env_development  env_test  env_integration  env_production 下的属性文件
 *
 * @author ouyang
 * @since 2014/12/9 15:39
 */
public class ResourceMap {
    //env 必须放在 RESOURCE_MAP 上面 否则两次初始化后变成 空字符串
    //环境 development OR test OR integration OR production
    private static String env = "";
  //每次服务器启动版本号 可修改 int类型 方便修改时增长
    private static final int VERSION_NO = Integer.parseInt(DyDateUtils.getDateString(new Date(), "yyyyMMdd"));
    //属性文件 key value Map
    private static final Map<String, String> RESOURCE_MAP = init();
    private static final Logger LOGGER = LoggerFactory.getLogger(ResourceMap.class);
    


    /**
     * 私有构造函数
     *
     * @author ouyang
     * @since 2014/12/9 16:35
     */
    private ResourceMap() {
    }

    /**
     * 初始化资源Map
     *
     * @return 初始化资源map
     * @author ouyang
     * @since 2014/12/9 15:41
     */
    private static Map<String, String> init() {
        Map<String, String> initMap = new HashMap<>();
        env = DyPlusConfig.getInstance().getEnv();

        //初始化部分属性 环境和版本号
        initMap.put("env", env);
        initMap.put("versionNo", String.valueOf(VERSION_NO));

        List<File> fileList = getAllPropertiesFile("env_" + env);
        for (File file : fileList) {
            Properties prop = getProperties(file);
            propTransIntoMap(initMap, prop);
        }
        return initMap;
    }

    
    /**
     * 属性值转化到map对象 key value 分别trim
     *
     * @param initMap 初始化map
     * @param prop    属性文件
     * @author ouyang
     * @since 2014/12/9 15:43
     */
    private static void propTransIntoMap(Map<String, String> initMap,
                                         Properties prop) {
        Set<Object> keySet = prop.keySet();
        for (Object key : keySet) {
            String propKey = ((String) key).trim();
            String propValue = prop.getProperty((String) key).trim();
            if (initMap.containsKey(propKey)) {
                LOGGER.error("'{}' is duplicate,place check your properties", propKey);
            }
            initMap.put(propKey, propValue);
        }
    }

    /**
     * 返回资源目录dir中所有属性文件
     *
     * @param dir 资源目录文件名
     * @return 资源目录文件下 后缀endStr的文件列表
     * @author ouyang
     * @since 2014/12/9 16:09
     */
    private static List<File> getAllPropertiesFile(String dir) {
        List<File> list = new ArrayList<>();
        URL resourceURL = ResourceMap.class.getClassLoader().getResource(dir);
        if (resourceURL == null) {
            return null;
        }
        File file = new File(resourceURL.getPath());
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files != null) {
                for (File propertiesFile : files) {
                    if (propertiesFile.getName().endsWith(".properties")) {
                        list.add(propertiesFile);
                    }
                }
            }
        }
        return list;
    }

    /**
     * 属性文件转换为属性对象
     *
     * @param file 属性文件
     * @return 属性对象
     * @author ouyang
     * @since 2014/12/9 16:39
     */
    private static Properties getProperties(File file) {
        Properties properties = new Properties();
        InputStream io = null;
        try {
            io = new FileInputStream(file);
            properties.load(io);
            io.close();
        } catch (FileNotFoundException ignored) {
            LOGGER.error("properties file not found");
        } catch (IOException e) {
            LOGGER.error(e.getClass().getName(), e);
        } finally {
            if (io != null) {
                try {
                    io.close();
                } catch (IOException e) {
                    LOGGER.error("close stream Exception", e);
                }
            }
        }
        return properties;
    }

    /**
     * 根据key获取属性文件value值
     * 如果为空 默认返回空字符串
     *
     * @param key key
     * @return value
     * @author ouyang
     * @since 2014/12/9 16:41
     */
    public static String get(String key) {
        return get(key, "");
    }

    /**
     * 获取属性配置文件的key对应value值为数字类型方法
     *
     * @param key key
     * @return value数值
     * @author ouyang
     * @since 2014/12/22 10:35
     */
    public static Integer getInt(String key) {
        try {
            return Integer.parseInt(get(key));
        } catch (NumberFormatException e) {
            LOGGER.error("key:{}的值{}不是数字", key, get(key));
            LOGGER.error(e.getClass().getName(), e);
        }
        return null;
    }

    /**
     * 根据key获取属性文件value值
     *
     * @param key        key
     * @param defaultStr value默认返回值
     * @return value
     * @author ouyang
     * @since 2014/12/9 16:43
     */
    public static String get(String key, String defaultStr) {
        if (RESOURCE_MAP.get(key) == null) {
            return defaultStr;
        } else {
            return RESOURCE_MAP.get(key);
        }
    }

    public static String getEnv() {
        return env;
    }

    /**
     * 获取所有属性的map
     *
     * @return 所有属性的map
     * @author ouyang
     * @since 2014/12/10 10:32
     */
    public static Map<String, String> getAllMap() {
        return Collections.unmodifiableMap(RESOURCE_MAP);
    }

    /**
     * 修改属性map的key value值
     *
     * @param key   key
     * @param value value
     * @author ouyang
     * @since 2014/12/9 16:45
     */
    public static void set(String key, String value) {
        RESOURCE_MAP.put(key, value);
    }

    public static String getLog4jFile() {
        URL resourceURL = ResourceMap.class.getClassLoader().getResource("env_" + RESOURCE_MAP.get("env"));
        System.out.println("-------------------"+resourceURL);
        if (resourceURL != null) {
            return resourceURL.getPath() + "/log4j.properties";
        }
        return null;
    }

}
