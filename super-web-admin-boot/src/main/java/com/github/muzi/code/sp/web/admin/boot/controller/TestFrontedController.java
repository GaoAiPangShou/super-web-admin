package com.github.muzi.code.sp.web.admin.boot.controller;

import com.github.muzi.code.sp.web.admin.domain.exception.AppException;
import com.github.muzi.code.sp.web.admin.domain.view.BaseResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController("/api/test/fronted")
public class TestFrontedController {

    @RequestMapping(value = "/list", method = {RequestMethod.GET})
    public BaseResponse pageList() throws AppException {
        return BaseResponse.success("piu!piu!");
    }
}
