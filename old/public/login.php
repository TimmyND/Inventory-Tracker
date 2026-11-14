<?php

require "../resources/auth.php";
require_once "../resources/classes/DatabaseManager.php";

function authenticate($username, $password) {
    // Get PDO
    $pdo = DatabaseManager::getDatabase();
    $sql = "SELECT * FROM users WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($results) <= 0)
        return false;

    // Compare password
    if (!password_verify($password, $results[0]['password']))
        return false;

    return true;
}

$invalidCredentials = false;
if (isset($_POST['username']) && isset($_POST['password'])) {
    if (authenticate($_POST['username'], $_POST['password'])) {
        $_SESSION['authenticated'] = true;
        $_SESSION['username'] = $_POST['username'];
    } else {
        $invalidCredentials = true;
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
        <form method="POST" data-bs-validate>
            <div class="card w-100" style="height: min(100%, 250px);">
                <div class="card-body">
                    <div class="invalid-feedback <?= $invalidCredentials ? 'd-block' : ''?>">Invalid username or password</div>
                    <div class="row">
                        <label class="form-label" for="username">Username</label>
                        <input required type="text" class="form-control" id="username" name="username" />
                        <div id="usernameFeedback" class="invalid-feedback">Please enter a username</div>
                    </div>
                    <div class="row">
                        <label class="form-label" for="password">Password</label>
                        <input required type="password" class="form-control" id="password" name="password" />
                        <div id="passwordFeedback" class="invalid-feedback">Please enter a password</div>
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