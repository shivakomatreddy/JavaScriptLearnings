$( document ).ready(function() {	
	populateSection1();
	populateSection3();
	populateSection4();
	populateSection6();
	populateFooter();
	populateContactUs();
	populateTestimonials();

	$('#saveFormSection1').on('click', updateSection1Content);		
	$('#saveFormSection3').on('click', updateSection3Content);

	$('#saveFormSection4').on('click', updateSection4Content);
	$('#modifyFormSection4').on('click', modifySection4Form);
	$('#clearFormSection4').on('click', clearSection4Form);

	$('#saveFormSection6').on('click', updateSection6Content);	
	$('#saveFormContactUs').on('click', updateContactUsContent);
	$('#saveFormFooter').on('click', updateFooter);
	

	$('#modifyFormTesimonials').on('click', modifyTestimonialForm);
	$('#saveFormTestimonials').on('click', updateTestimonials);	
	$('#clearFormTestimonials').on('click', clearTestimonials);

	$('#modifyFormSection3Services').on('click', modifySection3ServiceForm);
	populateImages();

});

function populateImages(){
	var getUrl = '/util/get/images';
	$.getJSON(getUrl, function (data){
		var filenames = new Array();
		for (var i = 0; i < data.length; i++) { filenames.push(data[i]);  }
		var imageFileNames = filenames.join("").split(",");
		for (var i = 0; i < imageFileNames.length; i++) { 
			console.log(imageFileNames[i]+"\n");  
		}
	});
}


function modifySection3ServiceForm(event){
	event.preventDefault();
}

function populateSection1(){
	
}

function updateSection1Content(event){
	event.preventDefault();
	var content = { 
		first_slide_title : $('#section-first-slide-title').val(),
		first_slide_tag_line : $('#section-first-slide-subtext').val(),
		second_slide_title : $('#section-second-slide-title').val(),
		second_slide_tag_line : $('#section-second-slide-subtext').val(),
		third_slide_title : $('#section-third-slide-title').val(),
		third_slide_tag_line : $('#section-third-slide-subtext').val()
	}
	console.log(JSON.stringify(content));
}

function populateSection3(){
	var getUrl = '/cms/get/section3';
	$.getJSON(getUrl, function (data){
		$('#section-title').text(data[0].title);
		$('#section-title-tag-line').text(data[0].title_tag_line);
		$('#section-header').text(data[0].header);
		$('#section-first-sub-title').text(data[0].first_sub_title);
		$('#section-first-sub-content').text(data[0].first_sub_content);
		$('#section-second-sub-title').text(data[0].second_sub_title);
		$('#section-second-sub-content').text(data[0].second_sub_content);	
	});
}

function updateSection3Content (event) {	
	event.preventDefault();
	var content = {
		title: $('#section-title').val(),
		title_tag_line: $('#section-title-tag-line').val(),
		header: $('#section-header').val(),
		first_sub_title: $('#section-first-sub-title').val(),
		first_sub_content: $('#section-first-sub-content').val(),
		second_sub_title: $('#section-second-sub-title').val(),
		second_sub_content: $('#section-second-sub-content').val()
	}
	$.ajax({type: 'PUT',data: content,url: '/cms/set/section3',dataType: 'JSON'}).done(function( response ){
			if (response.msg === ''){ 
				populateSection3();
				alert("scuccessfully updated !!");
			}
			else { alert('Error: ' + response.msg); }
	});
}

function populateSection4(){	
	var getUrl = '/cms/get/section4';
	$('#team-members-form li:not(:first):not(:last)').remove();		
	$.getJSON(getUrl, function (data){
		var content = "";		
		var dataArrayLength =  data.length;
		for (var i = 0; i < dataArrayLength; i++) {		    
			var counter = i + 2;
			var teamNumber = i +1;
			var name = data[i].member;			
			var position = data[i].position;			
			content+="<li id='li_"+counter+"'>";
			content+="<label for='element_"+counter+"' class='description'>Memeber Name & role-"+teamNumber+" </label>";
			content+="<div>";
			content+="<input id='element_"+counter+"' name='element_"+counter+"' type='text' maxlength='255'"+"value='"+name+"'"+"class='element text medium'/>";
			content+="</div>";
			content+="<p id='guide_"+counter+"' class='guidelines'><small>Memeber's name and role in the company</small></p>";
			content+="<input id='element_"+counter+"' name='element_"+counter+"' type='text' maxlength='255'"+"value='"+position+"'"+"class='element text medium'/>";
			content+="</li>";			
		}
		$('.dropDown').after(content);		
	});	
}

function clearSection4Form(event){
	event.preventDefault();
	populateSection4();
	$('#team-members-form li:first select').each(function() { this.selectedIndex = 0 });
}

