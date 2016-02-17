<?php

$field_name = $_POST['name'];
$field_email = $_POST['e-mail'];
$subject = $_POST['subject'];
$field_message = $_POST['message'];

// Validation mail
$your_name = 'Sierra Contact Form';
$your_mail = 'rista90@gmail.com';
$your_message = $field_message;

$mail_to = $your_mail;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\r\n";
$body_message .= "\n".$field_message;

$headers = 'From: '.$field_name.'<'.$field_email.">\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);
 
if ($your_mail != '' && $your_message != '') {
	$subject_v = 'Message successfully sent!';

	$headers_v = 'From: '.$your_name.'<'.$your_mail.">\r\n";
	$headers_v .= 'Reply-To: '.$your_email."\r\n";

	$message_v = $your_message. "\n";

	mail($field_email, $subject_v, $message_v, $headers_v);
}
if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Message successfully sent!');
		window.location = 'index.html#contact';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message sending failed! Please try again.');
		window.location = 'index.html#contact';
	</script>
<?php
}
?>