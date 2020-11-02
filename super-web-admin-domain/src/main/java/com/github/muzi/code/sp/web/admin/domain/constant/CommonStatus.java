package com.github.muzi.code.sp.web.admin.domain.constant;

/**
 * 【枚举】 系统异常信息通用定义
 * Create by Muzi Li on 2019-12-09
 */
public enum CommonStatus {

    // 成功
    SUCCESS(200, "业务执行成功"),

    // 失败
    FAILURE(500, "业务执行失败"),

    ARGUEMENTS_ERROR(501, "参数错误"),

    TRANSACTION_ERROR(502, "事务错误"),

    MESSAGE_ERROR(503, "消息错误"),

    PROCESS_ERROR(504, "处理错误"),

    RPC_ERROR(505, "RPC错误"),

    USER_NO_LOGIN_ERROR(598, "用户需要登录"),

    OTHER_ERROR(599, "其他错误");

    private Integer code;
    private String msg;

    private CommonStatus(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public static String getResponseMsg(Integer code) {
        for (CommonStatus wrapperEnumError : CommonStatus.values()) {
            if (code.equals(wrapperEnumError.getCode())) {
                return wrapperEnumError.getMsg();
            }
        }
        return OTHER_ERROR.getMsg();
    }
}
