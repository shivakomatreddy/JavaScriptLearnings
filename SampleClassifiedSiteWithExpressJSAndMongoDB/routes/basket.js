var express = require('express');
var router = express.Router();


// Get Current Basket Products From basket's List
router.get('/productsList',function(req,res) {
    var db = req.db;
    var productType = req.params.type;
    
    db.collection('basket').find().toArray(function (err,items) {
        res.json(items);
    });
});

// Get Products By Type
router.get('/productsList/:type',function(req,res){
  var db = req.db;
  var productType = req.params.type;
  db.collection('basket').find({type:productType}).toArray(function (err,items){
    res.json(items);
  });
});

// Add Product To Basket
router.post('/addProduct',function(req,res) {
    var db = req.db;
    var productName = req.params.name;
    db.collection('basket').insert(req.body,function(err,result){
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
});

router.delete('/deleteProduct/:id',function(req,res){
  var db = req.db;
  var productToDelete = req.params.id;
  db.collection('basket').removeById(productToDelete,function(err,result) {
    res.send((result === 1) ? { msg: '' } : { msg: 'error:' + err });
  });
});

module.exports = router;