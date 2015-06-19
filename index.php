<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />



<?php
session_start();
if (isset($_SESSION['usuario']))
{
    echo '<script>location.href = "/inicio";</script>';

}
else
{

     include '../php/consulta.php';
        $consulta = new consulta();
        $comboEstado=$consulta->get_combo('estado','Entidad Federativa','id','nombre','nombre');
        $comboCT=$consulta->get_combo('ct','Clave del Centro de Trabajo','id','id','id');

?>




<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <title>Registro</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/plantilla.css">
    <link rel="stylesheet" href="../css/formularios.css">
    <link rel="stylesheet" href="../css/iconos/fonts.min.css">
    <link rel="stylesheet" href="../css/datepicker.min.css">
    <link rel="stylesheet" href="../css/bootstrap-select.css">


</head>
<div class="carga"></div>


<body>
    <div id="container">
        <div id="header">
            <!-- Header start -->
            <header>
               <?php include "../recursos/barra.html"; ?>
            </header>
            <!-- Header end -->
        </div>
        <div id="body">


            <!-- Body start -->
            <div class='container-fluid'>


                <div class="col-md-8 col-md-offset-2 fondo redondeado">

                    <form action="../php/alta.php" method="post" id="form1">



                        <h4 class="text-center titulos redondeado">Registro de Docentes</h4>
                        <!--<div id="test">

                           <div class="row">
                                <div class="col-md-6 col-md-offset-2">

                                <input type="password" class="form-control" placeholder="Clave" id="clave">

                            </div>
                            <div class="col-md-3">
                                <span class="btn btn-default" onclick="formulario(document.getElementById('clave').value)">Aceptar</span>

                            </div>

                           </div>
                           <br>



                            <div class="col-md-2 col-md-offset-5"><span class="icon-sad hide"></span></div>
                            <div class="margen"></div>


                        </div>-->
                        <div id="rootwizard" class="">
                            <div class="navbar ">
                                <div class="navbar-inner" id="pestana">
                                    <ul>
                                        <li><a class="tabmenu" href="#tab1" data-toggle="tab"><span class="hidden-xs ">Personal </span><span class="icon-person"></span></a> </li>
                                        <li><a class="tabmenu" href="#tab2" data-toggle="tab"><span class="hidden-xs ">Laboral </span><span class="icon-work"></span></a> </li>
                                        <li><a class="tabmenu" href="#tab3" data-toggle="tab"><span class="hidden-xs ">Formativo </span><span class="icon-book"></span></a> </li>
                                        <li><a class="tabmenu" href="#tab4" data-toggle="tab"><span class="hidden-xs ">Usuario </span><span class="icon-person-add"></span></a> </li>
                                        <li><a class="tabmenu" href="#tab5" data-toggle="tab"><span class="hidden-xs ">Registro </span><span class="icon-check"></span></a> </li>

                                    </ul>
                                </div>
                            </div>
                            <div id="bar" class="progress">
                                <div class=" progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
                            </div>
                            <div class="tab-content">

                               <b>Atención: Por favor proporcione información correcta y veridica ya que no podrá ser cambiada en el futuro.<br>Mantenga el cursor sobre un campo del formulario (no presionar) para mostrar la guía de llenado</b><br>
                                <div class="tab-pane fade" id="tab1">
                                    <!--INICIO PASO 1-->
                                    <h5 class="text-center sub-expandido redondeado">Datos Personales</h5>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 container form-group">

                                            <label for="curp"></label>
                                            <input class="form-control form-group" name="curp" id="curp" type="text" placeholder="CURP - Importante" onclick="normal('#curp')" title="18 dígitos, utilice mayúsculas">

                                            <div class="row">

                                                <div class="col-sm-7">

                                                    <label for="rfc"></label>
                                                    <input class="form-control form-group" name="rfc" id="rfc" type="text" placeholder="RFC" onclick="normal('#rfc')" title="10 dígitos, utilice mayúsculas">

                                                </div>

                                                <div class="col-sm-5">

                                                    <label for="homoclave"></label>
                                                    <input class="form-control form-group" name="homoclave" id="homoclave" type="text" placeholder="Homoclave" onclick="normal('#homoclave')" title="3 dígitos, utilice mayúsculas">

                                                </div>




                                            </div>






                                            <label for="nombre"></label>
                                            <input class="form-control form-group" name="nombre" id="nombre" type="text" placeholder="Nombre (s)" onclick="normal('#nombre')" title="Utilice mayúsculas y minúsculas">
                                            <label for="apellido_p"></label>
                                            <input class="form-control form-group" name="apellido_p" id="apellido_p" type="text" placeholder="Apellido Paterno" onclick="normal('#apellido_p')" title="Utilice mayúsculas y minúsculas">
                                            <label for="apellido_m"></label>
                                            <input class="form-control form-group" name="apellido_m" id="apellido_m" type="text" placeholder="Apellido Materno" onclick="normal('#apellido_m')" title="Utilice mayúsculas y minúsculas">
                                            <label for="fecha_nacimiento"></label>
                                            <input class="form-control datepicker form-group" name="fecha_nacimiento" type="text" id="fecha_nacimiento" placeholder="Fecha de Nacimiento" data-date-format="yyyy-mm-dd" readonly="readonly" onclick="normal('#fecha_nacimiento')">
                                            <div class="form-group">

                                                <label for=""></label>
                                                <select name="sexo" id="sexo" class="form-control " onclick="normal('#sexo')">

                                                    <option value="0" selected disabled>Sexo</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="M">Masculino</option>

                                                </select>
                                            </div>





                                            <label for="correo"></label>
                                            <input class="form-control form-group " name="correo" id="correo" type="text" placeholder="Correo Electrónico" onclick="normal('#correo')" title="Utilice mayúsculas y minúsculas según sea el caso">


                                        </div>





                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">



                                            <div class="form-group">

                                                <label for="estado"></label>
                                                <select name="estado" id="estado" class="form-control " onchange="getCombo2(this.value,'municipio','municipio','estado_id','id','nombre','Municipio','nombre')" onclick="normal('#estado')" >
                                                    <?php echo $comboEstado; ?>
                                                </select>

                                            </div>

                                            <div class="form-group">
                                                <label for="municipio"></label>
                                                <select name="municipio" id="municipio" class="form-control "  onchange="getCombo2(this.value,'localidad','localidad','municipio_id','id','nombre','Localidad','nombre')" onclick="normal('#municipio')">
                                                    <option value="0" selected>Municipio</option>
                                                </select>

                                            </div>

                                            <div id="cargaCombo" class="sub form-group text-center hide">
                                                <span class="icon-clock"></span> Por favor espere.
                                            </div>

                                            <div class="form-group">
                                                <label for="localidad"></label>
                                                <select name="localidad" id="localidad" class="form-control " onclick="normal('#localidad')">
                                                    <option value="0" selected>Localidad</option>
                                                </select>
                                            </div>

                                            <label for="cp"></label>
                                            <input class="form-control form-group" name="cp" id="cp" type="text" placeholder="Código Postal" onclick="normal('#cp')" title="5 dígitos, utilice sólo números">
                                            <label for="colonia"></label>
                                            <input class="form-control form-group" name="colonia" id="colonia" type="text" placeholder="Colonia" onclick="normal('#colonia')" title="utilice mayúsculas y minúsculas">
                                            <label for="direccion"></label>
                                            <input class="form-control form-group" name="direccion" id="direccion" type="text" placeholder="Calle y Número" onclick="normal('#direccion')" title="utilice mayúsculas y minúsculas, evite el uso de #">
                                            <label for=""></label>
                                            <input id="telefono1" name="telefono1" type="text" class="form-control form-group" placeholder="Télefono 1" title="Utilice sólo números">
                                            <label for=""></label>
                                            <input id="telefono2" name="telefono2" type="text" class="form-control form-group" placeholder="Télefono 2" title="Utilice sólo números">
                                        </div>
                                    </div>
                                    <h5 class="text-center sub-expandido redondeado">Redes Sociales</h5>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for=""></label>
                                            <input type="text" class="form-control form-group" id="facebook" name="facebook" placeholder="Facebook" title="Ejemplo: https://www.facebook.com/FormacionContinuaPuebla">
                                           
                                            <input type="text" class="form-control form-group" id="twitter" name="twitter" placeholder="Twitter" title="Ejemplo: https://twitter.com/DFCPuebla">
                                           
                                             </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for=""></label>
                                            <input type="text" class="form-control form-group" id="whatsapp" name="whatsapp" placeholder="Whatsapp" title="Ejemplo: 2221190200">
                                            
                                            <input type="text" class="form-control form-group" id="sitio" name="sitio" placeholder="Sitio Web" title="Ejemplo: http://www.ejemplo.com"> </div>
                                            
                                    </div>
                                    <!--FIN PASO 1-->
                                </div>
                                <div class="tab-pane fade in" id="tab2">
                                    <!--INICIO PASO 2-->
                                    <h5 class="text-center sub-expandido redondeado">Datos Laborales</h5>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for="fecha_ingreso_sep"></label>
                                            <input class="form-control form-group datepicker" id="fecha_ingreso_sep" name="fecha_ingreso_sep" type="text" placeholder="Fecha de Ingreso a SEP" data-date-format="yyyy-mm-dd" readonly onclick="normal('#fecha_ingreso_sep')">


                                            
 <div class="panel-group" id="accordionTal2" role="tablist" aria-multiselectable="true">
                                                <label for=""></label>
                                                <div class="panel panel-default transparente">
                                                    <div class="panel-heading " role="tab" id="headingTal2">
                                                        <h4 class="panel-title"> <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTal2" aria-expanded="true" aria-controls="collapseTal2"> <span class="pestana">Claves Presupuesales</span> <span class="icon-expand-more icon-accordion"></span> </a> </h4> </div>
                                                    <div id="collapseTal2" class="panel-collapse expand" role="tabpanel" aria-labelledby="headingTal">
                                                        <div class="panel-body transparente">

                                                            <input type="text" id="talon1" name="talon1" class="form-control form-group" placeholder="Clave Presupuestal 1" onclick="normal('#talon1')" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon2" name="talon2" class="form-control form-group" placeholder="Clave Presupuestal 2" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon3" name="talon3" class="form-control form-group" placeholder="Clave Presupuestal 3" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon4" name="talon4" class="form-control form-group" placeholder="Clave Presupuestal 4" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon5" name="talon5" class="form-control form-group" placeholder="Clave Presupuestal 5" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon6" name="talon6" class="form-control form-group" placeholder="Clave Presupuestal 6" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon7" name="talon7" class="form-control form-group" placeholder="Clave Presupuestal 7" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon8" name="talon8" class="form-control form-group" placeholder="Clave Presupuestal 8" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon9" name="talon9" class="form-control form-group" placeholder="Clave Presupuestal 9" title="Utilice mayúsculas y espacios">
                                                            <input type="text" id="talon10" name="talon10" class="form-control form-group" placeholder="Clave Presupuestal 10" title="Utilice mayúsculas y espacios">

                                                        </div>
                                                    </div>
                                                </div>



                                            </div>



                                        </div>

                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">


                                                <label for=""></label>
                                                <select name="num_plazas" id="num_plazas" class="form-control form-group" onchange="plazas()">
                                                    <option value="0" selected disabled>Número de Plazas</option>
                                                    <option value="1">Una</option>
                                                    <option value="2">Dos</option>
                                                    <option value="3">Tres</option>

                                                </select>



                                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                <label for=""></label>
                                                <div class="panel panel-default transparente form-group hide" id="plaza1">
                                                    <div class="panel-heading" role="tab" id="headingOne">
                                                        <h4 class="panel-title"> <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> <span class="pestana">Primera Plaza</span> <span class="icon-expand-more icon-accordion"></span> </a> </h4> </div>
                                                    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                                        <div class="panel-body transparente">
                                                            <label for="funcion1"></label>

                                                            <div class="form-group">

                                                                <select id="funcion1" name="funcion1" class="form-control" onchange="especifica('funcion1','otro1')" onclick="normal('#funcion1')">
                                                                    <option value="0" selected disabled>Función</option>
                                                                    <option value="1">ATP</option>
                                                                    <option value="2">Subdirector Acádemico</option>
                                                                    <option value="3">Director</option>
                                                                    <option value="4">Supervisor de Zona</option>
                                                                    <option value="5">Pensionado</option>
                                                                    <option value="6">Docente</option>
                                                                    <option value="7">Otro</option>
                                                                </select>
                                                            </div>


                                                            <textarea class="form-group form-control hide" name="otro1" id="otro1" rows="3" placeholder="Especificar actividad"></textarea>

                                                            <!-- <label for="nivel1"></label>
                                                            <select id="nivel1" onchange="cambiar(this.id,'tipo1')" class="form-control form-group" >
                                                                <option value="0" disabled selected>Nivel</option>
                                                                <option value="1">Inicial</option>
                                                                <option value="2">Preescolar</option>
                                                                <option value="3">Primaria</option>
                                                                <option value="4">Secundaria</option>
                                                                <option value="5">Educación Especial</option>
                                                                <option value="6">Educación Artistica</option>
                                                                <option value="7">Técnologica</option>
                                                                <option value="8">CAPEP</option>
                                                                <option value="9">Extra escolar</option>
                                                                <option value="10">De confianza</option>
                                                                <option value="11">Media Superior</option>
                                                                <option value="12">Superior</option>
                                                                <option value="13">Normales</option>
                                                                <option value="14">UPN</option>
                                                            </select>
                                                            <label for="tipo1"></label>
                                                            <select id="tipo1" class="form-control form-group hide" ></select>
                                                            -->

                                                            <div class="form-group">
                                                                <select name="nombramiento1" id="nombramiento1" class=" form-control"  onclick="normal('#nombramiento1')">

                                                                    <option value="0" disabled selected>Tipo de Nombramiento</option>
                                                                    <option value="1">Provisional</option>
                                                                    <option value="2">Tiempo Fijo</option>
                                                                    <option value="3">Definitivo</option>


                                                                </select>

                                                            </div>

                                                            <label for="fecha_nombramineto1"></label>
                                                            <input class="form-control form-group datepicker" id="fecha_nombramiento1" name="fecha_nombramiento1" type="text" placeholder="Fecha de Nombramiento" data-date-format="yyyy-mm-dd" readonly onclick="normal('#fecha_nombramiento1')">

                                                            <div class="row">

                                                                <div class="col-xs-9">
                                                                    <input type="text" id="cct1" name="cct1" class="form-control form-group" placeholder="Clave del Centro de Trabajo" title="Utilice mayúsculas y presione el botón lateral derecho">

                                                                </div>




                                                                <div class="col-xs-3">
                                                                    <span class="btn btn-default form-control icon-check" onclick="validarCT(document.getElementById('cct1').value,'resultado1')"></span>
                                                                </div>



                                                            </div>
                                                            Ejemplo: 21DAI0002Y





                                                            <div id="resultado1"></div>
                                                            
                                                  



                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="panel panel-default transparente hide form-group" id="plaza2">
                                                    <div class="panel-heading" role="tab" id="headingTwo">
                                                        <h4 class="panel-title"> <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> <span class="pestana">Segunda Plaza</span> <span class="icon-expand-more icon-accordion"></span> </a> </h4> </div>
                                                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                        <div class="panel-body transparente">
                                                            <label for="funcion2"></label>

                                                            <div class="form-group">

                                                                <select id="funcion2" name="funcion2" class="form-control " onchange="especifica('funcion2','otro2')" onclick="normal('#funcion2')" >
                                                                    <option value="0" selected disabled>Función</option>
                                                                    <option value="1">ATP</option>
                                                                    <option value="2">Subdirector Acádemico</option>
                                                                    <option value="3">Director</option>
                                                                    <option value="4">Supervisor de Zona</option>
                                                                    <option value="6">Docente</option>
                                                                    <option value="7">Otro</option>
                                                                </select>
                                                            </div>


                                                            <textarea class="form-group form-control hide" name="" id="otro2" rows="3" placeholder="Especificar actividad"></textarea>



                                                            <div class="form-group">
                                                                <select name="" id="nombramiento2" class=" form-control" onclick="normal('#nombramiento2')">

                                                                    <option value="0" disabled selected>Tipo de Nombramiento</option>
                                                                    <option value="1">Provisional</option>
                                                                    <option value="2">Tiempo Fijo</option>
                                                                    <option value="3">Definitivo</option>


                                                                </select>

                                                            </div>

                                                            <label for="fecha_nombramineto2"></label>
                                                            <input class="form-control form-group datepicker" id="fecha_nombramiento2" name="fecha_nombramiento2" type="text" placeholder="Fecha de Nombramiento" data-date-format="yyyy-mm-dd" readonly onclick="normal('#fecha_nombramiento2')">

                                                            <div class="row">

                                                                <div class="col-xs-9">
                                                                    <input type="text" id="cct2" name="cct2" class="form-control form-group" placeholder="Clave del Centro de Trabajo">
                                                                </div>




                                                                <div class="col-xs-3">
                                                                    <span class="btn btn-default form-control icon-check" onclick="validarCT(document.getElementById('cct2').value,'resultado2')" title="Utilice mayúsculas" ></span>
                                                                </div>


                                                            </div>





                                                            <div id="resultado2"></div>
                                                            
                                                     

                                                        </div>
                                                    </div>
                                                </div>

                                                <label for=""></label>
                                                <div class="panel panel-default transparente form-group hide" id="plaza3">
                                                    <div class="panel-heading" role="tab" id="headingThree">
                                                        <h4 class="panel-title"> <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> <span class="pestana">Tercera Plaza</span> <span class="icon-expand-more icon-accordion"></span> </a> </h4> </div>
                                                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                        <div class="panel-body transparente">
                                                            <label for="funcion3"></label>

                                                            <div class="form-group">

                                                                <select id="funcion3" name="funcion3" class="form-control " onchange="especifica('funcion3','otro3')" onclick="normal('#funcion3)">
                                                                    <option value="0" selected disabled>Función</option>
                                                                    <option value="1">ATP</option>
                                                                    <option value="2">Subdirector Acádemico</option>
                                                                    <option value="3">Director</option>
                                                                    <option value="4">Supervisor de Zona</option>
                                                                    <option value="5">Pensionado</option>
                                                                    <option value="6">Docente</option>
                                                                    <option value="7">Otro</option>
                                                                </select>
                                                            </div>


                                                            <textarea class="form-group form-control hide" name="" id="otro3" rows="3" placeholder="Especificar actividad"></textarea>

                                                            <!-- <label for="nivel1"></label>
                                                            <select id="nivel1" onchange="cambiar(this.id,'tipo1')" class="form-control form-group" >
                                                                <option value="0" disabled selected>Nivel</option>
                                                                <option value="1">Inicial</option>
                                                                <option value="2">Preescolar</option>
                                                                <option value="3">Primaria</option>
                                                                <option value="4">Secundaria</option>
                                                                <option value="5">Educación Especial</option>
                                                                <option value="6">Educación Artistica</option>
                                                                <option value="7">Técnologica</option>
                                                                <option value="8">CAPEP</option>
                                                                <option value="9">Extra escolar</option>
                                                                <option value="10">De confianza</option>
                                                                <option value="11">Media Superior</option>
                                                                <option value="12">Superior</option>
                                                                <option value="13">Normales</option>
                                                                <option value="14">UPN</option>
                                                            </select>
                                                            <label for="tipo1"></label>
                                                            <select id="tipo1" class="form-control form-group hide" ></select>
                                                            -->

                                                            <div class="form-group">
                                                                <select name="" id="nombramiento3" class=" form-control" onclick="normal('#nombramiento3')">

                                                                    <option value="0" disabled selected>Tipo de Nombramiento</option>
                                                                    <option value="1">Provisional</option>
                                                                    <option value="2">Tiempo Fijo</option>
                                                                    <option value="3">Definitivo</option>


                                                                </select>

                                                            </div>

                                                            <label for="fecha_nombramineto3"></label>
                                                            <input class="form-control form-group datepicker" id="fecha_nombramiento3" name="fecha_nombramiento3" type="text" placeholder="Fecha de Nombramiento" data-date-format="yyyy-mm-dd" readonly onclick="normal('#fecha_nombramiento3')">

                                                            <div class="row">

                                                                <div class="col-xs-9">
                                                                    <input type="text" id="cct3" name="cct3" class="form-control form-group" placeholder="Clave del Centro de Trabajo">
                                                                </div>




                                                                <div class="col-xs-3">
                                                                    <span class="btn btn-default form-control icon-check" onclick="validarCT(document.getElementById('cct3').value,'resultado3')" title="Utilice mayúsculas"></span>
                                                                </div>


                                                            </div>





                                                            <div id="resultado3"></div>
                                                            
 
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <div class="margen "></div>
                                    <!--FIN PASO 2-->
                                </div>
                                <div class="tab-pane fade in" id="tab3">
                                    <h5 class="text-center sub-expandido redondeado">Datos Acádemicos</h5>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">


                                                <label for=""></label>
                                                <select class="form-control form-group " id="grado" name="grado" placeholder="ltimo Grado de Estudios Terminado" onclick="normal('#grado')">
                                                    <option value="0" selected disabled>Último Grado de Estudios Terminado</option>
                                                    <option value="1">Primaria</option>
                                                    <option value="2">Media Superior</option>
                                                    <option value="3">Normal Docente</option>
                                                    <option value="4">Licenciatura</option>
                                                    <option value="5">Maestría</option>
                                                    <option value="6">Doctorado</option>
                                                    <option value="7">Postdoctorado</option>
                                                </select>





                                                <select  id="estatus" name="estatus" class="form-control form-group" onclick="normal('#estatus')">
                                                    <option value="0" selected disabled>Estatus</option>
                                                    <option value="1">Titulado</option>
                                                    <option value="2">No Titulado</option>
                                                    <option value="3">En Proceso de Titulación</option>
                                                </select>





                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for=""></label>
                                            <textarea class="form-group form-control" name="cursos" id="diplomados" rows="3" placeholder="Diplomados cursados en los últimos 3 años"></textarea>
                                            <textarea class="form-group form-control" name="diplomados" id="cursos" rows="3" placeholder="Cursos y/o talleres cursados en los últimos 3 años"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade in" id="tab4">
                                    <div class="row">



                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">
                                            <h5 class="text-center sub-expandido redondeado">Confirmar Información</h5>

                                            <div id="datos" class="container"></div>

                                        </div>

                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group">
                                            <h5 class="text-center sub">Crear Usuario</h5>

                                            <input type="text" id="usuario" class="form-control form-group" placeholder="Nombre de Usuario" readonly="">
                                            <input type="password" id="pass"  name="pass" class="form-control form-group" placeholder="Contraseña" >
                                            <input type="password" id="pass2" name="pass2" class="form-control form-group" placeholder="Confirmar Contraseña">
                                            <input  class="form-control btn btn-default" type="file" id ="imagen" name="imagen" accept="image/*" title="Busque una imagen de perfil!" data-filename-placement="inside">

                                            <div class="form-group ">
                                                <div class="margen"></div>


                                            </div>
                                        </div>
                                    </div>


                                    <h5 class="text-center sub">Glosario</h5>
                                    <div class="row">


                                        <div class="col-xs-12 col-sm-3">
                                            <span class="text-default"><b>Función</b></span>
                                            <br>
                                            <br>
                                            <b>1 :</b>ATP
                                            <br>
                                            <b>2 :</b>Subdirector Acádemico
                                            <br>
                                            <b>3 :</b>Director
                                            <br>
                                            <b>4 :</b>Supervisor de Zona
                                            <br>
                                            <b>5 :</b>Pensionado
                                            <br>
                                            <b>6 :</b>Docente
                                            <br>
                                            <b>7 :</b>Otro
                                            <br>

                                        </div>

                                        <div class="col-xs-12 col-sm-3">

                                            <span class="text-default"><b>Nombramiento</b></span>
                                            <br>
                                            <br>
                                            <b>1 :</b>Provisional
                                            <br>
                                            <b>2 :</b>Tiempo Fijo
                                            <br>
                                            <b>3 :</b>Definitivo
                                            <br>

                                        </div>

                                        <div class="col-xs-12 col-sm-3">

                                            <span class="text-default"><b>Grado</b></span>
                                            <br>
                                            <br>
                                            <b>1:</b>Primaria<br>

                                            <b>2:</b>Media Superior<br>

                                            <b>3:</b>Normal Docente<br>

                                            <b>4:</b>Licenciatura<br>

                                            <b>5:</b>Maestría<br>

                                            <b>6:</b>Doctorado<br>

                                            <b>7:</b>PostDoctorado<br>


                                        </div>

                                        <div class="col-xs-12 col-sm-3">

                                            <span class="text-default"><b>Estatus</b></span>
                                            <br>
                                            <br>
                                            <b>1:</b>Titulado<br>

                                            <b>2:</b>No Titulado<br>

                                            <b>3:</b>En Proceso de Titulación<br>

                                        </div>



                                    </div>

                                    <div class="margen"></div>


                                </div>


                                <div class="tab-pane fade in" id="tab5">
                                    <div class="row">








                                        <div class="col-xs-12 col-sm-6 col-md-8 col-md-offset-2 form-group">
                                             <h5 class="text-center sub-expandido redondeado">¡Listo!</h5>

                                            <br>
                                            <br>
                                            <h4 class="text-center">Ahora que ha proporcionado y verificado toda la información puede finalizar su registro, presione el botón para continuar</h4>
                                            <br>
                                            <br>
                                            <span class="btn btn-default col-xs-12 col-md-6 col-md-offset-3" onclick="enviar()"><span class="icon-check " id="aceptar"></span>Aceptar</span><br><br>
<h5 class="text-center sub hide" id="tiempo"><span class="icon-clock"></span> Estamos procesando su solicitud, por favor espere...</h5>

                                        </div>
                                    </div>



                                    <div class="margen"></div>


                                </div>


                            </div>
                            <div class="fondoAzul margen redondeado-bottom">
                                <ul class="pager wizard">
                                    <li class="previous first" style="display:none;"><a href="#">First</a> </li>
                                    <li class="previous"><a href="#"><span class="icon-keyboard-arrow-left"></span>Anterior</a> </li>
                                    <li class="next last" style="display:none;"><a href="#">Last></a> </li>
                                    <li class="next"><a href="#">Siguiente<span class="icon-keyboard-arrow-right margen1"></span></a> </li>
                                </ul>

                            </div>

                        </div>

                        <div class="margen"></div>

                    </form>

                </div>
            </div>
            <!-- Body end -->
        </div>
        <div class="margen"></div>
        <div class="margen"></div>
        <div id="footer">
            <!-- Footer start -->


            <?php include "../recursos/pie.html"; ?>



            <!-- Footer end -->
        </div>
    </div>


    <script src="../js/jquery.js"></script>
    <script src="../js/modernizr.js"></script>
    <script src="../js/menu.min.js"></script>
    <script src="../js/jquery.backstretch.min.js "></script>
    <script src="../js/recursos.min.js"></script>
    <script src="../js/bootstrap.min.js "></script>
    <script src="../js/jquery.bootstrap.wizard.min.js"></script>
    <script src="../js/bootstrap-datepicker.min.js"></script>
    <script src="../js/locales/bootstrap-datepicker.es.min.js"></script>
    <script src="../js/validacion.js"></script>
    <script src="../js/bootstrap-select.min.js"></script>
    <script src="../js/bootstrap-fileinput.js"></script>
    <script>
        $(document).ready(function () {
            $('#rootwizard').bootstrapWizard({
                onNext: function (tab, navigation, index) {

                    var validar;
                    validar = validacion(tab, navigation, index);
                    actualizarDatos();

                    return validar;
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var actual = index + 1;
                    var porcentaje = (actual / total) * 100;
                    $('#rootwizard .progress-bar').css({
                        width: porcentaje + '%'
                    });
                },
                onTabClick: function (tab, navigation, index) {

                    return false;
                }
            });
        });
    </script>
    <script>
        $('.datepicker').datepicker({
            endDate: 'tomorrow',
            language: 'es',
            autoclose: 'true',
            startView : 'decade'
        });
    </script>
    <script>

    $('input[type=file]').bootstrapFileInput();
$('.file-inputs').bootstrapFileInput();
</script>
    <script>
        var tipo = {};
        tipo[2] = ['Tipo', 'Regular', 'Indígena'];
        tipo[3] = ['Tipo', 'Regular', 'Indígena', 'Multigrado Regular', 'Multigrado Indígena'];
        tipo[4] = ['Tipo', 'General', 'Técnica', 'Telesecundaria'];

        function cambiar(comboNivel, comboTipo) {
            var nivelLista = document.getElementById(comboNivel);
            var modelList = document.getElementById(comboTipo);
            var seleccion = nivelLista.options[nivelLista.selectedIndex].value;
            if (seleccion == 1 || seleccion > 4) {
                $('#' + comboTipo).addClass('hide');
            } else {
                $('#' + comboTipo).removeClass('hide');
                while (modelList.options.length) {
                    modelList.remove(0);
                }
                var tipos = tipo[seleccion];
                if (tipos) var i;
                for (i = 0; i < tipos.length; i++) {
                    var opcion = new Option(tipos[i], tipos[i]);
                    modelList.options.add(opcion);
                }
                modelList["0"].disabled = true;
            }
        }
    </script>



    <script>
        function getCombo2(id_combo1, id_div,tabla, criterio, value, texto, place, orden) {

            $('#cargaCombo').removeClass('hide');


            $.ajax({
                url: "../php/get_combo2.php",
                type: "POST",
                data: "id_combo1=" + id_combo1 + "&tabla=" + tabla + "&criterio=" + criterio + "&value=" + value + "&texto=" + texto + "&place=" + place + "&orden=" + orden,
                success: function (resp) {
                    $('#' + id_div).html(resp);
                    $('#cargaCombo').addClass('hide');
                }
            });

        }
    </script>



    <script>
        function plazas() {

            if ($('#num_plazas').val() != null) {

                var plazas = $('#num_plazas').val();
                if (plazas == '1') {

                    $('#plaza1').removeClass('hide');
                    $('#plaza2').addClass('hide');
                    $('#plaza3').addClass('hide');

                } else if (plazas == '2') {



                    $('#plaza1').removeClass('hide');
                    $('#plaza2').removeClass('hide');
                    $('#plaza3').addClass('hide');


                } else if (plazas == '3') {



                    $('#plaza1').removeClass('hide');
                    $('#plaza2').removeClass('hide');
                    $('#plaza3').removeClass('hide');


                }



            }
        }

        function especifica(comboFuncion, especificar) {

            var lista = document.getElementById(comboFuncion);
            var seleccion = lista.options[lista.selectedIndex].value;

            if (seleccion == 7) {
                $('#' + especificar).removeClass('hide');

            } else {

                $('#' + especificar).addClass('hide');
                $('#' + especificar).val("");
            }


        }
    </script>

    <script>
        
          var siguiente = true;
            var campos;
            var error = "Por favor resuelva los siguientes problemas antes de continuar\n\n";
  
        function validacion(tab,navigation,index){


          
            if (index == 1) {
                 siguiente=true;
                 error = "Por favor resuelva los siguientes problemas antes de continuar\n\n";



                 campos = ['estado','municipio','localidad','sexo'];

                if(!combo(campos)){

                    siguiente=false;
                }


                 campos = ['#rfc', '#homoclave', '#curp', '#direccion', '#nombre','#colonia','#cp', '#apellido_p', '#apellido_m', '#fecha_nacimiento'];



                if (!alfaNumericos(campos)) {
                    siguiente = false;

                }

                var codigo=document.getElementById("cp").value;
                if(!cp(codigo)){

                    $('#cp').addClass('incorrecto');
                    siguiente=false;



                }

                var correo =document.getElementById("correo").value;
                if(!noVacio(correo)){

                    $('#correo').addClass('incorrecto');
                    siguiente=false;

                }


                if(!siguiente){

                    error += "\n\nUno o más campos vacíos o incorrectos";
                }





            } else if (index == 2) {
                
                 siguiente=true;
                error = "Por favor resuelva los siguientes problemas antes de continuar\n\n";


                campos = ['#fecha_ingreso_sep', '#talon1'];
                if (!alfaNumericos(campos)) {
                    siguiente = false;

                }
                
                campos =['num_plazas'];
                
                if(!combo(campos)){
                    siguiente = false;
                }


                var plaza = $('#num_plazas').val();


                if (plaza == '1') {

                    validarPlaza('1');
                   


                    if ($('#actividad1').val() == '7') {

                        campos = ['#otro1'];
                    }





                    if (!alfaNumericos(campos)) {
                        siguiente = false;
                    }



                    if (resultado1 != null) {

                        if (resultado1.indexOf("Error") > -1) {
                            siguiente = false;
                            error += "\nCT no encontrado";

                        }


                    } else {
                        siguiente = false;
                        error += "\nCT no encontrado";
                    }
                } else if (plaza == '2') {


                    siguiente=validarPlaza('1')&&validarPlaza('2');




                    if ($('#actividad1').val() == '7' && $('#actividad2').val() == '7') {

                        campos = ['#otro1', '#otro2'];
                    } else if ($('#actividad1').val() == '7') {

                        campos = ['#otro1'];
                    } else if ($('#actividad2').val() == '7') {

                        campos = ['#otro2'];
                    }




                    if (!alfaNumericos(campos)) {
                        siguiente = false;
                    }


                    if (resultado1 != null) {

                        if (resultado1.indexOf("Error") > -1) {
                            siguiente = false;
                            error += "\nCT no encontrado";

                        }


                    } else {
                        siguiente = false;
                        error += "\nCT no encontrado";
                    }


                    if (resultado2 != null) {

                        if (resultado2.indexOf("Error") > -1) {
                            siguiente = false;
                            error += "\nCT no encontrado";

                        }


                    } else {
                        siguiente = false;
                        error += "\nCT no encontrado";
                    }
                } else if (plaza == '3') {


                    siguiente=validarPlaza('1')&&validarPlaza('2')&& validarPlaza('3');


                    if ($('#actividad1').val() == '7' && $('#actividad2').val() == '7' && $('#actividad3').val() == '7') {

                        campos = ['#otro1', '#otro2', '#otro3'];
                    } else if ($('#actividad1').val() == '7' && $('#actividad2').val() == '7') {

                        campos = ['#otro1', '#otro2'];
                    } else if ($('#actividad1').val() == '7' && $('#actividad3').val() == '7') {

                        campos = ['#otro1', '#otro3'];
                    } else if ($('#actividad2').val() == '7' && $('#actividad3').val() == '7') {

                        campos = ['#otro2', '#otro3'];
                    } else if ($('#actividad1').val() == '7') {

                        campos = ['#otro1'];
                    } else if ($('#actividad2').val() == '7') {

                        campos = ['#otro2'];
                    } else if ($('#actividad3').val() == '7') {

                        campos = ['#otro3'];
                    }



                    if (!alfaNumericos(campos)) {
                        siguiente = false;
                    }






                    if (resultado1 != null) {

                        if (resultado1.indexOf("Error") > -1) {
                            siguiente = false;
                            error += "\nCT no encontrado";

                        }


                    } else {
                        siguiente = false;
                        error += "\nCT no encontrado";
                    }


                    if (resultado2 != null) {

                        if (resultado2.indexOf("Error") > -1) {
                            siguiente = false;
                            error += "\nCT no encontrado";

                        }


                    } else {
                        siguiente = false;
                        error += "\nCT no encontrado";
                    }

                    if (resultado3 != null) {

                        if (resultado3.indexOf("Error") > -1) {
                            siguiente = false;
                            error += "\nCT no encontrado";

                        }


                    } else {
                        siguiente = false;
                        error += "\nCT no encontrado";
                    }
                }

                 if(!siguiente){

                    error += "\n\nUno o más campos vacíos o incorrectos";
                }





            } else if (index == 3) {
                 siguiente=true;
                error = "Por favor resuelva los siguientes problemas antes de continuar\n\n";
                campos = ['#grado', '#estatus'];
                if (!requerido(campos)) {
                    siguiente = false;
                }


                /*campos = ['#diplomados', '#cursos'];
                  if (!alfaNumericos(campos)) {
                    siguiente = false;

                }
*/



                 if(!siguiente){

                    error += "\n\nUno o más campos vacíos o incorrectos";
                }







            } else if (index == 4) {
                 siguiente=true;
                error = "Por favor resuelva los siguientes problemas antes de continuar\n\n";
                campos = ['#usuario', '#pass', '#pass2'];

                if (!alfaNumericos(campos)) {
                    siguiente = false;
                    error += "\n\nUno o más campos vacíos o incorrectos";
                }



                if (esDif($('#pass').val(), $('#pass2').val())) {
                    siguiente = false;
                    error += "\n\nLas contraseñas no coinciden";
                }


            }



            if (!siguiente) {

                alert(error);
                var posicion = $('#pestana').offset().top;
                $("html, body").animate({
                    scrollTop: posicion
                }, 1300);
            } else {

                $('.incorrecto').removeClass('incorrecto');
            }

            return siguiente;



        }
        
        
              function validarPlaza(numPlaza) {
           

            campos = ['funcion' + numPlaza, 'nombramiento' + numPlaza];
            

            if (!combo(campos)) {
                siguiente = false;



            }
            campos = ['#fecha_nombramiento' + numPlaza];

            if (!requerido(campos)) {
                siguiente = false;

            }

          
        }



    </script>

    <script>
        var resultado1, resultado2, resultado3;

        function validarCT(clave, id) {
            $.ajax({
                url: "../php/validarCT.php",
                type: "POST",
                data: "clave=" + clave,
                success: function (resp) {
                    $('#' + id).html(resp);
                    if (id == 'resultado1') {
                        resultado1 = resp;
                    } else if (id == 'resultado2') {

                        resultado2 = resp;
                    } else if (id == 'resultado3') {

                        resultado3 = resp;

                    }
                }
            });
        }
    </script>


   <script>

       function enviar(){


		$("#tiempo").removeClass("hide");
           var arreglo = ['curp', 'rfc', 'homoclave', 'nombre', 'apellido_p', 'apellido_m', 'fecha_nacimiento', 'sexo', 'estado', 'municipio', 'localidad', 'cp', 'colonia','telefono1','telefono2', 'direccion','correo' ,'facebook', 'twitter', 'whatsapp', 'sitio', 'fecha_ingreso_sep','num_plazas' ,'funcion1', 'otro1','nombramiento1','fecha_nombramiento1', 'cct1',  'funcion2', 'otro2', 'nombramiento2','fecha_nombramiento2' ,'cct2', 'funcion3', 'otro3', 'nombramiento3','fecha_nombramiento3', 'cct3', 'talon1', 'talon2', 'talon3', 'talon4', 'talon5', 'talon6', 'talon7', 'talon8', 'talon9', 'talon10', 'grado', 'estatus', 'cursos', 'diplomados','pass','pass2'];


           var file = document.getElementById("imagen");
           var formData = new FormData();


            formData.append("imagen", file.files[0]);

            for(var i=0;i<arreglo.length;i++){

               var nombre=document.getElementById(arreglo[i]).getAttribute("name");
                var valor= document.getElementById(arreglo[i]).value;

                formData.append(nombre,valor);

           }
		



            $.ajax({
                url: "../php/alta.php",
                type: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (resp) {
                   alert(resp);
				$("#tiempo").addClass("hide");
                   if(resp.indexOf("Felicidades")>-1){
					  
                       location.href = "../inicio";


                   }
                }
            });

       }



   </script>


    <script>
        function actualizarDatos() {


            var elementos = "";
            var arreglo = ['curp', 'rfc', 'homoclave', 'nombre', 'apellido_p', 'apellido_m', 'fecha_nacimiento', 'sexo', 'estado', 'municipio', 'localidad', 'cp', 'colonia', 'direccion', 'facebook', 'twitter', 'whatsapp', 'sitio', 'fecha_ingreso_sep', 'funcion1', 'otro1','nombramiento1','fecha_nombramiento1', 'cct1',  'funcion2', 'otro2', 'nombramiento2','fecha_nombramiento2' ,'cct2', 'funcion3', 'otro3', 'nombramiento3','fecha_nombramiento3', 'cct3', 'talon1', 'talon2', 'talon3', 'talon4', 'talon5', 'talon6', 'talon7', 'talon8', 'talon9', 'talon10', 'grado', 'estatus', 'cursos', 'diplomados'];
            var nombre;

            for (var i = 0; i < arreglo.length; i++) {
                var elemento = document.getElementById(arreglo[i]).value;
                if (elemento!= ""&&elemento!='0') {
                    nombre = capitalizar(arreglo[i]);
                    elementos += "<br><b><span class='text-default'>" + nombre + ": </span> <span>" + elemento + "</span></b>";
                }


            }

            document.getElementById("usuario").value = document.getElementById(arreglo[0]).value;


            document.getElementById("datos").innerHTML = elementos;
        }

        function capitalizar(cadena) {
            return cadena.charAt(0).toUpperCase() + cadena.slice(1);
        }
    </script>


<script>
    function formulario(valor){

        if(valor=="rEgIsTrO.DOCENTE.2015"){

            $("#test").addClass("hide");
            $("#rootwizard").removeClass("hide");
        }
        else{

            $("#rootwizard").addClass("hide");
            $(".icon-sad").removeClass("hide");
        }


    }


</script>


</body>

</html>

<?php
}
    ?>




<style>

    nav{

        display:none;
    }
    
    .menu_bar .icon-menu{
        display:none;
    }


</style>
