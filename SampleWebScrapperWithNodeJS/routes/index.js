var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/goodeggs/scraper',function(req,res) {
  //url = 'https://www.goodeggs.com/nola/dairy';
  url = 'https://www.goodeggs.com/nola/bundles';
  var totalProductsScrapped = 0;

  request(url,function(error,response,html) {
    if(!error){
        var $ = cheerio.load(html);
        var title, farmer, price, image;

        var json = {title: "", farmer: "", price: "",image: ""};
        fs.writeFile('output.csv','title,farmer,price,image_url\n');
        fs.writeFile('output.json','');

        $('.products-page').filter(function(){
          var data = $(this);

          var sections = data.children();
          var sections_size = sections.length - 1;
          
           
          for(var x=0;x<sections_size;x++){
              var each_section = $(sections[x]);
              var page = each_section.find('.page');
              var grid_items = page.children().first().children();
              var grid_items_size = grid_items.length;
              
              for(var i=0;i<grid_items_size;i++){
                var grid_item = $(grid_items[i]);
                title = grid_item.find('.product-tile__product-name > a').text();
                farmer = grid_item.find('.product-tile__producer-name').text();
              
                var dollars = grid_item.find('.product-tile__purchase-price').find('.dollars').text();
                var cents = grid_item.find('.product-tile__purchase-price').find('.cents').text();
                price = "$" + dollars + "." + cents;

                image = "https:" + grid_item.find('.product-tile__product-photo').attr('src');
                
                //clean up for any commas
                title = title.replace(/,/g,'');
                farmer = farmer.replace(/,/g,'');

                title = title.replace(/-/g,'');
                farmer = farmer.replace(/-/g,'');

                title = title.replace(/\//g,'');
                farmer = farmer.replace(/\//g,'');

                request(image).pipe(fs.createWriteStream(title+'.png'),function(err){
                      console.log(err);
                });

                totalProductsScrapped = totalProductsScrapped + 1;

                console.log(totalProductsScrapped);

                json.title = title;
                json.farmer = farmer;
                json.price = price;
                json.image = image;

                var seperator = '';
                if(i > 0){
                  seperator = ',\n';
                }
                
                var row = (title+','+farmer+','+price+','+image+'\n');

                fs.appendFile('output.csv',row);
                fs.appendFile('output.json',seperator + JSON.stringify(json,null,4));
                
              }
          }


        });
    }
    else
    {
        console.log(error);
    }

  });

  res.render('index',{ title: 'Good Eggs Web scraper: Total Products Scrapped' + totalProductsScrapped });


});

router.get('/imdb/scraper',function(req,res) {
  
  url = 'http://www.imdb.com/title/tt1229340/';
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
  request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);
            // Finally, we'll define the variables we're going to capture
			       var title, release, rating;
			       var json = { title : "", release : "", rating : ""};

             $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                release = data.children().last().children().text();


                json.title = title;
                json.release = release;
             });

             $('.star-box-giga-star').filter(function(){
                var data = $(this);
                rating = data.text();

                json.rating = rating;
             });
        }

        fs.writeFile('output.json',JSON.stringify(json,null,4),function(err) {
            if(!err){
              console.log('file successfully written');
            }
            else {
              console.log(err);
            }
            
        });
  });
  res.render('index', { title: 'Imdb Web Scrapper' });


});

module.exports = router;
