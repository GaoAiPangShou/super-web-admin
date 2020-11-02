package com.github.muzi.code.sp.web.admin.service.base;

import com.github.muzi.code.sp.web.admin.domain.mysql.TestBean;

public interface TeatBeanService {

    boolean save(TestBean bean);

    long count();
}
