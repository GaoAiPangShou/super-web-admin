package com.github.muzi.code.sp.web.admin.domain.view;

import com.github.muzi.code.sp.web.admin.domain.constant.CommonStatus;
import lombok.Data;

/**
 * 【页面展示实体类】控制器返回值
 *
 *  Create by Muzi Li on 2019-11-26
 */
@Data
public class BaseResponse<M> {

    /*
     * 响应状态
     */
    private Integer status;

    /*
     * 响应信息
     */
    private String msg;

    /*
     * 数据实体
     */
    private M data;



    public static<M> BaseResponse success(){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(CommonStatus.SUCCESS.getCode());
        baseResponseVO.setMsg(CommonStatus.SUCCESS.getMsg());
        return baseResponseVO;
    }

    public static<M> BaseResponse success(M data){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(CommonStatus.SUCCESS.getCode());
        baseResponseVO.setMsg(CommonStatus.SUCCESS.getMsg());
        baseResponseVO.setData(data);
        return baseResponseVO;
    }

    public static<M> BaseResponse failure(){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(CommonStatus.FAILURE.getCode());
        baseResponseVO.setMsg(CommonStatus.FAILURE.getMsg());
        return baseResponseVO;
    }

    public static<M> BaseResponse failure(String message){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(CommonStatus.FAILURE.getCode());
        baseResponseVO.setMsg(message);
        return baseResponseVO;
    }

    public static<M> BaseResponse failure(Integer status, String message){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(status);
        baseResponseVO.setMsg(message);
        return baseResponseVO;
    }

    public static<M> BaseResponse noLogin(){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(CommonStatus.USER_NO_LOGIN_ERROR.getCode());
        baseResponseVO.setMsg(CommonStatus.USER_NO_LOGIN_ERROR.getMsg());
        return baseResponseVO;
    }

    public static<M> BaseResponse systemError(){
        BaseResponse baseResponseVO = new BaseResponse();
        baseResponseVO.setStatus(CommonStatus.OTHER_ERROR.getCode());
        baseResponseVO.setMsg(CommonStatus.OTHER_ERROR.getMsg());
        return baseResponseVO;
    }


}
