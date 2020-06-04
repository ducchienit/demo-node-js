module.exports.created = function (req, res, next) {
    var errors = [];
    if(!req.body.name){
        errors.push("Name is requried");
    }
    if(!req.body.phone){
        errors.push("Phone is requried");
    }
    if(errors.length){
        res.render('users/create', {
            errors: errors,
            value: req.body 
        });
        return;
    }
    
    next();
};