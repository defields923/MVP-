var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var CharController = require( '../CharController.js' );

router.get('/', (req, res, next) => {
	res.render('Starter', {title: "FEA"});
});

router.get('/retrieve/chars', CharController.getChars);


module.exports = router;
