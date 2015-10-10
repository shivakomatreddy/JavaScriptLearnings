$( document ).ready(function() {	
	populateContentSlider();
	populateContentSection3();
	populateContentSection4();
	populateContentSection6();
	populateContactUsSection();
	populateFooterSection();
	populateTestimonials();
});

function populateContentSlider(){
	var getUrl = '/cms/get/section1';
	var content = "First Slide Testing";

	var sliderContent ="<div id='headline_cycler'>";
	sliderContent+="<ul class='flexslider'>";
	sliderContent+="<li class='slide first'>";
	sliderContent+="<h2>"+content+"</h2>";
	sliderContent+="<p>First-Tag-Line</p>";
	sliderContent+="</li>";

	sliderContent+="<li class='slide'>";
	sliderContent+="<h2>Second-Slide-Header</h2>";
	sliderContent+="<p>Second-Tag-Line</p>";
	sliderContent+="</li>";

	sliderContent+="<li class='slide'>";
	sliderContent+="<h2>Third-Slide-Header</h2>";
	sliderContent+="<p>Third-Tag-Line</p>";
	sliderContent+="</li>";
	
	sliderContent+="</ul>";
	sliderContent+="</div>";

	$('#section-1-slider').html(sliderContent);
}

function populateContentSection3() {	
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

function populateContentSection4 () {
	var getUrl = '/cms/get/section4';
	var content;
	$.getJSON(getUrl, function (data){

		var sectionTitle="<div class='col1-1'>";
		sectionTitle+="<h3>"+data[0].title+"</h3>";
		sectionTitle+="<div class='roman-number'>";
		sectionTitle+="<div class='lines'></div>";
		sectionTitle+="<span>iii</span></div>";
		sectionTitle+="</div>";
		sectionTitle+="<div class='col1-1'>";
		sectionTitle+="<p class='sub-heading'>"+data[0].title_tag_line+"</p>";
		sectionTitle+="</div>";

		var teamMembers="";
		var dataArrayLength =  data.length;
		for (var i = 0; i < dataArrayLength; i++) {
	    	
	    	var teamMember="<div class='col1-3'>";
			teamMember+="<div class='info_panel'>";
			teamMember+="<h4>"+data[i].member+"</h4>";
			teamMember+="<p>"+data[i].position+"</p><br>";
			teamMember+="</div></div>";			
			teamMembers +=teamMember;

		}
		var section4Content = sectionTitle + teamMembers;
		$('#section-4').html(section4Content);
	});
}

function populateTestimonials() {
	var getUrl = '/cms/get/testimonials';		
	$.getJSON(getUrl, function (data){		
		var dataArrayLength =  data.length;
		var testimonials="<div class='flex-viewport' style='overflow: hidden; position: relative;'>";
		testimonials+="<div class='flexslider clearfix'>";
		console.log('NumberOfTestimonials: '+dataArrayLength);
		for (var i = 0; i < dataArrayLength; i++){			
			testimonials+="<blockquote class='quote_slide'>";
			testimonials+="<p>My expectations were surpassed. We are so glad we booked Tim for our new project.</p>";
            testimonials+="<p><a href='#'>Shiva Inc.</a></p>";
            testimonials+="</blockquote>";
		}
		testimonials+="</div>";
		testimonials+="</div>";
		console.log(testimonials);
		//$('#quotes_slider_container').html(testimonials);
	});
}

function populateContentSection6() {
	var getUrl = '/cms/get/section6';
	$.getJSON(getUrl, function (data){
		var section6Content = "<div class='col1-1'><h3>"+ data[0].title+"</h3><div class='roman-number'>";
		section6Content+="<div class='lines'></div><span>iv</span></div></div>";
		section6Content+="<div class='col1-1'><p class='sub-heading'>"+data[0].title_tag_line+"</p></div>";
		section6Content+="<div class='col1-1 grey'>";
		section6Content+="<p>"+data[0].first_paragraph+"</p>";
		section6Content+="<p>"+data[0].second_paragraph+"</p>";
		section6Content+="<p>"+data[0].third_paragraph+"</p>";
		section6Content+="<p>"+data[0].fourth_paragraph+"</p></div>";
		$('#section-6').html(section6Content);
	});
	console.log('Section-6-ready');
}

function populateContactUsSection(){
	var getUrl = '/cms/get/contactUs';
	$.getJSON(getUrl, function (data){
		$('#where-section').html(data[0].where);

		var contactSectionContent="Email : ";
		contactSectionContent+="<a class='email_link' title='Email' href='mailto:"+data[0].email+"'>";
		contactSectionContent+=data[0].email;
		contactSectionContent+="</a><br>";
		contactSectionContent+="Phone : "+data[0].phone+"<br>";
		contactSectionContent+="Fax : "+data[0].fax+"</p>";

		$('#contact-info-section').html(contactSectionContent);		
		
	});
}

function populateFooterSection(){
	var getUrl = '/cms/get/footer';
	$.getJSON(getUrl, function (data){
		var currentYear = (new Date()).getFullYear();	
		var content="<p>";
		content+="<span id='copyright-section' class='alignleft small'>";
		content+="Copyright © ";
		content+=currentYear+" ";	
		content+=data[0].company_name+". All rights reserved. ";
		if(data[0].trademark == 1){
			content+="Designed & Developed by <a href='http://www.ankitdesigns.com'>Ankit Designs</a>.";
		}
		content+="</span>";
		content+="<span class='alignright small'>Visit Our </span></p>";
        $('#footer-section').html(content);

	});
}

