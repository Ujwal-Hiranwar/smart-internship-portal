package com.example.smartinternship.Controller;
	
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.smartinternship.Model.Users;
import com.example.smartinternship.Service.SecurityService;
	
	@RestController
	public class SecurityController {
		
		@Autowired
		private SecurityService securityservice;
		
		@GetMapping("/")
	public String greet() {
		return "Hello";
	}
		@PostMapping("/signup")
		public void signup(@RequestBody Users user) {
			securityservice.signup(user);
		}
		@PostMapping("/signin")
		public String signin(@RequestBody Users user){
			return  securityservice.signin(user);
		}
	}
