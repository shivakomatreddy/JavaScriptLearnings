<?php
//include ("MailHandler.php");
if(!$_POST) exit;//

function tommus_email_validate($email) { return filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match('/@.+\./', $email); }

$contactname = $_POST['contactname']; 
$company = $_POST['company']; 
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$telephone = $_POST['telephone'];
$fax = $_POST['fax'];
$email = $_POST['email'];
$commodity = $_POST['commodity'];
if($commodity=="Commodity"){
	$commodity = "Not Entered";
}

$weightperload = $_POST['weightperload'];
if($weightperload=="Weight Per Load"){
	$weightperload = "Not Entered";
}

$kglb = $_POST['kglb'];


$ispalletized = $_POST['ispalletized'];
$dangerousgoods = $_POST['dangerousgoods'];

$servicetype = $_POST['servicetype'];
if($servicetype=="-- Service Type --"){
	$servicetype = "Not Entered";
}

$equipment = $_POST['equipment'];
if($equipment=="-- Equipment --"){
	$equipment = "Not Entered";
}

$loadingtime = $_POST['loadingtime'];
if($loadingtime=="Loading Time (Hrs)"){
	$loadingtime = "Not Entered";
}

$unloadingtime = $_POST['unloadingtime'];
if($unloadingtime=="UnLoading Time (Hrs)"){
	$unloadingtime = "Not Entered";
}

$spottrailer = $_POST['spottrailer'];
$spottrucktime = $_POST['spottrucktime'];
if($spottrucktime=="If you would like to spot the trailer, Please Specify time frame:Days"){
	$spottrucktime = "Not Selected";
}

$canadianfunds = $_POST['canadianfunds'];
if($canadianfunds=="Please provide this in Canadian funds"){
	$canadianfunds = "Not Selected";
}

$uscanadianfunds = $_POST['uscanadianfunds'];
if($uscanadianfunds=="Please indicate how you would like us to send your quote."){
	$uscanadianfunds = "Not Selected";
}
$comments = $_POST['comments'];

$from1 = $_POST['from1'];
$to1 = $_POST['to1'];
$load1 = $_POST['load1'];

$from2 = $_POST['from2'];
$to2 = $_POST['to2'];
$load2 = $_POST['load2'];

$from3 = $_POST['from3'];
$to3 = $_POST['to3'];
$load3 = $_POST['load3'];

$from4 = $_POST['from4'];
$to4 = $_POST['to4'];
$load4 = $_POST['load4'];

$from5 = $_POST['from5'];
$to5 = $_POST['to5'];
$load5 = $_POST['load5'];


$info = "<html>
<head>
<title>Email sent by $contactname</title>
</head>
<body><table>
		<tr><td>Contact Name</td><td>$contactname</td>
		</tr>
		<tr><td>Company</td><td>$company</td>
		</tr>
		<tr><td>Address</td><td>$address</td>
		</tr>
		<tr><td>City</td><td>$city</td>
		</tr>
		<tr><td>State</td><td>$state</td>
		</tr>
		<tr><td>zipcode</td><td>$zipcode</td>
		</tr>
		<tr><td>Telephone</td><td>$telephone</td>
		</tr>
		<tr><td>Fax</td><td>$fax</td>
		</tr>
		<tr><td>Commodity</td><td>$commodity</td>
		</tr>
		<tr><td>Weight Per Load</td><td>$weightperload $kglb</td>
		</tr>
		<tr><td>Is Palletized</td><td>$ispalletized</td>
		</tr>
		<tr><td>Dangerous Goods</td><td>$dangerousgoods</td>
		</tr>
		<tr><td>Equipment</td><td>$equipment</td>
		</tr>
		<tr><td>Service Type</td><td>$servicetype</td>
		</tr>	
		<tr><td>Loading Time</td><td>$loadingtime</td>
		</tr>
		<tr><td>Unloading Time</td><td>$unloadingtime</td>
		</tr>
		<tr><td>Spot the trailer</td><td>$spottrailer</td>
		</tr>
		<tr><td>Spot the truck time</td><td>$spottrucktime</td>
		</tr>
		<tr><td>Canadian Funds</td><td>$canadianfunds</td>
		</tr>
		</table>
		<hr>
		<table>
		<tr><td>From</td><td>$from1</td>
		</tr>	
		<tr><td>To</td><td>$to1</td>
		</tr>
		<tr><td>Load</td><td>$load1</td>
		</tr>
		</table>
		<hr>
		<table>
		<tr><td>From</td><td>$from2</td>
		</tr>	
		<tr><td>To</td><td>$to2</td>
		</tr>
		<tr><td>Load</td><td>$load2</td>
		</tr>
		</table>
		<hr>
		<table>
		<tr><td>From</td><td>$from3</td>
		</tr>	
		<tr><td>To</td><td>$to3</td>
		</tr>
		<tr><td>Load</td><td>$load3</td>
		</tr>
		</table>
		<hr>
		<table>
		<tr><td>From</td><td>$from4</td>
		</tr>	
		<tr><td>To</td><td>$to4</td>
		</tr>
		<tr><td>Load</td><td>$load4</td>
		</tr>
		</table>
		<hr>
		<table>
		<tr><td>From</td><td>$from5</td>
		</tr>	
		<tr><td>To</td><td>$to5</td>
		</tr>
		<tr><td>Load</td><td>$load5</td>
		</tr>				
		</table></body></html>";


if(trim($contactname) == 'Contact Name (first last)') {

	exit('<div class="error_message">You must enter your name.</div>');

} else if(trim($company) == 'Company') {

	exit('<div class="error_message">You must enter a company.</div>');

} else if(trim($address) == 'Address') {

	exit('<div class="error_message">Please enter an address.</div>');

} else if(!tommus_email_validate($email)) {

	exit('<div class="error_message">You have entered an invalid e-mail address.</div>');

} else if(trim($comments) == 'Comments') {

	exit('<div class="error_message">Please enter your message.</div>');

} else if(trim($comments) == '') {

	exit('<div class="error_message">Please enter your message.</div>');
	
} else if( strpos($comments, 'href') !== false ) {

	exit('<div class="error_message">Please leave links as plain text.</div>');
	
} else if( strpos($comments, '[url') !== false ) {

	exit('<div class="error_message">Please leave links as plain text.</div>');

} if(get_magic_quotes_gpc()) { $comments = stripslashes($comments); }

$address = 'aynka@ankitdesigns.com';
//$address = 'pchieni25@gmail.com';

$e_subject = "You've been contacted by ' . $contactname . '.";

$e_body = "You have been contacted by $contactname from your website contact form, their additional message is as follows." . "\r\n" . "\r\n";

//$e_content = "\"$info\"" . "\r\n" . "\r\n";

//$e_content .= "\"$comments\"" . "\r\n" . "\r\n";

$e_reply = "You can contact $contactname via email, $email";

//$msg = wordwrap( $e_body . $e_content . $e_reply, 70 );

$headers = "From: $email" . "\r\n";

$headers .= "Reply-To: $email" . "\r\n";

$headers .= "MIME-Version: 1.0" . "\r\n";

$headers .= "Content-type: text/html; charset=utf-8" . "\r\n";

$headers .= "Content-Transfer-Encoding: quoted-printable" . "\r\n";

//echo $info;
//sendActivationMail($email,$info);
if(mail($address, $e_subject, $info, $headers)) { echo "<fieldset><div id='success_page'><h4>Email Sent!</h4></div></fieldset>"; }