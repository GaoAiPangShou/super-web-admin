package com.github.muzi.code.sp.web.admin.domain.mysql;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "sys_test_table")
public class TestBean {

    /*
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /*
     * 团队名称
     */
    @TableField(value = "name")
    private String name;

    /**
     * 统计出现频次
     */
    @TableField(exist = false)
    private Integer count;
}
