var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        
        db.get('sessions').push({
            id: sessionId
        }).write();
    }
    
    var cart = db.get("sessions").find({ id: req.signedCookies.sessionId }).get("cart").value();
    var sessionId = db.get("sessions").find({ id: req.signedCookies.sessionId }).value();
    if(sessionId){
        if(cart){
            var cartCount = Object.values(cart).reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0);
        }
    }
    res.locals.cartCount = cartCount;
    next();
};