function modifySection4Form(event){
	event.preventDefault();
	var currentNumberOfTeamMembers = $('#team-members-form > li:not(:first):not(:last)').length;
	var numberOfTeamMembers = parseInt($('#numberOfTeamMembers').val(),10);
	var content = "";
	var totalTeamMembers = currentNumberOfTeamMembers + numberOfTeamMembers;	
	if(totalTeamMembers <= 8){	
		for (var i = 1; i <= numberOfTeamMembers; i++) {	
			var counter = i + 1;
			var teamNumber = currentNumberOfTeamMembers + i;			
			content+="<li id='li_"+counter+"'>";
			content+="<label for='element_"+counter+"' class='description'>Memeber Name & role-"+teamNumber+" </label>";
			content+="<div>";
			content+="<input id='element_"+counter+"' class='name' name='element_"+counter+"' type='text' maxlength='255' value='' class='element text medium'/>";
			content+="</div>";
			content+="<p id='guide_"+counter+"' class='guidelines'><small>Name of the member</small></p>";
			content+="<input id='element_"+counter+"' class='role' name='element_"+counter+"' type='text' maxlength='255' value='' class='element text medium'/>";
			content+="</li>";	        
		}	
		$('#team-members-form li:last').before(content);
	}
	else{
		alert("Error: The total number of members exceeded !!");
	}	
}

function updateSection4Content(event){
	event.preventDefault();
	var members = new Array();
	$('#team-members-form li:not(:first):not(:last)').each(function( index ) {
	   var name = $(this).find('input.name').val();
	   var role = $(this).find('input.role').val();	    	   
	   members.push([name,role]);
	   console.log("["+name+","+role+"]");
	});		
	var membersJSON = new Array();
	for (var i in members) {
	  var name = members[i][0];
	  var position = members[i][1];	  
	  membersJSON.push({"member": name,"position":position});
	}
	var content = JSON.parse(JSON.stringify(membersJSON));	
	$.ajax({type: 'PUT',data: {info:content},url: '/cms/set/section4',dataType: 'JSON'}).done(function( response ){
		if (response.msg === ''){ populateSection4(); alert("scuccessfully updated !!"); }
		else { alert('Error: ' + response.msg); }
	});		
}

function populateTestimonials(){	
	var getUrl = '/cms/get/testimonials';
	$('#testimonials li:not(:first):not(:nth-last-child(2)):not(:last)').remove();		
	$.getJSON(getUrl, function (data){
		var content = "";		
		var dataArrayLength =  data.length;
		console.log("Number of testimonials: "+dataArrayLength);
		for (var i = 0; i < dataArrayLength; i++) {		    
			var counter = i + 2;		
			var testimonialNumber = i +1;
			var name = data[i].name;			
			var testimonial = data[i].testimonial;
			console.log("testimonial: "+testimonial);
			content+="<li id='li_"+counter+"'>";
			content+="<label for='element_"+counter+"' class='description'>Name of the Testimonial-"+testimonialNumber+" </label>";
			content+="<div>";
			content+="<input id='element_"+counter+"' class='name' name='element_"+counter+"' type='text' maxlength='255' value='"+name+"' class='element text medium'/>";
			content+="</div>";
			content+="<p id='guide_"+counter+"' class='guidelines'><small>Add the name of the testimonial</small></p>";
			content+="<label for='element_"+counter+"' class='description'>Testimonial </label>";
			content+="<div>";
			content+="<textarea id='element_"+counter+"' class='testimonial' name='element_"+counter+"' type='text' maxlength='255' value='' class='element textarea medium'>"+testimonial+"</textarea>";
			content+="</div>";
			content+="<p id='guide_"+counter+"' class='guidelines'><small>Keep it to 3 to 4 lines at maximum.</small></p>";
			content+="</li>";				        		
		}
		$('#testimonials li:first').after(content);
		$('#testimonials li:first select').each(function() { this.selectedIndex = 0 });	
	});	
}

function clearTestimonials(event){
	event.preventDefault();
	populateTestimonials();	
}


function updateTestimonials(event){
	event.preventDefault();
	var testimonials = new Array();
	$('#testimonials li:not(:first):not(:nth-last-child(2)):not(:last)').each(function( index ) {
		var name = $(this).find('input.name').val();
		var testimonial = $(this).find('textarea.testimonial').val();
		testimonials.push([name,testimonial]);
		console.log("["+name+","+testimonial+"]");
	});
	var testimonialsJSON = new Array();
	for (var i in testimonials) {
		var name = testimonials[i][0];
		var testimonial = testimonials[i][1];
		testimonialsJSON.push({"name":name,"testimonial":testimonial});
	}
	var content = JSON.parse(JSON.stringify(testimonialsJSON));
	$.ajax({type: 'PUT',data: {info:content},url: '/cms/set/testimonials',dataType: 'JSON'}).done(function( response ){
		if (response.msg === ''){
			populateTestimonials();
			alert("scuccessfully updated !!"); 
		}
		else { alert('Error: ' + response.msg); }
	});
}

