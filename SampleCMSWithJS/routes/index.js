var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) { res.render('main'); });
router.get('/build/header', function(req, res) { res.render('header'); });
router.get('/build/section1', function(req, res) { res.render('section-1'); });
router.get('/build/section3', function(req, res) { res.render('section-3'); });
router.get('/build/section3Services', function(req, res) { res.render('section-3-services'); });
router.get('/build/section4', function(req, res) { res.render('section-4'); });
router.get('/build/section6', function(req, res) { res.render('section-6'); });
router.get('/build/testimonials', function(req, res) { res.render('testimonials'); });
router.get('/build/contactUs', function(req, res) { res.render('contactUs'); });
router.get('/build/footer', function(req, res) { res.render('footer'); });

module.exports = router;
