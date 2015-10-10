$( document ).ready(function() {
	
	populateContent();
	console.log("ready");

});


function populateContent(){
	// jQuery AJAX call for JSON
	var getUrl = '/cms/get/section1';
	$.getJSON(getUrl, function (data) {

        // var firstSlide  = "<li class='slide first'>";
        // 	firstSlide += "<h2>"+data[0].first_slide_title+"</h2>";
        // 	firstSlide += "<p>"+data[0].first_slide_tag_line+"</p>";
        // 	firstSlide += "</li>";
		
        // var secondSlide  = "<li class='slide'>";
        // 	secondSlide += "<h2>"+data[1].second_slide_title+"</h2>"; 
        //     secondSlide += "<p>"+data[1].second_slide_tag_line+"</p>";
        // 	secondSlide += "</li>";

        // var thridSlide  = "<li class='slide'>";
        // 	thridSlide += "<h2>"+data[2].third_slide_title+"</h2>";
        // 	thirdSlide += "<p>"+data[2].third_slide_tag_line+"</p>";
        // 	thirdSlide += "</li>";
		


		var data_element  = data[2].third_slide_title;
		console.log(element);




		// $('#first_title').text(data[0].first_slide_title);
		// $('#first_tag').text(data[0].first_slide_tag_line);

		// $('#second_title').text(data[1].second_slide_title);
		// $('#second_tag').text(data[1].second_slide_tag_line);

		// $('#third_title').text(data[2].third_slide_title);
		// $('#third_tag').text(data[2].third_slide_tag_line);
	});
}