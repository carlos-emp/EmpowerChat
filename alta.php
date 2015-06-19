<?php

//Personal

$curp = $_POST["curp"];
$rfc = $_POST["rfc"];
$homoclave = $_POST['homoclave'];
$nombre = $_POST["nombre"];
$apellido_p = $_POST["apellido_p"];
$apellido_m = $_POST["apellido_m"];
$fecha_nacimiento = $_POST["fecha_nacimiento"];
$sexo = $_POST["sexo"];
$correo = $_POST["correo"];
$estado = $_POST["estado"];
$municipio = $_POST["municipio"];
$localidad = $_POST["localidad"];
$cp = $_POST["cp"];
$colonia = $_POST["colonia"];
$direccion = $_POST["direccion"];
$facebook = $_POST["facebook"];
$twitter = $_POST["twitter"];
$whatsapp = $_POST["whatsapp"];
$sitio = $_POST["sitio"];


$telefono1=$_POST["telefono1"];
$telefono2=$_POST["telefono2"];

//Laboral

$fecha_sep = $_POST["fecha_ingreso_sep"];
$num_plazas = $_POST["num_plazas"];

//Plaza 1
$funcion1 = $_POST["funcion1"];
$otro1 = $_POST["otro1"];
$cct1 = $_POST["cct1"];
$nombramiento1 = $_POST["nombramiento1"];
$fecha_nombramiento1 = $_POST["fecha_nombramiento1"];
//Plaza 2
$funcion2 = $_POST["funcion2"];
$otro2 = $_POST["otro2"];
$cct2 = $_POST["cct2"];
$nombramiento2 = $_POST["nombramiento2"];
$fecha_nombramiento2 = $_POST["fecha_nombramiento2"];
//Plaza 3
$funcion3 = $_POST["funcion3"];
$otro3 = $_POST["otro3"];
$cct3 = $_POST["cct3"];
$nombramiento3 = $_POST["nombramiento3"];
$fecha_nombramiento3 = $_POST["fecha_nombramiento3"];
//Talones
$talon1 = $_POST["talon1"];
$talon2 = $_POST["talon2"];
$talon3 = $_POST["talon3"];
$talon4 = $_POST["talon4"];
$talon5 = $_POST["talon5"];
$talon6 = $_POST["talon6"];
$talon7 = $_POST["talon7"];
$talon8 = $_POST["talon8"];
$talon9 = $_POST["talon9"];
$talon10 = $_POST["talon10"];


//Formativo

$grado = $_POST["grado"];
$estatus = $_POST["estatus"];
$cursos = $_POST["cursos"];
$diplomados = $_POST["diplomados"];


//Usuario
$usuario = $_POST["usuario"];
$pass = $_POST["pass"];
$pass2 = $_POST["pass2"];


$validacion=true;
$mensaje="";
$exito=true;






/*
$telefono1,$telefono2,$fecha_sep,$num_plazas,$funcion1,$otro1,$cct1,$nombramiento1,$fecha_nombramiento1,$funcion2,$otro2,$cct2,$nombramiento2,$fecha_nombramiento2,$funcion3,$otro3,$cct3,$nombramiento3,$fecha_nombramiento3,$talon1,$talon2,$talon3,$talon4,$talon5,$talon6,$talon7,$talon8,$talon9,$talon10 ,$grado ,$estatus,$cursos,$diplomados,$usuario,$pass,$pass2
*/




/*


$variables=[$curp,$rfc,$homoclave,$nombre,$apellido_p,$apellido_m,$fecha_nacimiento,$sexo,$correo,$estado,$municipio,$localidad,$cp,$colonia,$direccion,$facebook,$twitter,$whatsapp,$sitio,$telefono1,$telefono2,$fecha_sep,$num_plazas,$funcion1,$otro1,$cct1,$nombramiento1,$fecha_nombramiento1,$funcion2,$otro2,$cct2,$nombramiento2,$fecha_nombramiento2,$funcion3,$otro3,$cct3,$nombramiento3,$fecha_nombramiento3,$talon1,$talon2,$talon3,$talon4,$talon5,$talon6,$talon7,$talon8,$talon9,$talon10 ,$grado ,$estatus,$cursos,$diplomados,$usuario,$pass,$pass2 ];



for($i=0;$i<count($variables);$i++){

    if ($variables[$i]!=null&&strpos($variables[$i],"'") !== false||strpos($variables[$i],'"') !== false||strpos($variables[$i],'<') !== false ||strpos($variables[$i],'INSERT') !== false||strpos($variables[$i],'SELECT') !== false) {


        $validacion=false;


}

}


if(!$validacion){

     echo "Uno o más cáracteres invalidos";
}
*/



    include 'conexion.php';




$sql = "SELECT curp FROM persona WHERE curp ='".$curp."'";
if(!$resultadoRegistro = $db->query($sql)){

}

