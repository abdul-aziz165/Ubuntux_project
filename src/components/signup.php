<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php'; // Include database connection

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"]) || !isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$username = $data["username"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);

// Check if username or email already exists
$check_stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$check_stmt->bind_param("ss", $username, $email);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username or email already exists"]);
} else {
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Signup successful. 😎"]);
    } else {
        echo json_encode(["success" => false, "message" => "Signup failed 😪"]);
    }
}

$check_stmt->close();
$stmt->close();
$conn->close();
?>
