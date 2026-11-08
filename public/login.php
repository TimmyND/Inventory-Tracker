<?php

require "../resources/auth.php";
require_once "../resources/classes/DatabaseManager.php";

function authenticate($username, $password) {
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Get PDO
    $pdo = DatabaseManager::getDatabase();
    $sql = "SELECT * FROM users WHERE username = :username AND password = :password";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username, 'password' => $hashedPassword]);
    if (count($stmt->fetchAll()) <= 0)
        return false;

    return true;
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    if (authenticate($_POST['email'], $_POST['password'])) {
        $_SESSION['authenticated'] = true;
        $_SESSION['email'] = $_POST['email'];
    }
}

?>

<html>

<head>
    <?php include "../resources/head-begin.php"; ?>

    <?php include "../resources/head-end.php"; ?>
</head>

<body>
    <?php include "../resources/body-begin.php"; ?>

    <h1 class="text-center" style="margin-top: 2rem;">Fresh Cut Inventory Tracker</h1>
    <div class="p-4 mt-5">
        <form method="POST">
            <div class="card w-100" style="height: min(100%, 250px);">
                <div class="card-body">
                    <div class="row">
                        <label class="form-label" for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" />
                    </div>
                    <div class="row">
                        <label class="form-label" for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" />
                    </div>
                    <div class="row">
                        <button type="submit" class="btn-solid theme-primary">Log In</button>
                    </div>
                </div>
            </div>
        </form>

    </div>

    <?php include "../resources/body-end.php"; ?>
</body>

</html>