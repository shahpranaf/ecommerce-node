const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');
const mongoConnect = require('./util/database').mongoConnect;

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Add User into express/node request so we can access everywhere */
app.use( (req, res, next) => {
    User.findById('5cd428eb1c9d440000746447').then( user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        console.log('app js', req.user)
        next();
    })
    .catch(console.log);
    
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect( () => {
    app.listen(3000);
})