const router = require('express').Router();
const { Book } = require('../../models');
const { Op } = require('sequelize');

router.get('/books' , async (req, res) => {
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

    res.render('books', { books });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error when serching books.' })
  }
});

module.exports = router;



