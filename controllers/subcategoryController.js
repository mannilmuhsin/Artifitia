const Subcategory = require('../models/Subcategory');

exports.createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();
    res.json({ subcategory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.json({ subcategories });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
