export function loadBooks() {
  const data = localStorage.getItem("books");
  return data ? JSON.parse(data) : [];
}

export function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}