function modifyTestimonialForm(event){
	event.preventDefault();
	var currentNumberOfTestimonials = $('#testimonials > li:not(:first):not(:nth-last-child(2)):not(:last)').length;
	console.log('currentNumberOfTestimonials: '+currentNumberOfTestimonials);	
	var numberOfTestimonials = parseInt($('#numberOfTestimonials').val(),10);
	var totalTestimonials = currentNumberOfTestimonials + numberOfTestimonials;		
	if(totalTestimonials <= 5){
		var content="";
		for (var i = 1; i <= numberOfTestimonials; i++) {	
				var counter = i + 1;
				var testimonialNumber = currentNumberOfTestimonials + i;
				content+="<li id='li_"+counter+"'>";
				content+="<label for='element_"+counter+"' class='description'>Name of the Testimonial- "+testimonialNumber+" </label>";
				content+="<div>";
				content+="<input id='element_"+counter+"' class='name' name='element_"+counter+"' type='text' maxlength='255' value='' class='element text medium'/>";
				content+="</div>";
				content+="<p id='guide_"+counter+"' class='guidelines'><small>Add the name of the testimonial</small></p>";
				content+="<label for='element_"+counter+"' class='description'>Testimonial </label>";
				content+="<div>";
				content+="<textarea id='element_"+counter+"' class='testimonial' name='element_"+counter+"' type='text' maxlength='255' value='' class='element textarea medium'/>";
				content+="</div>";
				content+="<p id='guide_"+counter+"' class='guidelines'><small>Keep it to 3 to 4 lines at maximum.</small></p>";
				content+="</li>";	        
		}	
		$('#testimonials li:nth-last-child(2)').before(content);
		$('#testimonials li:first select').each(function() { this.selectedIndex = 0 });
	}
	else {
		alert("Error: The total number of testimonials exceeded !!");
	}
}

function populateSection6(){
	var getUrl = '/cms/get/section6';
	$.getJSON(getUrl, function (data){
		$('#section-6-title').text(data[0].title);
		$('#section-6-title-tag-line').text(data[0].title_tag_line);
		$('#section-6-p1').text(data[0].first_paragraph);
		$('#section-6-p2').text(data[0].second_paragraph);
		$('#section-6-p3').text(data[0].third_paragraph);
		$('#section-6-p4').text(data[0].fourth_paragraph);		
	});
}

function updateSection6Content (event) {	
	event.preventDefault();
	var content = {
		title: $('#section-6-title').val(),
		title_tag_line: $('#section-6-title-tag-line').val(),
		first_paragraph: $('#section-6-p1').val(),
		second_paragraph: $('#section-6-p2').val(),
		third_paragraph: $('#section-6-p3').val(),
		fourth_paragraph: $('#section-6-p4').val()		
	}
	console.log(JSON.stringify(content));

	$.ajax({type: 'PUT',data: content,url: '/cms/set/section6',dataType: 'JSON'}).done(function( response ){
			if (response.msg === ''){ 
				populateSection6();
				alert("scuccessfully updated !!");
			}
			else { alert('Error: ' + response.msg); }
	});
}

function populateContactUs(){
	var getUrl = '/cms/get/contactUs';
	$.getJSON(getUrl, function (data){		
		$('#where').text(data[0].where);		
		$('#email').val(data[0].email);
		$('#phone').val(data[0].phone);
		$('#fax').val(data[0].fax);
	});
}

function updateContactUsContent (event) {	
	event.preventDefault();
	var content = {
		where: $('#where').val(),
		email: $('#email').val(),
		phone: $('#phone').val(),
		fax: $('#fax').val()				
	}
	console.log(JSON.stringify(content));

	$.ajax({type: 'PUT',data: content,url: '/cms/set/contactUs',dataType: 'JSON'}).done(function( response ){
			if (response.msg === ''){ 
				populateContactUs();
				alert("scuccessfully updated !!");
			}
			else { alert('Error: ' + response.msg); }
	});
}

function populateFooter(){
	var getUrl = '/cms/get/footer';
	$.getJSON(getUrl, function (data){		
		$('#company-name').val(data[0].company_name);
		if(data[0].trademark == 1){
			$('#trademark').attr('checked',true);
		}
		else{
			$('#trademark').attr('checked',false);
		}
				
	});
}

function updateFooter (event) {	
	event.preventDefault();
	var trademarkFeatureStatus;
	if($('#trademark').is( ":checked" )){ trademarkFeatureStatus = 1; } else{ trademarkFeatureStatus = 0; }
	var content = {
		company_name: $('#company-name').val(),
		trademark:trademarkFeatureStatus				
	}
	$.ajax({type: 'PUT',data: content,url: '/cms/set/footer',dataType: 'JSON'}).done(function( response ){
			if (response.msg === ''){ 
				populateFooter();
				alert("scuccessfully updated !!");
			}
			else { alert('Error: ' + response.msg); }
	});
}