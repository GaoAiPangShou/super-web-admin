package com.github.muzi.code.sp.web.admin.domain.view;

import lombok.Data;

import java.util.List;

/**
 * 【VO实体类】分页数据查询通用的基础BaseDataQueryVO
 * Create by Muzi Li on 2019-11-27
 */
@Data
public abstract class BaseDataQuery<T> extends BaseQuery {

    /**
     * 输入框查询条件
     */
    private String keyword;

    /**
     * 下拉列表查询条件类型
     */
    private String keywordType;

    /**
     * 当前页码
     */
    private Long current;

    /**
     * 全部数据
     */
    private Long total;

    /**
     * 单页数量
     */
    private Long size;

    /**
     * 全部页数
     */
    private Long pages;

    /**
     * 开始位置
     */
    private Long limitStart;

    /**
     * 限制条数
     */
    private Long limitNum;

    /**
     * 分页数据列表
     */
    private List<T> records;

}
