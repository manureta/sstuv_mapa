<?php
	header("Content-Type: text/plain");

    $db = pg_connect("host=localhost user=uv0049 password=polo920usual port=5432 dbname=me");

      // $start = (integer) (isset($_POST['start']) ? $_POST['start'] : 0);
	  // $end = (integer) (isset($_POST['limit']) ? $_POST['limit'] : 20);

	//$sector = $_REQUEST["sector"];
	//$dist = $_REQUEST["dist"];

$where = "catstro <> 0 ";
//$groupby = "pa.catstro, pa.nuevo ";
$order = "catstro ";

    $sql_count = "SELECT catstro, catstro || '-' || nuevo as partido ";
    $sql_count .= "FROM carto_base.partidos ";
    $sql_count .= " WHERE ".$where;
  //  $sql_count .= " GROUP BY ".$groupby;
	$sql_count .= " ORDER BY ".$order;


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