else{
    $num_registro = mysqli_num_rows($resultadoRegistro);
    if($num_registro>0){
        echo "Parece que usted ya se encuentra registrado/a, por favor incie sesión o contacte al administrador";
    }

    else{


        //insertar datos Personales
        $sql = "INSERT INTO persona VALUES ('".$curp."','".$rfc."','".$homoclave."','".$nombre."','".$apellido_p."','".$apellido_m."','".$fecha_nacimiento."','".$sexo."','".$correo."','".$direccion."','".$colonia."','".$cp."','".$estado."','".$municipio."','".$localidad."','".$facebook."','".$twitter."','".$whatsapp."','".$sitio."')";


         if(!$db->query($sql)){
             $exito=false;
            echo'Ocurrio un error ejecutando el query1 [' . $db->error . ']';


        }




//insertar telefonos

$telefonos=[$telefono1,$telefono2];
for($i=0;$i<count($telefonos);$i++){
    if($telefonos[$i]!=null){
        $sql="INSERT INTO telefono_persona VALUES('null','".$curp."','".$telefonos[$i]."')";

         if(!$db->query($sql)){
            $exito=false;
             echo'Ocurrio un error ejecutando el query2 [' . $db->error . ']';

        }

    }
}

//insertar datos Laborales

$sql = "INSERT INTO docente VALUES('".$curp."','".$fecha_sep."','".$grado."','".$estatus."','".$cursos."','".$diplomados."','')";

     if(!$db->query($sql)){
            $exito=false;
            echo'Ocurrio un error ejecutando el query3 [' . $db->error . ']';

        }


//insertar datos de Plaza


$plazas;

$plazas[0]=[$funcion1,$otro1,$nombramiento1,$fecha_nombramiento1,$cct1];
$plazas[1]=[$funcion2,$otro2,$nombramiento2,$fecha_nombramiento2,$cct2];
$plazas[2]=[$funcion3,$otro3,$nombramiento3,$fecha_nombramiento3,$cct3];

for($i=0;$i<$num_plazas;$i++){
    $plaza=$plazas[$i];

    if($plaza[0]==7)
    {
    $sql="INSERT INTO plaza VALUES ('null','".$curp."','".$plaza[0]."','".$plaza[1]."','".$plaza[2]."','".$plaza[3]."','".$plaza[4]."')";
    }
    else{
        $sql="INSERT INTO plaza VALUES ('null','".$curp."','".$plaza[0]."',' ','".$plaza[2]."','".$plaza[3]."','".$plaza[4]."')";
    }

     if(!$db->query($sql)){
            $exito=false;
            echo'Ocurrio un error ejecutando el query4 [' . $db->error . ']';

        }

}

//Insertar Talones

$talones=[ $talon1 ,$talon2 ,$talon3 ,$talon4 ,$talon5 ,$talon6, $talon7, $talon8 ,$talon9, $talon10];

for($i=0;$i<count($talones);$i++){

    if($talones[$i]!=null){

        $sql="INSERT INTO talon VALUES('null','".$curp."','".$talones[$i]."')";
         if(!$db->query($sql)){
             $exito=false;
            echo'Ocurrio un error ejecutando el query5 [' . $db->error . ']';

        }

    }


}



//insertar Usuario




$ruta="../img/usuarios";
$archivo=$_FILES['imagen']['tmp_name'];
$file = $_FILES['imagen'];
if(!isset($archivo)){

    $img="";
}
else{


    $tipo = $file["type"];





if($tipo!='image/jpg'&&$tipo!='image/jpeg'&&$tipo!='image/png'&&$tipo!='image/gif'){

    $img="";

    echo "Formato no permitido, se utilizará imagen por defecto";
}


$nom_archivo=$_FILES['imagen']['name'];
$ext=  pathinfo($nom_archivo);
$subir = move_uploaded_file($archivo,$ruta."/".$curp.".".$ext['extension']);


if ($subir){

    $img = $curp.".".$ext['extension'];

}
else{

    $img="";
    echo 'Error al subir se utilizará imagen por defecto ';
}

}



$fecha= date("Y-m-d h:i:s");
//$nuevafecha = strtotime ( '-1 hour' , strtotime ( $fecha ) ) ;
//$nuevafecha = date ( 'Y-m-d h:i:s' , $nuevafecha );
//$fecha_registro.=$nuevafecha;


$salt = '$DF¿C¡_?2-0-1-4$/!';
$pass = sha1(md5($salt . $pass));

$sql="INSERT INTO usuario VALUES('".$curp."','".$pass."','2','".$fecha."','1','".$img."')";
if(!$db->query($sql)){
            $exito=false;
            echo'Ocurrio un error ejecutando el query [' . $db->error . ']';
}





if(!$exito){

    $mensaje="Ocurrió un problema con su registro";
    $sql = "DELETE FROM persona WHERE curp = '".$curp."'";
    if(!$db->query($sql)){
        echo'Ocurrio un error ejecutando el query [' . $db->error . ']';


    }
}
  else{
            $mensaje="Felicidades, usted ha sido registrado satisfactoriamente el día ".$fecha;
     }





echo "\n".$mensaje;

if($exito){

    error_reporting(0);
    session_start();
    $_SESSION["usuario"]=$curp;
    $_SESSION["nombre"] = $nombre;
    $_SESSION["img"]=$img;
    $_SESSION["apellidos"] = $apellido_p." ".$apellido_m;
    $_SESSION["sexo"] = $sexo;
    $_SESSION["tipo"]="2";


}



    }
}







?>
