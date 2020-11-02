package com.github.muzi.code.sp.web.admin.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.github.muzi.code.sp.web.admin.domain.mysql.TestBean;

/**
 * 【持久层】测试
 */
public interface TestMapper extends BaseMapper<TestBean> {

    Long count();
}
