const mongodb = require('mongodb');
const getdb = require('../util/database').getDb;
class User {
    constructor( username, email, cart, id ){
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getdb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        let newQuantity = 1;
        const cartProductIndex = this.cart.items.findIndex( cp => {
            return cp.productId.toString() === product._id.toString();
        })

        const updatedCartItems = [...this.cart.items];
        const db = getdb();


        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id)},
            { $set: { cart : updatedCart } }
        );
    }

    getCart() {
        const db = getdb();
        const productIds = this.cart.items.map( i => i.productId);
        return db.collection('products').find({_id: { $in: productIds}})
        .toArray()
        .then( products => {
            return products.map( p => {  
                return { ...p, quantity: this.cart.items.find( i => {
                    return i.productId.toString() === p._id.toString();
                }).quantity};
            })
        })
        .catch(console.error);
    }

    deleteItemFromCart(productId) {
        const db = getdb();
        
        const updatedCartItems = this.cart.items.filter( item => {
            return item.productId.toString() !== productId.toString();
        });

        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id)},
            { $set: { cart : { items: updatedCartItems } } }
        );
    }

    static findById(userId) {
        const db = getdb();

        return db.collection('users')
            .findOne({_id: new mongodb.ObjectId(userId)})
            .then(user => user)
            .catch(console.log);

    }

    addOrder() {
        const db = getdb();

        return this.getCart()
            .then( products => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id)
                    }
                }

                return db.collection('orders').insertOne(order);
            })
            .then( result => {
                this.cart = { items : [] };

                return db.collection('users')
                    .updateOne({ _id: new mongodb.ObjectId(this._id)},
                        { $set: { cart : { items: [] } } }
                    );
            })
    }

    getOrders() {
        const db = getdb();
        return db.collection('orders')
        .find({'user._id': new mongodb.ObjectId(this._id)})
        .toArray()
        .then( orders => orders)
        .catch(console.error);
    }
}

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING
// })

module.exports = User;