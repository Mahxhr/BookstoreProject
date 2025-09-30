package com.bookstore.Bookstore.repository;

import com.bookstore.Bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find users by name
    List<User> findByUsername(String username);

    // Optional: find users by role (like ADMIN, CUSTOMER)
    List<User> findByRole(String role);
}