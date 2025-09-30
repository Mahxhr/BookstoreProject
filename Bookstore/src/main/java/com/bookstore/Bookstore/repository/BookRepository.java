package com.bookstore.Bookstore.repository;
import com.bookstore.Bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Find books by exact title
    List<Book> findByTitle(String title);

    // Find books containing a keyword in title
    List<Book> findByTitleContaining(String keyword);

    // Find books by author
    List<Book> findByAuthor(String author);

    // Find books by category
    List<Book> findByCategory(String category);

    // Optional: find books cheaper than a certain price
    List<Book> findByPriceLessThan(Double price);

    // Optional: find books within a price range
    List<Book> findByPriceBetween(Double minPrice, Double maxPrice);
}
