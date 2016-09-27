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
$username_pos = "yeison94";
$pass_pos = "12345";

/* Select queries return a resultset */
if ($result = $mysqli->query("SELECT * FROM administrador")) {
    printf("Select returned %d rows.\n", $result->num_rows);
    while ($row = $result->fetch_assoc()){
        printf("%s %s",$row["username"],$row["pass"]);

    }


    /* free result set */
    $result->close();
}

/* If we have to retrieve large amount of data we use MYSQLI_USE_RESULT */


$mysqli->close();

// $conn = mysql_connect($servername, $username, $password, $dbname);
// if(!$conn){
// 	die("No conectado" );
// }
//
// $showData = "SELECT * FROM administrador";
// $data = array();
// $result = mysql_query($conn, $showData);
//
// if(mysqli_num_rows($result) > 0){
// 	while($row = mysqli_fetch_assoc($result)){
// 		$data[] = $row;
// 	}
// } else {
// 	echo "0 results";
// };
// $outp = json_encode($data);
// mysqli_close($conn);
// echo($outp);
?>
