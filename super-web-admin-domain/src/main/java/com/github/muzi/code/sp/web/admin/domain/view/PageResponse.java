package com.github.muzi.code.sp.web.admin.domain.view;

import com.github.muzi.code.sp.web.admin.domain.constant.CommonStatus;
import com.google.common.collect.Lists;
import lombok.Data;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;

@Data
public class PageResponse<M> extends BaseResponse<M> {

    /*
     * 当前页码
     */
    private Long current = 0L;

    /*
     * 全部数据
     */
    private Long total = 0L;

    /*
     * 单页数量
     */
    private Long size = 0L;

    /*
     * 页数据
     */
    private List<M> records = Lists.newArrayList();


    public static <M> PageResponse successPage(BaseDataQuery page) {
        if (page == null || CollectionUtils.isEmpty(page.getRecords()) || page.getTotal() == 0) {
            return PageResponse.failurePage();
        }
        PageResponse baseResponseVO = new PageResponse();
        baseResponseVO.setStatus(CommonStatus.SUCCESS.getCode());
        baseResponseVO.setMsg(CommonStatus.SUCCESS.getMsg());
        baseResponseVO.setRecords(page.getRecords());
        baseResponseVO.setTotal(page.getTotal());
        baseResponseVO.setSize(page.getSize());
        baseResponseVO.setCurrent(page.getCurrent());
        return baseResponseVO;
    }

    public static <M> PageResponse failurePage() {
        PageResponse baseResponseVO = new PageResponse();
        baseResponseVO.setStatus(CommonStatus.FAILURE.getCode());
        baseResponseVO.setMsg(CommonStatus.FAILURE.getMsg());
        baseResponseVO.setRecords(Lists.newArrayList());
        baseResponseVO.setTotal(0L);
        baseResponseVO.setSize(0L);
        baseResponseVO.setCurrent(0L);
        return baseResponseVO;
    }
}
