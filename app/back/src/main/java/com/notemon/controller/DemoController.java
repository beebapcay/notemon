package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(EndpointConstant.DEMO_ENDPOINT)
public class DemoController {
    @GetMapping
    public String get() {
        return "Hello World";
    }

    @GetMapping("/error")
    public String getError() {
        throw new RuntimeException("Error occurred.");
    }

    @GetMapping("/auth")
    public String getAuth() {
        return "Hello World";
    }
}
