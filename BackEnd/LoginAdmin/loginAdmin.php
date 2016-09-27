<?php

	require("connect_db.php");

  if ( !isSet($_SESSION['data']) ) $_SESSION['data']=array();

  $data = json_decode(file_get_contents('php://input'), true);

	$nameProfesor_pos= $data["nam"];
	$asignatura_pos= $data["Asignatura"];
	$contra_pos= $data["Contrasena"];

	// $result = array('nombre' => $nameProfesor_pos,
	//                 'asignatura' =>  	$asignatura_pos,
	// 							   'constrena' => $contra_pos);


//la variable  $mysqli viene de connect_db que lo traigo con el require("connect_db.php");
mysqli_query($mysqli, "INSERT INTO profesores VALUES ('$nameProfesor_pos','$asignatura_pos', '$contra_pos')");

$result = array('Respuesta' => true);

$mysqli->close();
$result2 = json_encode($result);
echo $result2;


?>
