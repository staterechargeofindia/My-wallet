<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$from = $data['from'];
$to   = $data['to'];
$amt  = intval($data['amount']);

if ($amt < 1 || $amt > 100000) {
  exit("INVALID_AMOUNT");
}

// last 24h limit
$q = $conn->query("
 SELECT IFNULL(SUM(amount),0) t FROM transactions
 WHERE from_user='$from'
 AND created_at >= NOW() - INTERVAL 24 HOUR
");
$row = $q->fetch_assoc();

if ($row['t'] + $amt > 100000) {
  exit("LIMIT_EXCEEDED");
}

// save transaction
$conn->query("
 INSERT INTO transactions (from_user,to_user,amount)
 VALUES ('$from','$to',$amt)
");

echo "SUCCESS";
