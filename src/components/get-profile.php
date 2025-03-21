<?php
include 'db.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"])) {
    echo json_encode(["success" => false, "message" => "Invalid data received"]);
    exit();
}

$username = $data["username"];

$stmt = $conn->prepare("SELECT wallet_address, score, profile_picture FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($wallet_address, $score, $profile_picture);
$stmt->fetch();

if ($wallet_address !== null) {
    echo json_encode([
        "success" => true,
        "wallet_address" => $wallet_address,
        "score" => $score,
        "profile_picture" => $profile_picture
    ]);
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>