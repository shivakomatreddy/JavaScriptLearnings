var express = require('express');
var util = express.Router();
var fs = require('fs');

util.get('/get/images',function(req,res) {		
	fs.readdir('C:/Users/SHiVA/Desktop/Projects/truck_template/public/images/icons',function(err,files){
	   res.json(JSON.stringify(files));		
	});	
});

module.exports = util;