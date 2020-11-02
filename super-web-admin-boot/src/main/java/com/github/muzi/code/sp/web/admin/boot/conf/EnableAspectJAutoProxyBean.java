package com.github.muzi.code.sp.web.admin.boot.conf;

import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Service;


/*
 * 开启注解AOP
 * */
@Service
@EnableAspectJAutoProxy(proxyTargetClass = false,exposeProxy = true)
public class EnableAspectJAutoProxyBean {

}
