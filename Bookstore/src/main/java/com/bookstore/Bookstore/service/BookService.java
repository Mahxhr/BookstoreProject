package com.bookstore.Bookstore.service;
import com.bookstore.Bookstore.dto.BookDTO;
import com.bookstore.Bookstore.repository.BookRepository;
import com.bookstore.Bookstore.model.Book;
import com.bookstore.Bookstore.dto.BookDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book updateBook(Long id, Book book) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        // Update fields
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setCategory(book.getCategory());
        existingBook.setDescription(book.getDescription());
        existingBook.setPrice(book.getPrice());
        existingBook.setImageUrl(book.getImageUrl());

        return bookRepository.save(existingBook);
    }
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }


    public Book addBook(Book book) {
        // ✅ If no image URL provided, set default
        if (book.getImageUrl() == null || book.getImageUrl().trim().isEmpty()) {
            book.setImageUrl("https://via.placeholder.com/150");
        }
        return bookRepository.save(book);
    }
}
