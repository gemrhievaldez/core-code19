<!DOCTYPE html>
<html>
<head>
    <title>Using PHP Variables</title>
</head>
<body>
    <h1>09 Using PHP Variables</h1>
    <P>PHP script shows how to use PHP variables.</P>
    <hr>
    <?php
    //Understanding the Basics: Creating Variables in php
    // The data type of variable  can change as the script runs 

    // start by assigning a value which is integer
    $value = 12345;
    var_dump ($value);
    echo '<br />';

    // now assign a float 
    // same variable different data type
    $value = 12345.22;
    var_dump ($value);
    echo '<br />';

    //try assigning as a string
    $value = "Gemrhie Valdez";
    var_dump ($value);
    echo '<br />';

    // now let's try a boolean
    $value = TRUE;
    var_dump ($value);
    echo '<br />';
    ?>
</body>
</html>