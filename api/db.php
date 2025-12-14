<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "wallet_system";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("DB Connection Failed");
}
?>
