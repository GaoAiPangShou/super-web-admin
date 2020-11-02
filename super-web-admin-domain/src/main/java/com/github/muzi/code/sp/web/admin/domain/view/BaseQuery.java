package com.github.muzi.code.sp.web.admin.domain.view;

import com.github.muzi.code.sp.web.admin.domain.exception.AppException;
import lombok.Data;

/**
 * 【VO实体类】通用的基础BaseQueryVO
 * Create by Muzi Li on 2019-11-27
 */
@Data
public abstract class BaseQuery {

    public abstract boolean checkParams() throws AppException;
}
