<!DOCTYPE html>
<html>
<head>
    <title>07 Using PHP Variables</title>
</head>
<body>
    <h1>07 Usign PHP variables</h1>
    <p>PHP script shows how to use PHP variables.</p>
    <hr>
    <?php
    // Undertanding the Basics: Creating Variables in PHP
    // text is represented in PHP with the data type "String"

    //you can assign a string value using 'single quoutes'
    $stringValue1 = 'This is a string.';
    echo $stringValue1;
    echo '<br />';

    // use the backslash  "\" to "escape" special characters
    $stringValue2 = 'This is a string, isn\'t it?';
    echo $stringValue2;
    echo '<br />';

    // use "double quotes" when you need to expand variables inside some text
    // this is called "interpolation"
    $name = 'Hadji';
    echo "<br /> Welcome $name to our new Website!";

    // what happens of you forget the "\"?
    $stringValue4 ='This is a string, isn\'t it?';
    echo $stringValue4;
    ?>
</body>
</html>