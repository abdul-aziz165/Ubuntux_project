<?php
include 'db.php';

header("Content-Type: application/json");

$result = $conn->query("SELECT username, wallet_address, score FROM users ORDER BY score DESC");

if (!$result) {
    echo json_encode(["success" => false, "message" => "Error fetching leaderboard"]);
    exit();
}

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(["success" => true, "leaderboard" => $users]);
$conn->close();
?>