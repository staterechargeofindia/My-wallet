<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$user = $data['user'];
$amt  = intval($data['amount']);
$type = $data['type']; // add / withdraw

if ($type === "add") {
  $conn->query("
   INSERT INTO transactions (from_user,to_user,amount)
   VALUES ('ADMIN','$user',$amt)
  ");
}

if ($type === "withdraw") {
  $conn->query("
   INSERT INTO transactions (from_user,to_user,amount)
   VALUES ('$user','ADMIN',$amt)
  ");
}

echo "OK";
