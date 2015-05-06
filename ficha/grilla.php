<?php
$link=pg_connect("host=192.168.54.11 user=uv0049 password=polo920usual port=5432 dbname=me");

//$link=pg_connect(PG_CONNECTION_STRING);

$array =array("101", "102","103");

$query="SELECT Distinct m.pidserv, m.pclave, m.cue, m.anexo, m.pnombre, idperiodo 
FROM unidades_educativas m join escuelas e on m.pidserv = e.idserv";

$i=0;
foreach ($array as $j => $value) {
  if ($i==0) {
     $query .= " WHERE (m.pidserv= ".$array[$j]."and m.idperiodo= 58) " ;}
     
  else
     {$query .= " OR (m.pidserv= ".$array[$j]." and m.idperiodo= 58)";}
  $i++; 
  }


$result = pg_query($query);
$nbrows = pg_num_rows($result);
$start = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$end = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$limit = $query. ' LIMIT ' . $end . ' OFFSET '. $start ;
$result = pg_query($limit); 
  if($nbrows>0){
     while($rec = pg_fetch_object($result))
	{$arr[] = $rec;	}
	echo '({"total":"'.$nbrows.'","results":'.json_encode($arr).'})';
   } 
?>

