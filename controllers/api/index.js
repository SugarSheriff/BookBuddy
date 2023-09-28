const router = require('express').Router();

const booksRoutes = require('./booksRoutes');
const userRoutes = require('./userRoutes');

router.use('/books', booksRoutes);
router.use('/users', userRoutes );

module.exports = router;