package com.bookstore.Bookstore.repository;

import com.bookstore.Bookstore.model.Order;
import com.bookstore.Bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Find all orders by a specific user
    List<Order> findByUser(User user);

    // Find orders by status (like PENDING, COMPLETED)
    List<Order> findByStatus(String status);

    // Optional: find orders above a certain total amount
    List<Order> findByTotalPriceGreaterThan(Double totalPrice);
}
