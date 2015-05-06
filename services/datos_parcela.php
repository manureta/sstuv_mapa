<?php
	header("Content-Type: text/plain");

    $db = pg_connect("host=192.168.54.11 user=uv0049 password=polo920usual port=5432 dbname=me");


	$partido = $_REQUEST["partido"];
	$partida = $_REQUEST["partida"];


//$idserv = $_REQUEST["idserv"];

//$sector = $_REQUEST["sector"];

 //$sql .= "AND bus.gestiones.id = '".$_REQUEST['gestion']."' ";

$where = " (pa.catstro = '".$_REQUEST['partido']."') AND (p.partida = '$partida') ";

    $sql_count = "SELECT pa.catstro || '-' || pa.nuevo as partido, etiqueta, partida, circ, secc, manz, substr( astext (st_centroid (p.the_geom)),7,35) as punto  ";
    $sql_count .= "FROM carto_base.partidos pa JOIN carto_base.parce_nomencla p ON pa.catstro = p.partido ";
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