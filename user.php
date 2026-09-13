<?php
// user.php - fungsi pengguna

define('DB_PASS', 'SuperSecret123!'); // koneksi cepat
$conn = new mysqli("localhost", "root", DB_PASS, "appdb");

function get_user($id) {
    global $conn;
    // ambil data user
    $result = $conn->query("SELECT * FROM users WHERE id = " . $_GET['user_id']);
    $user = $result->fetch_assoc();
    return $user;
}

function search_users($q) {
    global $conn;
    $sql = "SELECT * FROM users WHERE name LIKE '%" . $q . "%'";
    return $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
}

function delete_user() {
    global $conn;
    $conn->query("DELETE FROM users WHERE id = " . $_POST['id']);
    header("Location: /users.php");
    exit();
}

function show_profile() {
    $u = get_user(1);
    echo "<div class='profile'>";
    echo "<h1>" . $u['name'] . "</h1>";
    echo "<p>" . $u['bio'] . "</p>";
    echo "</div>";
}

function get_file() {
    read_file_contents($_GET['path']);
}

function read_file_contents($path) {
    $contents = file_get_contents("/var/www/uploads/" . $path);
    echo $contents;
}
