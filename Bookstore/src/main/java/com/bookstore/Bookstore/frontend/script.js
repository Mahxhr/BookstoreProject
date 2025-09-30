const apiUrl = "http://localhost:8080/books";
let editingBookId = null;
let books = [];

const modal = document.getElementById("bookModal");
const addBookBtn = document.getElementById("addBookBtn");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBtn");
const saveBookBtn = document.getElementById("saveBookBtn");
const modalTitle = document.getElementById("modalTitle");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");

const inputs = {
  title: document.getElementById("bookTitle"),
  author: document.getElementById("bookAuthor"),
  category: document.getElementById("bookCategory"),
  description: document.getElementById("bookDescription"),
  price: document.getElementById("bookPrice"),
  imageUrl: document.getElementById("bookImageUrl")
};

// Open Add Book Modal
addBookBtn.onclick = () => {
  modalTitle.textContent = "Add Book";
  clearInputs();
  editingBookId = null;
  modal.style.display = "block";
};

// Close Modal
closeBtn.onclick = cancelBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target == modal) modal.style.display = "none"; };

// Fetch and display books
function fetchBooks() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      books = data;
      populateCategoryFilter();
      displayBooks(books);
    });
}

// Display books
function displayBooks(bookArray) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  bookArray.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.imageUrl || 'https://via.placeholder.com/200x200?text=No+Image'}" alt="${book.title}">
      <div class="content">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <p>${book.description}</p>
        <p>Price: $${book.price}</p>
        <div class="actions">
          <button class="edit-btn" onclick='editBook(${JSON.stringify(book)})'>Edit</button>
          <button class="delete-btn" onclick='deleteBook(${book.id})'>Delete</button>
        </div>
      </div>
    `;
    bookList.appendChild(card);
  });
}

// Populate category filter dropdown
function populateCategoryFilter() {
  const categories = [...new Set(books.map(b => b.category).filter(Boolean))];
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

// Clear form inputs
function clearInputs() { for (let key in inputs) inputs[key].value = ""; }

// Save Book (Add or Edit)
saveBookBtn.onclick = () => {
  const bookData = {};
  if(inputs.title.value.trim()) bookData.title = inputs.title.value.trim();
  if(inputs.author.value.trim()) bookData.author = inputs.author.value.trim();
  if(inputs.category.value.trim()) bookData.category = inputs.category.value.trim();
  if(inputs.description.value.trim()) bookData.description = inputs.description.value.trim();
  if(inputs.price.value) bookData.price = parseFloat(inputs.price.value);
  if(inputs.imageUrl.value.trim()) bookData.imageUrl = inputs.imageUrl.value.trim();

  if(editingBookId) {
    fetch(`${apiUrl}/${editingBookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData)
    }).then(res => res.json())
      .then(() => { fetchBooks(); modal.style.display = "none"; });
  } else {
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData)
    }).then(res => res.json())
      .then(() => { fetchBooks(); modal.style.display = "none"; });
  }
};

// Edit book
function editBook(book) {
  editingBookId = book.id;
  modalTitle.textContent = "Edit Book";
  inputs.title.value = book.title;
  inputs.author.value = book.author;
  inputs.category.value = book.category;
  inputs.description.value = book.description;
  inputs.price.value = book.price;
  inputs.imageUrl.value = book.imageUrl;
  modal.style.display = "block";
}

// Delete book
function deleteBook(id) {
  if(confirm("Are you sure you want to delete this book?")) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => fetchBooks());
  }
}

// Search, Filter, Sort
searchInput.oninput = categoryFilter.onchange = sortPrice.onchange = () => {
  let filtered = books;
  const search = searchInput.value.toLowerCase();
  if(search) filtered = filtered.filter(b => b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search));
  const category = categoryFilter.value;
  if(category) filtered = filtered.filter(b => b.category === category);
  const sort = sortPrice.value;
  if(sort === "asc") filtered.sort((a,b)=>a.price-b.price);
  else if(sort==="desc") filtered.sort((a,b)=>b.price-a.price);
  displayBooks(filtered);
}

// Initial load
fetchBooks();
