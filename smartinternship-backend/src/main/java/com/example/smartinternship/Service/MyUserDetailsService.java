package com.example.smartinternship.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.smartinternship.Model.UserPrinciple;
import com.example.smartinternship.Model.Users;
import com.example.smartinternship.Repository.SecurityRepository;

@Service
public class MyUserDetailsService  implements UserDetailsService{
	
	@Autowired
	private SecurityRepository repo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user=repo.findUserByEmail(email);
		if(user== null)
		{
			 throw new UsernameNotFoundException("User not found");
		}
		return new UserPrinciple(user);
	}

}
