package com.example.bookstore_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/bookdetail/**") // Đặt đường dẫn của API bạn muốn cho phép
                        .allowedOrigins("http://localhost:3000") // Đặt nguồn gốc của yêu cầu (origin) bạn muốn cho phép
                        .allowedMethods("GET", "POST", "PUT", "DELETE"); // Đặt phương thức HTTP bạn muốn cho phép
                registry.addMapping("/books/**") // Đặt đường dẫn của API bạn muốn cho phép
                        .allowedOrigins("http://localhost:3000") // Đặt nguồn gốc của yêu cầu (origin) bạn muốn cho phép
                        .allowedMethods("GET", "POST", "PUT", "DELETE"); // Đặt phương thức HTTP bạn muốn cho phép
            }
        };
    }
}