$(document).ready(function(){
	$('#btnGoToInventory').on('click', function(){routeTo('/view/inventory');});
	$('#btnGoToMarket').on('click', function(){routeTo('/view/market');});
	$('#btnGoToBasket').on('click', function(){routeTo('/view/basket');});
});

function routeTo(address){window.location = address;}