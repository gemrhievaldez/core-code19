<!DOCTYPE html>
<html>
<head>
    <title>Using PHP Variables</title>
</head>
<body>
    <h1>08 Using PHP Variables</h1>
    <p>PHP script shows how to use PHP variables.</p>
    <hr>
    <?php
    //Understanding the Basics: Creating Variables in PHP
    //The boolean data type is used to represent TRUE or FALSE

    // assigning TRUE
    $validUser = TRUE;

    // using TRUE in an "if" statement
    if ($validUser) {
        echo 'User a Valid';
    } else {
        echo 'User in NOT Valid';
    }
    echo '<br />';

    //assinging FALSE
    $validUser = FALSE;

    // try again
    if($validUser) {
        echo 'User is Valid';
    } else {
        echo 'User is NOT Valid';
    }
    ?>
</body>
</html>