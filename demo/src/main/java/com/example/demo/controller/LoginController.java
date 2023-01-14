package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class LoginController {

    @GetMapping(value = {"/","/home"})
    public String home(Model model) {

        model.addAttribute("props", Map.of("customerTypes", 123 ));
        return "home/index.html";
    }

    @GetMapping("/about")
    public String enterprise(Model model) {
        model.addAttribute("props", Map.of("customerTypes", 123 ));
        return "about/index.html";
    }
}
