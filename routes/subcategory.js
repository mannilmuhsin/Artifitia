const router = require('express').Router();
const subcategoryController = require('../controllers/subcategoryController');
const auth = require('../middleware/auth');

router.post('/', auth, subcategoryController.createSubcategory);
router.get('/', subcategoryController.getSubcategories);

module.exports = router;