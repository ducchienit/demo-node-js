var express = require('express');
var userRoute = require('./routes/user.route');
var authRote = require('./routes/auth.route');
var cookieParser = require('cookie-parser');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000; 

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("fdffffds13123"));

app.use(express.static('public'));

app.get('/', function(request, response){
    response.render("index",{
        name: "Duc Chien IT"
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRote);

app.listen(port, function() {
    console.log('Server listening on port ' + port);

});


