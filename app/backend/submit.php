<?php

date_default_timezone_set('Etc/UTC');

require 'lib/PHPMailerAutoload.php';

$name = isset($_POST['name']) ? $_POST['name'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$theme = isset($_POST['theme']) ? $_POST['theme'] : 'Заказ обратного звонка';
$url = $_SERVER["HTTP_REFERER"];
$parts = parse_url($url);
parse_str($parts["query"], $query);
$params_string = "";
foreach ($query as $key => $value) {
	$params_string .= $key . ": " . $value . "<br>";
}

if ($phone !== '') {
	$mail = new PHPMailer;
	$mail->CharSet = "UTF-8";
	$mail->IsHTML(true);
	$mail->setFrom('xxxxxx@example.com', 'Blenda.by');
	$mail->addAddress('xxxxxx@gmail.com', 'Manager');

	$mail->Subject = $theme;

	$mail->Body = <<<EOT
<p>Здравствуйте.</p>
<p>Получен новый лид с целевой страницы: <a href="http://blenda.by">blenda.by</a></p>
<p><strong>Данные лида:</strong></p>

<p>
<strong>Имя:</strong> {$name} <br>

<strong>Телефон:</strong> {$phone} <br><br>

<strong>Имя формы:</strong> {$theme} <br><br>

<strong>Дополнительные значения:</strong><br>
HTTP_REFERER: {$_SERVER["HTTP_REFERER"]}<br>
HTTP_USER_AGENT: {$_SERVER["HTTP_USER_AGENT"]}<br>
IP: {$_SERVER["REMOTE_ADDR"]} <br>
URL_PATH: {$parts["query"]} <br>
PARAMETERS: {$params_string}
</p>

EOT;

	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "OK";
	}
}
