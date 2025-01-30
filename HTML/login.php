<?php
// Start the session
session_start();

// Hardcoded username and password
$username = "Gemrhie Valdez";
$password = "memories";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];
    
    // Validate credentials
    if ($inputUsername === $username && $inputPassword === $password) {
        // Set session variable and redirect to the main page
        $_SESSION["loggedin"] = true;
        $_SESSION["username"] = $inputUsername;
        header("Location: memories.html");
        exit;
    } else {
        // Incorrect credentials message
        echo "<p style='color: red;'>Invalid username or password.</p>";
    }
}