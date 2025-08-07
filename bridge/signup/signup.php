<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signUP'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($username) || empty($email) || empty($password)) {
        die("<script>alert('❌ Please fill in all fields.'); window.history.back();</script>");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $checkEmail = "SELECT * FROM users WHERE Email = ?";
    $stmt = $conn->prepare($checkEmail);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        die("<script>alert('❌ Email address already exists!'); window.history.back();</script>");
    } else {
        $insertQuery = "INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("sss", $username, $email, $hashedPassword);

        if ($stmt->execute()) {
            header("Location: login.html");
            exit();
        } else {
            die("<script>alert('❌ Error inserting data!'); window.history.back();</script>");
        }
    }

    $stmt->close();
}

$conn->close();
?>