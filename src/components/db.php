<?php
$servername = "localhost";  // Change from remote server to localhost
$username = "root";  // Default XAMPP MySQL username
$password = "";  // Default is empty in XAMPP
$database = "ubuntux_users";  // Make sure this matches your database name in phpMyAdmin

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}
?>