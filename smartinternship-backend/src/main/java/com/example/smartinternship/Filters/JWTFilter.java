package com.example.smartinternship.Filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.smartinternship.Service.JWTService;
import com.example.smartinternship.Service.MyUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter{
	
    @Autowired
	private JWTService jwtService;
    
    @Autowired
    private MyUserDetailsService myUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader=request.getHeader("Authorization");
		String email=null;
		String token=null;
		
		if(authHeader !=null && authHeader.startsWith("Bearer "))
		{
			token=authHeader.substring(7);
		email=jwtService.extractEmail(token);
		}
		
		if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
			UserDetails userDetails= myUserDetailsService.loadUserByUsername(email);
			if(jwtService.validateToken(token,userDetails))
			{
				UsernamePasswordAuthenticationToken authToken =
						new UsernamePasswordAuthenticationToken(
								userDetails,null,userDetails.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		filterChain.doFilter(request, response);
		
	}

}
