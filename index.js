require('dotenv').config();


var express = require('express');
var userRoute = require('./routes/user.route');
var authRote = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var cookieParser = require('cookie-parser');
var transferRoute = require('./routes/transfer.route');
var csurf = require('csurf');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = process.env.PORT || 3000; 

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use(csurf({ cookie: true }));

app.use(express.static('public'));

app.get('/', function(request, response){
    response.render("index",{
        name: "Duc Chien IT"
    });
});

app.use('/auth', authRote);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer',authMiddleware.requireAuth, transferRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);

});
