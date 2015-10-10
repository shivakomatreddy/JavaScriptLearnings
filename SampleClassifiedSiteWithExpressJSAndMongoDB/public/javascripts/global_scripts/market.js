// Product list data array for filling in info box
var productListData = [];

$(document).ready(function(){

	populateTable('ALL');
   
	// View Everything btn click
	$('#btnViewAllProducts').on('click',function(){
		activateProductCatogary('#btnViewAllProducts');
		populateTable('ALL');
	});

	// View Fruits btn click
	$('#btnViewAllFruits').on('click',function(){
		activateProductCatogary('#btnViewAllFruits');
		populateTable('Fruit');
	});

	// View Vegetables btn click
	$('#btnViewAllVegetables').on('click',function(){
		activateProductCatogary('#btnViewAllVegetables');
		populateTable('Vegetable');
	});
    
    // View Vegetables btn click
	$('#btnViewAllMeats').on('click',function(){
		activateProductCatogary('#btnViewAllMeats');
		populateTable('Meat');
	});

});
// Functions ===============================================

function activateProductCatogary(activeButton) {
	$('.prodcutsCategoryMenu').children('li').removeClass('active');
	$(activeButton).addClass('active');
}

// Fill table with data 
function populateTable(type) {

	// Empty content string
	var tableContent = '';

	// Build Url Based on type
    var getUrl = '/market/productsList';
    if(type !== 'ALL'){
       getUrl += '/'+type;
    }
	// jQuery AJAX call for JSON
	$.getJSON(getUrl, function (data) {

		// Stick our user data array into a userlist variable in the global object
		productListData = data;
      	
      	// For each item in our JSON, add a div tag for a new product
        $.each(data,function(){
        	tableContent="";
        	
        });
      	$.each(data,function(){
      		tableContent ="";
			tableContent +='<div class="col-md-3 col-sm-6 hero-feature">';
			tableContent +='<div class="thumbnail">';
			tableContent +='<img src="/images/'+this.name+'.png" alt="">';
			tableContent +='<div class="caption">';
			tableContent +='<h3>'+this.name+'</h3>';
			tableContent +='<p id="farmerName">'+this.farmer+'</p>';
			tableContent +='<p>';
			tableContent +='<a href="##" class="btn btn-primary linkaddproducttocart" rel="'+ this.name+'">Add Cart!</a>';
			tableContent +='</p>';
			tableContent +='</div>';
			tableContent +='</div>';
			tableContent +='</div>';
			$('#productList').append(tableContent);
		});
		
		// Inject the whole content string into our existing HTML div
        
	});

}

// Show User Info
function showProductInfo(event) {

	// Prevent Link from Firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisProductName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = productListData.map(function(arrayItem) { 
		return arrayItem.name;
	}).indexOf(thisProductName);

	// Get our User Object 
	var thisProductObject = productListData[arrayPosition];

	// Populate Info Box
	$('#productInfoName').text(thisProductObject.name);
	$('#productInfoType').text(thisProductObject.type);
	$('#productInfoFarmer').text(thisProductObject.farmer);
	$('#productInfoPrice').text('$'+thisProductObject.price);
}


// Add Product To Basket
function addProductToBasket(event){

	console.log("adding product to basket");

	// Prevent Link from Firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisProductName = $(this).attr('rel');
    
    var productquantityClass = '.'+ thisProductName + 'productquantity';
    var thisProductQty = $(productquantityClass).val();

    if( thisProductQty <= 0){

    	alert('ERROR, the product quantity must be greater than 0');

	} else {
		// Clearing the quantity value
	    $(productquantityClass).val('1');


	    	// Get Index of object based on id value
		var arrayPosition = productListData.map(function(arrayItem) { 
			return arrayItem.name;
		}).indexOf(thisProductName);

		// Get our Product Object 
		var thisProductObject = productListData[arrayPosition];

		// Copying object over by creating a new obj to be added for the basket
	    var product = { name: thisProductObject.name, type: thisProductObject.type, farmer: thisProductObject.farmer, price: thisProductObject.price, qty: thisProductQty};

		$.ajax({
	            type: 'POST',
	            data: product,
	            url: '/basket/addProduct',
	            dataType: 'JSON'
	        }).done(function( response ) {
	            // Check for successful (blank) response
	            if (response.msg === '') {

	                alert("Add Product successful");
	            }
	            else {
	                // If something goes wrong, alert the error message that our service returned
	                alert('Error: ' + response.msg);
	            }
	    	});
	}

}






