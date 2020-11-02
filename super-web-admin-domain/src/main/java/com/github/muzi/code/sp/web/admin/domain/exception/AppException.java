package com.github.muzi.code.sp.web.admin.domain.exception;

import com.github.muzi.code.sp.web.admin.common.MessageFormatter;

/**
 * 系统服务通用异常
 */
public class AppException extends RuntimeException {
    private static final long serialVersionUID = 7793693314166396925L;
    private String key;
    private String message;
    private String businessId;

    public AppException(String message) {
        this(null, message, null, null);
    }

    public AppException(String message, Throwable cause) {
        this(null, message, null, cause);
    }

    public AppException(String key, String message) {
        this(key, message, null, null);
    }

    public AppException(String key, String message, Throwable cause) {
        this(key, message, null, cause);
    }

    public AppException(String key, String message, String businessId) {
        this(key, message, businessId, null);
    }

    public AppException(String key, String message, String businessId, Throwable cause) {
        super(message,cause);
        this.key = key;
        this.message = message;
        this.businessId = businessId;
    }

    public String getKey() {
        return this.key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getBusinessId() {
        return this.businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    @Override
    public String toString() {
        //定义JSON输出格式
        String json = MessageFormatter.stringFormat("{\"key\":\"%s\",\"message\":\"%s\",\"businessId\":\"%s\"}", key, message, businessId);
        //去除NULL字段
        return MessageFormatter.jsonRepair(json);
    }
}
