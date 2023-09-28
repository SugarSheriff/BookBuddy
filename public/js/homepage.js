const data = {
  title: "Welcome to BookBuddy",
  subtitle: "Your Book Discovery Platform",
  menuItems: [
      { text: "Home", link: "#" },
      { text: "Browse Books", link: "#" },
      { text: "My Books", link: "#" }
  ],
  featuredBooks: [
      {
          title: "Book 1",
          author: "Author 1",
          description: "Description of Book 1",
          img: "URL_of_Book_1_thumbnail"
      },
      {
          title: "Book 2",
          author: "Author 2",
          description: "Description of Book 2",
          img: "URL_of_Book_2_thumbnail"
      }
  ],
  footerText: "&copy; 2023 BookBuddy. All rights reserved."
};

const renderTemplate = async () => {
  const templateSource = await fetch('template.handlebars').then(response => response.text());
  const template = Handlebars.compile(templateSource);
  const renderedHtml = template(data);
  document.body.innerHTML = renderedHtml;
};

const fetchBooks = async (searchTerm) => {
  try {

    const apiKey = 'AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc';
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}&maxResults=3`);
    const result = await response.json();
    console.log(result);
    const books = result.items.slice(0, 3).map(item => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(', '),
      description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks.thumbnail
    }));
    // data.featuredBooks = books;
  } catch (err) {
    console.error("Error fetching books:", err);
  }
};

const displayBooks = (books) => {
  const booksContainer = document.querySelector('.myBooks');
  booksContainer.innerHTML = '';
  books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-box');
      bookDiv.innerHTML = `
          <h3 class="title">${book.title}</h3>
          <img src="${book.thumbnail}" alt="${book.title} cover">
          <p>${book.author}</p>
          <p>${book.description}</p>
      `;
      booksContainer.appendChild(bookDiv);
  });
  console.log(books);
};

const init = async () => {
  // await renderTemplate();
  const form = document.querySelector('.box form');
  form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = event.target.elements.search.value.trim();
      if (!searchTerm) return;
      const response = await fetch('/api/books/search?q=' + searchTerm);
      console.log("This is the:", response);
      const books = await response.json();

      displayBooks(books);
      console.log(books)
      // await fetchBooks(searchTerm);
      // await renderTemplate();
  });
};

init();

// response: items.volumInfo.title
// items.volumInfo.author
// items.imageLinks.thumbnail
// item.volumeInfo.description