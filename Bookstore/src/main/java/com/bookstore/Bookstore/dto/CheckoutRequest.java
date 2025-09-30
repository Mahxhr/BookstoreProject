package com.bookstore.Bookstore.dto;

public class CheckoutRequest {
    private Long userId;

    public CheckoutRequest() {}

    public CheckoutRequest(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
