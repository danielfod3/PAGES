<?php

	require("connect_db.php");

if ($_SERVER['REQUEST_METHOD'] == 'GET' && empty($_GET)){

	$resultado = array();

	$result=mysqli_query($mysqli,"SELECT * FROM profesores ");
	while($row = mysqli_fetch_assoc($result)){
	  $aux = array('nombre' => $row['name'],
	                'asignatura' => $row['curso']);

		$resultado[] = $aux;
	}

	$mysqli->close();

	$result2 = json_encode($resultado);
	echo $result2;

}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){

	    $data = json_decode(file_get_contents('php://input'), true);

        $operacion = $data["operacion"];
				$nameProfesor_pos= $data["nam"];
				$asignatura_pos= $data["Asignatura"];
				$contra_pos= $data["Contrasena"];

				if($operacion == "agregar"){

					// $result = array('nombre' => $nameProfesor_pos,
					//                 'asignatura' =>  	$asignatura_pos,
					// 							   'constrena' => $contra_pos);


				//la variable  $mysqli viene de connect_db que lo traigo con el require("connect_db.php");
				mysqli_query($mysqli, "INSERT INTO profesores VALUES ('$nameProfesor_pos','$asignatura_pos', '$contra_pos')");
				$mysqli->close();

				$result = array('Respuesta' => true);

				$result2 = json_encode($result);
				echo $result2;

			}else{

				mysqli_query($mysqli, "DELETE FROM profesores WHERE name = '$nameProfesor_pos' and curso = '$asignatura_pos'");
				$mysqli->close();

				$result = array('Respuesta' => true);

				// $result = array('nombre' => $nameProfesor_pos,
				//                 'asignatura' =>  	$asignatura_pos);


				$result2 = json_encode($result);
				echo $result2;
			}

}



?>
