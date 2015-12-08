package onlineOrder;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class test {

	public static void main(String[] args) {
		BeanFactory ac = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml","classpath:spring/dxc-servlet.xml");
		
		Object obj = ac.getBean("conflictUserService");
		System.out.println(obj);
	}
}
