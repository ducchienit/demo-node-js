var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(request, response){
    response.render("users/index", {
        users: db.get('users').value()
    });
}; 

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = function(request, response){
    console.log(request.cookies);
    response.render('users/create');
};

module.exports.view = function(request, response){
    var id = request.params.id;
    var user = db.get('users').find({ id: id }).value();
    response.render('users/view', {
        user: user
    });

};

module.exports.created = function (req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    db.get('users').push(req.body).write();
    res.redirect('/users');
};