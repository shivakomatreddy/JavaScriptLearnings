jQuery(document).ready(function(){
"use strict";
	$('#contactform').submit(function(){
		
		//alert($('#ispalletized').is(':checked'));
		var action = $(this).attr('action');

		$("#message").fadeOut(0,function() {
		$('#message').hide();

 		$('#submit')
			.attr('disabled','disabled');

		$.post(action, {
			contactname: $('#contactname').val(),
			email: $('#email').val(),
			company: $('#company').val(),
			address: $('#address').val(),
			commodity: $('#commodity').val(),
			city: $('#city').val(),
			state: $('#state').val(),
			zipcode: $('#zipcode').val(),
			telephone: $('#telephone').val(),
			fax: $('#fax').val(),
			weightperload: $('#weightperload').val(),
			kglb: $('input[name=kglb]:checked', '#contactform').val(),
			ispalletized: $('#ispalletized').is(':checked'),
			dangerousgoods: $('#dangerousgoods').is(':checked'),
			servicetype: $('#servicetype').val(),
			equipment: $('#equipment').val(),
			loadingtime: $('#loadingtime').val(),
			unloadingtime: $('#unloadingtime').val(),
			spottrailer: $('#spottrailer').is(':checked'),			
			spottrucktime: $('#spottrucktime').val(),
			canadianfunds: $('#canadianfunds').val(),
			uscanadianfunds: $('#uscanadianfunds').is(':checked'),
			comments: $('#comments').val(),
			from1: $('#from1').val(),
			to1: $('#to1').val(),
			load1: $('#load1').val(),
			from2: $('#from2').val(),
			to2: $('#to2').val(),
			load2: $('#load2').val(),	
			from3: $('#from3').val(),
			to3: $('#to3').val(),
			load3: $('#load3').val(),			
			from4: $('#from4').val(),
			to4: $('#to4').val(),
			load4: $('#load4').val(),
			from5: $('#from5').val(),
			to5: $('#to5').val(),
			load5: $('#load5').val(),		
//			phone: $('#phone').val(),
			
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').fadeIn(200);
				$('.hide').hide(0);
				$('#submit').removeAttr('disabled');
//				if(data.match('success') != null) $('#contactform').fadeOut('slow');

			}
		);

		});

		return false;

	});

});