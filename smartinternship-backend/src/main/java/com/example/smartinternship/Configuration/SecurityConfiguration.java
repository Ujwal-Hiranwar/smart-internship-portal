package com.example.smartinternship.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.smartinternship.Filters.JWTFilter;
import com.example.smartinternship.Service.MyUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private MyUserDetailsService userDetailsService;
	@Autowired
	private JWTFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) {
		
		return http
				.csrf(customizer -> customizer.disable())
				.authorizeHttpRequests(customizer -> customizer.requestMatchers("/signup","/signin").permitAll()
						.anyRequest().authenticated())
				.sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
	            .build();
	}
	@Bean
	public AuthenticationProvider authenticationProvider() {
	      DaoAuthenticationProvider provider= new DaoAuthenticationProvider(userDetailsService);
	      provider.setPasswordEncoder(passwordEncoder());
	      return provider;
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
	{
		return config.getAuthenticationManager();
}
}
