const router = require('express').Router();
const { Book } = require('../../models');
const { Op } = require('sequelize');

router.get('/search' , async (req, res) => {
  try {
    const searchTerm = req.query.q;
    console.log('This is the search term:', searchTerm);
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error when serching books.' })
  }
});

module.exports = router;

// // javier google books api
// const googleApiKey = `AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc`;
// // response = requests.get(`https://www.googleapis.com/books/v1/volumes?q=${search_query}&key=${api_key}`);

// // // Filter language en to search with user input
// // const userbooks = `https://www.googleapis.com/books/v1/volumes?q=${search_query}&filter=language:fr&key=${api_key}`;
// // search_query = 'user input when search books';
// // // the api key can go as a var.
// // // this link below has a lang en restriction. is different than filter
// // const langRestric = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&key=${api_key}`;

// // const exampleApi = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search-term}s&key=your-${API-key}`)
// //   .then(response => response.json())
// //   .then(result => {
// //     this.setState({ books: result.items})
// //   })
// //   exampleApi();
// //   console.log(exampleApi());

// // testing in insomnia
// // https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc

//   const fetchBooks = async (searchTerm, apiKey) => {
//     try {
//       const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}s&key=your-${apiKey}`);
//       const result = await response.json();

//       consolelog(result.items);
//     } catch (err) {
//       console.error('An error ocurred', err);
//     }
//   };
//   const searchTerm = 'The Long of the Ring';
//   const apiKey = `AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc`;
//   fetchBooks(searchTerm, apiKey);
