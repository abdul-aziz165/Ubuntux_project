<?php
include 'db.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"]) || !isset($data["score"])) {
    echo json_encode(["success" => false, "message" => "Invalid data received"]);
    exit();
}

$username = $data["username"];
$score = $data["score"];

$stmt = $conn->prepare("UPDATE users SET score = ? WHERE username = ?");
$stmt->bind_param("is", $score, $username);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Score updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating score"]);
}

$stmt->close();
$conn->close();
?>