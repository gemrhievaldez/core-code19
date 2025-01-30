<!DOCTYPE html>
<html>
<head>
    <title>05 PHP Variables</title>
</head>
<body>
    <h1>05 PHP Variables</h1>
    <p>Using / Declaring PHP Variables</p>
    <hr>
    <?php
        // Understanding the Basics: Creating Variables in PHP
        // variables are used to store values 
        // use "=" to assign a value
        $company = 'ABC Consulting';

        // Always start variable name with a "$" followed by a letter or underscore
        $name     = 'VALUE';
        $_another = 22;
        $name2    = 'OTHER';

        // do not use single letters; hard to debug later!
        $a = 1;
        $b = 'Some Text';

        // use camelCase: take advantage of fact variables are case sensitive 
        $firstName            ='Doug';
        $cityStalePostalCode  =' New York, New York 10001';
        $hourlyRate           = 47.22;
        
        // long name are allowed but can get out of hand!
        $thisIsARidiculouslyLongWindedOrOtherwiseLongNameVariableButYouCanSeeThatPHPDoesntCareAboutthat = 'TEST';
        echo $thisIsARidiculouslyLongWindedOrOtherwiseLongNameVariableButYouCanSeeThatPHPDoesntCareAboutthat;
    ?>
</body>
</html>