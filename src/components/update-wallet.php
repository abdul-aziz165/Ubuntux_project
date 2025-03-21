<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$wallet = $data['wallet'];

// Connect to database and update wallet address
$conn = new mysqli("localhost", "root", "", "ubuntux");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("UPDATE users SET wallet_address = ? WHERE username = ?");
$stmt->bind_param("ss", $wallet, $username);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>