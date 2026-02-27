package com.example.smartinternship.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.smartinternship.Model.Users;
import com.example.smartinternship.Repository.SecurityRepository;

@Service
public class SecurityService {

	@Autowired
	private SecurityRepository securityrepo;
	
	@Autowired
	private AuthenticationManager authenticationManager;
    @Autowired
	private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;
    
	public void signup(Users user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		securityrepo.save(user);
	}

	public void signin(Users user) {
		 Authentication auth=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				user.getEmail(),user.getPassword()));
		 if(auth.isAuthenticated())
			   jwtService.generateToken(user.getEmail());
		 
		
	}

}
