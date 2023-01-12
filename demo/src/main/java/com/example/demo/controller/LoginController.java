package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping(value = {"/","/home"})
    public String home( ) {
        return "home/index.html";
    }

    @GetMapping("/about")
    public String enterprise() {
        return "about/index.html";
    }
}
