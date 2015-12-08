package org.dxc.onlineOrder.framework.annotationLog.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("conflictUserService")
//@Qualifier("conflictUserService")
public class UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

}