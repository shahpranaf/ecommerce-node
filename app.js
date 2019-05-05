const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

// set engine as handlebars. its not built in node like pug.
app.engine('hbs', expressHbs({ /* Provide directory of layouts */
    layoutsDir : 'views/layouts/',
    defaultLayout : 'main-layout',
    extname: 'hbs'
}));  // 1st arg is extension. set hbs or handlebars and create file with that extension. eg: 404.hbs
app.set('view engine', 'hbs'); // set view engine to handlebars
app.set('views', 'views'); // set view folder path. default is {project root}/view

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);