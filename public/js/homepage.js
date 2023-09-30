
const fetchBooks = async (searchTerm) => {
  try {
    const apiKey = "AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc";
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}&maxResults=3`);

      const result = await response.json();
      return result.items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const displayResults = (books) => {
  const resultsContainer = document.querySelector('.myBooks');
  resultsContainer.innerHTML = '';

  books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-box');
    bookDiv.innerHTML = `
      <h3>${book.volumeInfo.title}</h3>
      <img src="${book.volumeInfo.imageLinks?.thumbnail || 'default-image-url.jpg'}" alt="${book.volumeInfo.title} cover">
      <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
      <p>${book.volumeInfo.description || 'No description available.'}</p>
    `;
    resultsContainer.appendChild(bookDiv);
  });
};

const searchForm = document.querySelector('#clickSearch');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchTerm = document.getElementById('search-books').value.trim();

  if (!searchTerm) return;
  const books = await fetchBooks(searchTerm);
  displayResults(books);
});
