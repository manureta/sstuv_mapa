<?php
$coord = explode(' ',$_REQUEST['punto']);
$xml  = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'."\n";
$xml .= "\t<point id='1'>\n";
$xml .= "\t\t<wkt>POINT(".$_REQUEST['punto'].")</wkt>\n";
$xml .= "\t\t<lon>".$coord[0]."</lon>\n";
$xml .= "\t\t<lat>".$coord[1]."</lat>\n";
$xml .= "\t</point>\n";

header('Content-type: text/xml',true);
echo $xml;
?>