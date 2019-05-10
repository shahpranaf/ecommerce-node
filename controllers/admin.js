const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log("ddfdf", req.user)
  const product = new Product(title, price, description, imageUrl,null, req.user._id);
  product.save()
  // req.user
  //   .createProduct({
  //     title: title,
  //     imageUrl: imageUrl,
  //     price: price,
  //     description: description
  //   })
    .then( result => {
      console.log("Created Product");
      res.redirect('/admin/products');
    })
    .catch( err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  // req.user.getProducts({ where: {id: prodId} })
  Product.findById(prodId)
  .then( product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(console.log);
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
      updatedTitle,
      updatedPrice,
      updatedDesc, 
      updatedImageUrl, 
      prodId
  );
 
  product.save()
  // .then( product => {
  //   product.title = updatedTitle;
  //   product.price = updatedPrice;
  //   product.imageUrl = updatedImageUrl;
  //   product.description = updatedDesc;
  //   return product.save();
  // })
  .then( result => {
    res.redirect('/admin/products');
  })
  .catch(console.log);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  // req.user.getProducts()
  .then( products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(console.log);
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("ayay", req.body);
  Product.deleteById(prodId)
  // .then( product => product.())
  .then( result => {
    res.redirect('/admin/products');
  })
  .catch(console.log);
};
