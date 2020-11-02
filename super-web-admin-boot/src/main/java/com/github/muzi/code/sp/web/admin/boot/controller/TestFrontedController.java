package com.github.muzi.code.sp.web.admin.boot.controller;

import com.github.muzi.code.sp.web.admin.domain.exception.AppException;
import com.github.muzi.code.sp.web.admin.domain.mysql.TestBean;
import com.github.muzi.code.sp.web.admin.domain.view.BaseResponse;
import com.github.muzi.code.sp.web.admin.service.base.TeatBeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/test/fronted")
public class TestFrontedController {

    @Autowired
    private TeatBeanService teatBeanService;

    @ResponseBody
    @RequestMapping(value = "/count", method = {RequestMethod.GET})
    public BaseResponse count() throws AppException {
        return BaseResponse.success(teatBeanService.count());
    }

    @ResponseBody
    @RequestMapping(value = "/save", method = {RequestMethod.GET})
    public BaseResponse save(String name) throws AppException {
        TestBean testBean = new TestBean();
        testBean.setName(name);
        return BaseResponse.success(teatBeanService.save(testBean));
    }
}
