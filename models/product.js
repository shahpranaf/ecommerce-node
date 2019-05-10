const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Product {

  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null ;
    this.userId = userId;
  }

  save(){
    const db = getDb();
    let dbOp;
    if(this._id){
      dbOp = db.collection('products')
      .updateOne({ _id : new mongodb.ObjectId(this._id)}, { $set: this} );
    } 
    else {
      dbOp = db.collection('products').insertOne(this)
    }
   
    return dbOp
    .then( result => {
      console.log(result);
    })
    .catch(console.log);
  }

  static fetchAll() {
    const db = getDb();

    return db.collection('products')
    .find()
    .toArray()
    .then( products => {
      return products;
    })
    .catch(console.log);
  }

  static findById(prodId){
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then(product => {console.log(product)
      return product;
    })
    .catch(console.log);
  }

  static deleteById(prodId) {
    const db = getDb();

    return db.collection('products').deleteOne({ _id : new mongodb.ObjectId(prodId)})
    .then(() => {
      console.log("Deleted");
    })
    .catch(console.log);
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;