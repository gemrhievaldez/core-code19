<!DOCTYPE html>
<html>
<head><title>String Concatenation</title>
</head>
<body>
    <h1>10 String Concatenation</h1>
    <p>PHP script using String Concatenation</p>
    <hr>
    <?php
    $street       = 'Main Street';
    $number       = 216;
    $city         = 'Malolos';
    $province     = 'Bulacan';

    $address = $number . ' ' . $street . ', ' . $city . ', ' . $province;
    echo "<br />Full Address Using '.' : <br /> $address"; 
    ?>
</body>
</html>