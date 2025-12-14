<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$perm = $data['perm_id'];
$name = $data['name'];

$q = $conn->query("SELECT id FROM users WHERE perm_id='$perm'");
if ($q->num_rows == 0) {
  $conn->query("INSERT INTO users (perm_id,name) VALUES ('$perm','$name')");
}

echo "OK";
