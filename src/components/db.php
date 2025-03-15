<?php
$servername = "sql211.infinityfree.com";  
$username = "if0_38523458";  
$password = "1Lebron2021";  
$database = "if0_38523458_ubuntux_db";     

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}
?>
