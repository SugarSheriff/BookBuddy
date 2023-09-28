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

const fetchBooks = async (searchTerm) => {
  try {
    const apiKey = 'AIzaSyDClhvWRLjTV_3Ivco7Wq3tsDt8-yh38rc';
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}&maxResults=3`);
      const result = await response.json();
      return result.items;
      return books;
  } catch (err) {
    console.error(err);
    return [];
  }
};

