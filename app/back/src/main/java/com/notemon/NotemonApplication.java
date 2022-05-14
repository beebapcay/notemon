package com.notemon;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@Slf4j
@EnableJpaAuditing
public class NotemonApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotemonApplication.class, args);

        String backendUrl = String.format("http://localhost:%d", 8081);
        log.info("NOTEMON IS RUNNING AT: " + backendUrl);
    }
}
