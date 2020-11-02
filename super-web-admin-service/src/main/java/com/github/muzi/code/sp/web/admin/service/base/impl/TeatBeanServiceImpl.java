package com.github.muzi.code.sp.web.admin.service.base.impl;

import com.github.muzi.code.sp.web.admin.dao.TestMapper;
import com.github.muzi.code.sp.web.admin.domain.mysql.TestBean;
import com.github.muzi.code.sp.web.admin.service.base.TeatBeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeatBeanServiceImpl implements TeatBeanService {

    @Autowired
    private TestMapper testMapper;

    @Override
    public boolean save(TestBean bean) {
        return testMapper.insert(bean) == 1;
    }

    @Override
    public long count() {
        return testMapper.count();
    }
}
