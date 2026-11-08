<?php

//require "../resources/auth.php";


function getNextSunday()
{
    $date = new DateTime("now");
    while ($date->format("l") != "Sunday")
        $date->add(new DateInterval("+1d"));

    return $date;
}

$itemsToOrder = ["Item 1", "Item 2", "Item 3"];
$toOrderDate = getNextSunday();
$arrivingDate = clone $toOrderDate;
$arrivingDate->add(new DateInterval("P9D"));
?>

<html>

<head>
    <?php include "../resources/head-begin.php"; ?>

    <?php include "../resources/head-end.php"; ?>
</head>

<body>
    <?php include "../resources/body-begin.php"; ?>
    <?php include "../resources/components/navbar.php"; ?>

    <div class="container-fluid">
        <h3>To Order</h3>
        <div class="row row-cols-2 mb-3">
            <span class="fs-5 d-block"><?= $toOrderDate->format('m/d/Y') ?></span>
            <span class="fs-5 d-block">Arriving: <?= $arrivingDate->format('m/d/Y') ?></span>
        </div>
        <div class="accordion mt-5">
            <?php foreach ($itemsToOrder as $item) { ?>
                <details class="accordion-item" name="<?= $item ?>">
                    <summary class="accordion-header"><?= $item ?>

                        <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m2 5 6 6 6-6" />
                        </svg>
                    </summary>
                    <div class="accordion-body">Some content</div>
                </details>
            <?php } ?>
        </div>
    </div>


    <?php include "../resources/body-end.php"; ?>
</body>

</html>

<!-- Everything that is predicted to be out within a week and a half should be ordered -->