$( document ).ready(function() {
	populateContent();
});


function populateContent(){

	var getUrl = '/cms/get/section3';
	$.getJSON(getUrl, function (data){

		$('#section-3').find('h3').text(data[0].title);
		$('#section-3').find('.sub-heading').text(data[0].title_tag_line);
		$('#section-3').find('#section-3-header').text(data[0].header);

		var sub_content_1 = "<span style='font-weight:bold;'>";
		sub_content_1 += data[0].first_sub_title;
		sub_content_1 += "</span></br>";
		sub_content_1 += data[0].first_sub_content;
		$('#section-3').find('#section3-sub-content-1').html(sub_content_1);

		var sub_content_2 = "<span style='font-weight:bold;'>";
		sub_content_2 += data[0].second_sub_title;
		sub_content_2 += "</span></br>";
		sub_content_2 += data[0].second_sub_content;
		$('#section-3').find('#section3-sub-content-2').html(sub_content_2);

	});

}