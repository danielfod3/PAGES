<?php
$servername = "localhost";
$username = "root";
$password = "unalmedyeison94";
$dbname = "administracion";

$mysqli = new mysqli($servername, $username, $password, $dbname);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
$name_pos = "diego";
$curso_pos = "historia";
$pass_pos = "6543";

/* Select queries return a resultset */
$result = mysqli_query($mysqli, "INSERT INTO profesores VALUES ('$name_pos','$curso_pos', '$pass_pos')");

print_r($result);
$mysqli->close();

?>
