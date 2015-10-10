$(document).ready(function(){

	alert("Document is ready");
    
	var sampleObj = { "_id" : ObjectId("5445d040d44706e9b9c4998d"), "name" : "Lamb", "type" : "Meat", "farmer" : "Montreal", "price" : "20" };

	//JSON.stringify(sampleObj);
	alert("Hello World");

    // $.ajax({
    //         type: 'POST',
    //         data: thisProductObject,
    //         url: '/basket/deleteProduct',
    //         dataType: 'JSON'
    //     }).done(function( response ) {
    //         // Check for successful (blank) response
    //         if (response.msg === '') {
    //             alert("Add Product successful");
    //         }
    //         else {
    //             // If something goes wrong, alert the error message that our service returned
    //             alert('Error: ' + response.msg);
    //         }
    // 	});
});