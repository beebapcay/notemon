package com.notemon.controller;

import com.notemon.constant.Endpoint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Endpoint.DEMO_ENDPOINT)
public class DemoController {
    @GetMapping
    public String get() {
        return "Hello World";
    }
}
