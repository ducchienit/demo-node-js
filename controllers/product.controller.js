var db = require('../db');

module.exports.index = function(request, response){
    var total = db.get('products').size().value();
    var page = parseInt(request.query.page) || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    var n = 1;
    response.render("products/index", {
        products: db.get('products').value().slice(start, end),
        current: page,
        n: n,
        pages: Math.ceil(total/perPage)
    });
}; 

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('products').value().filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('products/index', {
        products: matchedUsers
    });
    return;
};

module.exports.view = function(request, response){
    var id = request.params.id;
    var product = db.get('products').find({ id: id }).value();
    response.render('products/view', {
        product: product
    });

};
