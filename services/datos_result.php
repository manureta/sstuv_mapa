<?php
	header("Content-Type: text/plain");

    $db = pg_connect("host=192.168.54.11 user=uv0049 password=polo920usual port=5432 dbname=me");

       $start = (integer) (isset($_POST['start']) ? $_POST['start'] : 0);
	   $end = (integer) (isset($_POST['limit']) ? $_POST['limit'] : 20);

	$sector = $_REQUEST["sector"];
	$dist = $_REQUEST["dist"];
	$tipoest = $_REQUEST["tipoest"];
	$nombre = $_REQUEST["nombre"];


//$idserv = $_REQUEST["idserv"];

//$sector = $_REQUEST["sector"];

 //$sql .= "AND bus.gestiones.id = '".$_REQUEST['gestion']."' ";

$where = " (c.idperiodo = 58) AND (c.idsector = '".$_REQUEST['sector']."') AND (codigodistrito = '".$_REQUEST['dist']."') AND (idoferta = '".$_REQUEST['tipoest']."') AND ((bus.SP_ASCII(bus.estabs.nombre) ILIKE bus.SP_ASCII ('%$nombre%')) OR (bus.SP_ASCII(bus.estabs.clave) ILIKE bus.SP_ASCII('$nombre%')) OR (bus.SP_ASCII(bus.estabs.nroest) ILIKE bus.SP_ASCII('%$nombre'))
   OR (CAST(bus.estabs.cue AS text) = '$nombre')) ";
/*
$sql_count  = "SELECT bus.gestiones.id, bus.distritos.nombre as distrito,CASE bus.estabs.localidad_id WHEN 9999 THEN localidadACodificar WHEN 0 THEN '' WHEN 9998 THEN localidadaCodificar ELSE bus.localidades.nombre END AS loca, bus.ofertas.id, bus.estabs.nombre as nombre,bus.estabs.id as idserv ,bus.ofertas.nombre as oferta,astext (ST_Transform(ST_SetSRID(ST_Point(x(the_geom),y(the_geom)),4326),900913)) AS punto ";
$sql_count .= "FROM escuelas join bus.estabs on escuelas.idserv = bus.estabs.id  join bus.distritos  on bus.estabs.distrito_id = bus.distritos.id  join bus.localidades  on bus.estabs.localidad_id = bus.localidades.id join bus.estabs_ofertas on bus.estabs.id = bus.estabs_ofertas.estab_id join bus.ofertas on bus.estabs_ofertas.oferta_id = bus.ofertas.id
join bus.gestiones on  bus.estabs.gestion_id = bus.gestiones.id ";
*/
/*
SELECT a.idserv, c.pnombre, c.idsector AS sector,t.idoferta
FROM escuelas a JOIN unidades_educativas c ON a.idserv = c.pidserv
join ts_modalidad_nivel t ON c.idnuevamodalidad = t.idnuevamodalidad AND c.idnuevonivel = t.idnuevonivel
where c.idperiodo = 55         ((x(the_geom)) || ' ' ||  (y(the_geom))) As punto  //astext (ST_SetSRID(ST_Point(x(the_geom),y(the_geom)),4326)) AS punto
*/  // astext (ST_Transform(ST_SetSRID(ST_Point(x(the_geom),y(the_geom)),4326),900913)) AS punto
    $sql_count = "SELECT a.idserv, a.clave, c.pnombre, c.idsector, t.idoferta,  bus.distritos.nombre as distrito, substr( astext (ST_SetSRID(ST_Point(x(the_geom),y(the_geom)),4326)),7,35) AS punto   ";
    $sql_count .= "FROM escuelas a JOIN bus.estabs on a.idserv = bus.estabs.id JOIN unidades_educativas c ON a.idserv = c.pidserv join ts_modalidad_nivel t ON c.idnuevamodalidad = t.idnuevamodalidad AND c.idnuevonivel = t.idnuevonivel join ts_sectores s ON c.idsector = s.idsector join bus.distritos  on bus.estabs.distrito_id = bus.distritos.id  ";
    $sql_count .= " WHERE ".$where;
    //$sql_count .= " GROUP BY ".$groupby;
	//$sql_count .= " ORDER BY ".$order;


	$sql = $sql_count /* . ' LIMIT ' . $end . ' OFFSET '. $start */;
//echo $sql;
		$result_count = pg_query($sql_count);

		$rows = pg_num_rows($result_count);

		$results = pg_query($sql);


	while($rec = pg_fetch_array($results)){

			$arr[] = $rec;
		}
		// echo ''.$_REQUEST["idserv"].'';
		echo '{"total":"' . $rows . '","data":' . json_encode($arr) . '}';

?>