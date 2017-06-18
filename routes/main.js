var router = require('express').Router();
var User = require('../models/user');
var Product = require('../models/product');

Product.createMapping(function(err, mapping) {
  if (err) {
    console.log('error creating mapping');
    console.log(err);
  } else {
    console.log('mapping created');
    console.log(mapping);
  }
});

var stream = Product.synchronize();
var count = 0;

stream.on('data', function() {
  count++;
});

stream.on('close', function() {
  console.log("Indexed " + count + " documents");
});

stream.on('error', function(err) {
  console.log(err);
});


router.get('/', function(req, res) {
  res.render('main/home');
});

router.get('/about', function(req, res){
  res.render('main/about');
});



router.get('/products/:id', function(req, res, next) {
  Product
  .find({ category: req.params.id })
  .populate('category')
  .exec(function(err, products) {
    if (err) return next(err);
    res.render('main/category', {
      products: products
    });
  });
});

router.get('/product/:id', function(req, res, next) {
  Product.findById({_id: req.params.id }, function(err, product) {
    if (err) return next(err);
    res.render('main/product', {
      product: product
    });
  });
});

module.exports = router;
