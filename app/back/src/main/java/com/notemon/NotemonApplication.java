package com.notemon;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class NotemonApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotemonApplication.class, args);
        String backendUrl = "http://localhost:8080";
        log.info("NOTEMON IS RUNNING AT: " + backendUrl);
    }
}
