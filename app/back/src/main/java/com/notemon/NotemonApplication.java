package com.notemon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotemonApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotemonApplication.class, args);

        String backendUrl = "http://localhost:8080";
        System.out.println("Notemon Backend Running in: " + backendUrl);
    }
}
