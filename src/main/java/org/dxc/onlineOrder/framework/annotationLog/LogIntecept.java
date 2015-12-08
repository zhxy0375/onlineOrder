package org.dxc.onlineOrder.framework.annotationLog;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogIntecept {
	private static final Logger logger = LoggerFactory.getLogger(LogIntecept.class);
	
//	@SuppressWarnings("EmptyMethod")
//    @Pointcut("@annotation(org.dxc.onlineOrder.framework.annotationLog.LogAnnotation)")
//    private void addPointCut() {
//    }

//  环绕通知：类似与动态代理的全过程
//  携带参数ProceedingJoinPoint，且必须有返回值，即目标方法的返回
//  @Around(value = "execution(* org.dxc.onlineOrder.service.*.*(..)) && @annotation(org.dxc.onlineOrder.framework.annotationLog.LogAnnotation)") // 1这种方式会报 java.lang.IllegalArgumentException: error at ::0 formal unbound in pointcut 

	//	@Around("addPointCut()") // 2这种方式也会报 java.lang.IllegalArgumentException: error at ::0 formal unbound in pointcut
	@Around(value = "execution(* org.dxc.onlineOrder.service.*.*(..)) && @annotation(log)")
  public Object aroundMethod(ProceedingJoinPoint pjd, LogAnnotation log) {
      Object result = null;
      logger.info(log.desc());
      try {
          logger.info("前置通知");
          result = pjd.proceed();
          logger.info("后置通知");
      } catch (Throwable e) {
          logger.info("异常通知");
      }
      logger.info("返回通知");
      return result;
  }
}