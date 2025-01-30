<!DOCTYPE html>
<html>
<head>
    <title>Using Comments</title>
</head>
<body>
    <h1>02 Using Comments</h1>
    <p> PHP Script Using Comments</p>
    <hr>
    <?php
        // Understanding the basics: Adding Comments 
        // This is a single line comment
        echo "<br />The single line comment does not appear, but this text does!";
        # Comments do not appear when viewing the page source
        echo "<br />Comments do not appear when viewing the page source either.";
        $value = 'inline comment';    // This is an inline comment
        /*
        * This is a 
        * multiline 
        * comment 
        */
        echo "<br />The multiline comment does not appear, but this text does!";
    ?>
</body>
</html>