package com.example.smartinternship.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.smartinternship.Model.Users;

@Repository
public interface SecurityRepository extends JpaRepository<Users, Integer> {

	Users findUserByEmail(String email);

}
