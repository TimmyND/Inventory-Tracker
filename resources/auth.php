<?php

if (!isset($_SESSION))
    session_start();

// Redirect to login if not authenticated
if ($_SERVER['REQUEST_URI'] != '/login.php' && (!isset($_SESSION['authenticated']) || !$_SESSION['authenticated'])) {
    header('Location: /login.php');
    exit;
}
else if ($_SERVER['REQUEST_URI'] == '/login.php' && isset($_SESSION['authenticated']) && $_SESSION['authenticated']) {
    header('Location: /index.php');
    exit;
}

?>