const Product = require('../models/Product');
const sharp = require('sharp');
const path = require('path');

exports.createProduct = async (req, res) => {
  try {
    const { name, code, brand, partNumber, subcategoryId } = req.body;
    let imageUrl = '';

    if (req.file) {
      const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      const processedImage = await sharp(req.file.buffer)
        .resize(800, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer();
      await sharp(processedImage).toFile(imagePath);
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const product = new Product({
      name,
      code,
      brand,
      partNumber,
      subcategory: subcategoryId,
      image: imageUrl,
    });
    await product.save();
    res.json({ product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
  
      const products = await Product.find()
        .populate('subcategory', 'name')
        .skip(skip)
        .limit(limit);
  
      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / limit);
  
      res.json({
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('subcategory', 'name');
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.json({ product });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.updateProduct = async (req, res) => {
    try {
      const { name, code, brand, partNumber, subcategoryId } = req.body;
      let imageUrl = '';
  
      if (req.file) {
        const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        const processedImage = await sharp(req.file.buffer)
          .resize(800, 600)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();
        await sharp(processedImage).toFile(imagePath);
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
  
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          code,
          brand,
          partNumber,
          subcategory: subcategoryId,
          image: imageUrl || product.image,
        },
        { new: true }
      ).populate('subcategory', 'name');
  
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.json({ product });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.json({ msg: 'Product removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.searchProducts = async (req, res) => {
    try {
      const { query } = req.params;
      const products = await Product.find({
        name: { $regex: query, $options: 'i' },
      }).populate('subcategory', 'name');
      res.json({ products });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.filterProducts = async (req, res) => {
    try {
      const { subcategoryId } = req.params;
      const products = await Product.find({ subcategory: subcategoryId }).populate(
        'subcategory',
        'name'
      );
      res.json({ products });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };