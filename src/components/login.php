<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php'; // Include database connection

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$username = $data["username"];
$password = $data["password"];

$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($hashed_password);
$stmt->fetch();

if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
    echo json_encode(["success" => true, "message" => "Login successful. 🦁"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}

$stmt->close();
$conn->close();
?>
