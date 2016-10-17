<?php

$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';

if ($email !== '') {
  // Ключ доступа к API (из Личного Кабинета)
  $api_key = "xxxx";

  // Данные о новом подписчике
  $user_email = $email;
  $user_name = $name;
  $user_lists = "xxxxxx"; // бесплатное пособие для фотографов
  $user_ip = $_SERVER["REMOTE_ADDR"];
  $user_tag = urlencode("blenda.by - gift");

  $POST = array (
    'api_key' => $api_key,
    'list_ids' => $user_lists,
    'fields[email]' => $user_email,
    'fields[Name]' => $user_name,
    'request_ip' => $user_ip,
    'tags' => $user_tag
  );

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $POST);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_URL, 'http://api.unisender.com/ru/api/subscribe?format=json');
  $result = curl_exec($ch);

  if ($result) {
    $jsonObj = json_decode($result);

    if(null===$jsonObj) {
      // Ошибка в полученном ответе
      echo "Invalid JSON";
    }
    elseif(!empty($jsonObj->error)) {
      // Ошибка добавления пользователя
      echo "An error occured: " . $jsonObj->error . "(code: " . $jsonObj->code . ")";
    } else {
      // Новый пользователь успешно добавлен
      echo "Added. ID is " . $jsonObj->result->person_id;
    }
  } else {
    // Ошибка соединения с API-сервером
    echo "API access error";
  }
}