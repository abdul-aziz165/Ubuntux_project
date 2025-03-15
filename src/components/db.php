$servername = "sqlXXX.infinityfree.com"; // Replace with your InfinityFree database hostname
$username = "your_db_username";  // Replace with your InfinityFree database username
$password = "your_db_password";  // Replace with your InfinityFree database password
$database = "your_db_name";      // Replace with your InfinityFree database name

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
