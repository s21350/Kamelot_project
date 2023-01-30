<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true); /* Создаем объект MAIL */
	$mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
	$mail->IsHTML(true); /* Разрешаем работу с HTML */


	/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

	//Від кого лист
	$mail->Port       = 465;    
	$mail->SMTPSecure = 'tls';

	$mail->setFrom('kamelot@gmail.com', 'Інтернет магазин - Камелот'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('kamelotdah@ukr.net'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Повідомлення з форми інтернет магазину';

	$name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
	$phone = $_POST["phone"]; /* Телефон */
	$product = $_POST["product"];

	//Тіло листа
	// $body = ' 
	// <h1>Нове повідомлення</h1> <br>
	// <b>Імʼя:</b> . $_POST['name'] . <br>
	// <b>Телефон:</b> $phone<br>
	// ';

	$body = 'Імʼя: ' . $_POST['name'] . ' <br />';
   $body .= 'Телефон: ' . $_POST['phone'] . ' <br />';
	$body .= 'Який товар: ' . $_POST['product'] . ' <br />';
	
	// $email = $_POST["email"]; /* Почту */
	
	
	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>