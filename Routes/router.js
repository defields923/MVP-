var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );


router.get('/', (req, res, next) => {
	res.render('Starter', {title:"Super App"});
});


module.exports = router;
