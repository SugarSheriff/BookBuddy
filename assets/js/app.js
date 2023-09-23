// document.addEventListener("DOMContentLoaded", function () {
//     // Sample data (replace with actual data)
//     const data = {
//         title: "Welcome to BookBuddy",
//         subtitle: "Your Book Discovery Platform",
//         menuItems: [
//             { text: "Home", link: "#" },
//             { text: "Browse Books", link: "#" },
//             { text: "My Books", link: "#" }
//         ],
//         featuredBooks: [
//             {
//                 title: "Book 1",
//                 author: "Author 1",
//                 description: "Description of Book 1"
//             },
//             {
//                 title: "Book 2",
//                 author: "Author 2",
//                 description: "Description of Book 2"
//             }
//         ],
//         footerText: "&copy; 2023 BookBuddy. All rights reserved."
//     };

//     // Load the Handlebars template from the separate file
//     fetch('template.handlebars')
//         .then(response => response.text())
//         .then(templateSource => {
//             // Compile the Handlebars template
//             const template = Handlebars.compile(templateSource);

//             // Render the template with data
//             const renderedHtml = template(data);

//             // Append the rendered HTML to the document's body
//             document.body.innerHTML = renderedHtml;
//         });
// });


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
    const apiKey = 'AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc';
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`);
    const result = await response.json();
    const books = result.items.slice(0, 3).map(item => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', '),
        description: item.volumeInfo.description
        // thumbnail: item.volumeInfo.imageLinks?.thumbnail
    }));
    data.featuredBooks = books;
    console.log(books);
};

const displayBooks = (books) => {
    const booksContainer = document.getElementsByClassName('myBooks');
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
};

const init = async () => {
    await renderTemplate();
    const form = document.querySelector('.box form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value.trim();
        if (!searchTerm) return;
        await fetchBooks(searchTerm);
        await renderTemplate();
    });
};

init();

