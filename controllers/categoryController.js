const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.json({ category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

