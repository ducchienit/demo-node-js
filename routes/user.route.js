var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');
var upload = multer({ dest: './public/images/' });

var router = express.Router();

router.get('/', controller.index);  

router.get('/cookie', function(req, res, next){
    res.cookie('user-id', 12345);
    res.send('Cookie');
}); 

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.post('/create', 
upload.single('avatar'), 
validate.created, 
controller.created
);

module.exports = router;