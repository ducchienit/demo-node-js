var md5 = require('md5');

var db = require('../db');


module.exports.login = function(request, response){
    response.render("auth/login",{
        csrfToken: request.csrfToken() 
    });
}; 

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email: email}).value();
    var hashedPassword = md5(password);
    if(!user){
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            value: req.body
        });
        return;
    }
    if(user.password !== hashedPassword){
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            value: req.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });

    res.redirect('/users');
};
