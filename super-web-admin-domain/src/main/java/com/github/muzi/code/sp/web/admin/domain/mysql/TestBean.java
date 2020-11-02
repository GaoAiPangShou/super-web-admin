package com.github.muzi.code.sp.web.admin.domain.mysql;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "sys_test_table")
public class TestBean {

    /*
     * 主键ID
     */
    private Long id;

    /*
     * 团队名称
     */
    private String name;

}
