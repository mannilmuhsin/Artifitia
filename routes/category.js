
const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;