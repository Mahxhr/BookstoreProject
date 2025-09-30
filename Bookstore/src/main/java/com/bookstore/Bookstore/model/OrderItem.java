package com.bookstore.Bookstore.model;
import jakarta.persistence.*;

@Entity
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookId;
    private String title;
    private double price;
    private int quantity;

    @ManyToOne
    private Order order;

    public OrderItem() {}

    public OrderItem(Long id, Long bookId, String title, double price, int quantity, Order order) {
        this.id = id;
        this.bookId = bookId;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.order = order;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}
