 <?php
  $link = pg_Connect("host=192.168.54.11 user=uv0049 password=polo920usual port=5432 dbname=me port=5432");
  $sql = "select i.dominio, t.descripcion from indicadores i join ts_cod_dominios t on i.dominio = t.dominio
          where t.dominio = 'D'
          group by i.dominio, t.descripcion ";
    if (!$link) {
        echo "error";
    } else {
    $result = pg_query($link, $sql);
    $rows = array();
    $totaldata = pg_num_rows($result);
    while($r = pg_fetch_assoc($result)) {
        $rows[] = $r;
    }
    //echo json_encode($rows);
    //echo json_encode(array('country' => $rows));
    echo '({"total":"'.$totaldata.'","data":'.json_encode($rows).'})';
    }
  ?>