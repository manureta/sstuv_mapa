<?php 
session_start();
$usuario = (isset($_SESSION['usuario'])) ? $_SESSION['usuario'] : false;
switch ($_REQUEST['o']) {
    case 'layers':
            getLayers($usuario);
            break;
    case 'login':
            login($usuario);
            break;
    case 'status':
            getStatus($usuario);
            break;
    case 'logout':
            logout();
            break;
    default:
            # code...
            break;
}

function logout(){
    session_destroy();
    echo json_encode(true);
}

function getStatus($usuario){
    echo json_encode($usuario);
}

function login($usuario){
    if(isset($_REQUEST['usuario']) && $_REQUEST['usuario'] == "edu" &&
            isset($_REQUEST['contrasena']) && $_REQUEST['contrasena'] == "edu2013"){
            $_SESSION['usuario'] = true;
            echo json_encode(true);
    }else{
            echo json_encode(false);
    }
};

function getLayers($usuario){
	if (!$usuario):
?>
var layers = [ {
        
    // Capas Base ///////////////////////////////////////////////////////////////////////////////


      {
            source: "google",
            name: "HYBRID",
            title: "Google Híbrido",
            group: "background"
        },{
            source: "google",
            name: "ROADMAP",
            title: "Google Callejero",
            group: "background"
        },{
            source: "google",
            name: "SATELLITE",
            title: "Google Satélite",
            group: "background"
        },{
            source: "google",
            name: "TERRAIN",
            title: "Google Físico",
            group: "background"
        },{
            source: "bing",
            name: "Road",
            title: "Bing Road",
            group: "background"
        },{
            source: "bing",
            name: "Aerial",
            title: "Bing Aerial",
            group: "background"
        },{
            source: "bing",
            name: "AerialWithLabels",
            title: "Bing Aerial Labels",
            group: "background"
        },{
            source: "osm",
            name: "mapnik",
            title: "Open Street Map",
            group: "background"
        },{
            source: "ol",
            group: "background",
            type: "OpenLayers.Layer.WMS",
            args: ["Sin Capa base", "http://"+urba+"/geoserver/arba/wms", {layers: 'partidos'}]
        },{
             source: "ol",
             type: "OpenLayers.Layer.WMS",
             args: ["Capa Base", "http://"+urba+"/geoserver/arba/wms", {layers: 'carto_base'}],
             title: "Capa Base",
             group: "background"
         }
]
<?php
	else:
	?>
var layers = [{
        source: "ol",
        name: "buffer",
        visibility: false,
        title: "Buffer",
        args: ["Buffer"],
        type: "OpenLayers.Layer.Vector",
        group: "consulta"
       },
        //Capas predefinidas de urBAsig
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion B4 de la Cuenca Hidrica  del Rio Salado' ",
            title: "Subregion B4 de la Cuenca Hidrica  del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion B3 de la Cuenca Hidrica del Rio Salado' ",
            title: "Subregion B3 de la Cuenca Hidrica del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion B2 de la Cuenca Hidrica  del Rio Salado' ",
            title: "Subregion B2 de la Cuenca Hidrica  del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion B1 de la Cuenca Hidrica del Rio Salado' ",
            title: "Subregion B1 de la Cuenca Hidrica del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion A4 de la Cuenca Hidrica del Rio Salado' ",
            title: "Subregion A4 de la Cuenca Hidrica del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion A3 de la Cuenca Hidrica  del Rio Salado' ",
            title: "Subregion A3 de la Cuenca Hidrica  del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion A2 de la Cuenca Hidrica  del Rio Salado' ",
            title: "Subregion A2 de la Cuenca Hidrica  del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Subregion A1 de la Cuenca Hidrica del Rio Salado' ",
            title: "Subregion A1 de la Cuenca Hidrica del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Matanza Riachuelo' ",
            title: "Cuenca Matanza Riachuelo",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica vertiente Rio de la Plata Inferior' ",
            title: "Cuenca Hidrica vertiente Rio de la Plata Inferior",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Sauce Grande' ",
            title: "Cuenca Hidrica del Rio Sauce Grande",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Salado' ",
            title: "Cuenca Hidrica del Rio Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Quequen Salado' ",
            title: "Cuenca Hidrica del Rio Quequen Salado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Quequen Grande' ",
            title: "Cuenca Hidrica del Rio Quequen Grande",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Colorado' ",
            title: "Cuenca Hidrica del Rio Colorado",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Reconquista' ",
            title: "Cuenca Hidrica del Rio Reconquista",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica del Rio Chasico' ",
            title: "Cuenca Hidrica del Rio Chasico",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  vertiente Rio de la Plata Superior' ",
            title: "Cuenca Hidrica  vertiente Rio de la Plata Superior",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  vertiente Rio de la Plata Intermedia' ",
            title: "Cuenca Hidrica  vertiente Rio de la Plata Intermedia",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  vertiente Atlantica Sudeste' ",
            title: "Cuenca Hidrica  vertiente Atlantica Sudeste",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  vertiente Atlantica Este' ",
            title: "Cuenca Hidrica  vertiente Atlantica Este",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  del Rio Sauce Chico' ",
            title: "Cuenca Hidrica  del Rio Sauce Chico",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  del Rio Samborombon' ",
            title: "Cuenca Hidrica  del Rio Samborombon",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  del Rio Lujan' ",
            title: "Cuenca Hidrica  del Rio Lujan",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  del Rio Arrecifes' ",
            title: "Cuenca Hidrica  del Rio Arrecifes",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  del Rio Areco' ",
            title: "Cuenca Hidrica  del Rio Areco",            
            group: "cuencas"
        },
        {                
            source: "urbasig",
            name: "cuencas_g",
            visibility: false,
            cql_filter: "nom = 'Cuenca Hidrica  del Arroyo del Medio' ",
            title: "Cuenca Hidrica  del Arroyo del Medio",            
            group: "cuencas"
        },
        {
            source: "urbasig",
            name: "municipalidades",
            visibility: false,
            title: "Municipalidades",
            group: "muni"
        },
        {
            source: "urbasig",
            name: "cuencas",
            visibility: false,
            title: "Limite de Cuencas",
            group: "lim"
        },
        {
            source: "urbasig",
            name: "decreto3202",
            visibility: false,
            title: "Decreto 3202",
            group: "dec"
        },
         {
            source: "urbasig",
            name: "etapas_del_proceso_de_planeamiento",
            visibility: false,
            cql_filter: "etapas_pla = 'Zonificacion + Plan de Ordenamiento Urbano' ",
            title: "Zonificacion + Plan de Ordenamiento Urbano",
            group: "etapas"
        },
         {
            source: "urbasig",
            name: "etapas_del_proceso_de_planeamiento",
            visibility: false,
            cql_filter: "etapas_pla = 'Zonificacion' ",
            title: "Zonificación",
            group: "etapas"
        },
         {
            source: "urbasig",
            name: "etapas_del_proceso_de_planeamiento",
            visibility: false,
            cql_filter: "etapas_pla = 'Plan de Ordenameinto Urbano' ",
            title: "Plan de Ordenameinto Urbano",
            group: "etapas"
        },
         {
            source: "urbasig",
            name: "etapas_del_proceso_de_planeamiento",
            visibility: false,
            cql_filter: "etapas_pla = 'Delimitacion Preliminar de Areas + Plan Urbano' ",
            title: "Delimitacion Preliminar de Areas + Plan Urbano",
            group: "etapas"
        },
        {
            source: "urbasig",
            name: "etapas_del_proceso_de_planeamiento",
            visibility: false,
            cql_filter: "etapas_pla = 'Delimitacion Preliminar de Areas' ",
            title: "Delimitacion Preliminar de Areas",
            group: "etapas"
        },
        {
            source: "urbasig",
            name: "villas_asentamientos",
            visibility: false,
            title: "Asentamientos Precarios",
            group: "asen"
        },
    {
            source: "urbasig",
            name: "urbcerradas",
            visibility: false,
            cql_filter: "fuente = 'DOU' ",
            title: "DOU",
            group: "uc"
    },
	{
            source: "urbasig",
            name: "urbcerradas",
            visibility: false,
            cql_filter: "fuente = 'ARBA' ",
            title: "ARBA",
            group: "uc"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'USO ESPECIFICO'",
            title: "Zona de Uso Eespecifico",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'RESIDENCIAL EXTRAURBANA'",
            title: "Zona Residencial Extraurbana",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'RESIDENCIAL'",
            title: "Zona Residencial",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'RESERVA ENSANCHE URBANO'",
            title: "Zona Residencial",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'RESERVA'",
            title: "Zona de Reserva",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'RECUPERACION'",
            title: "Zona de Recuperación",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'INDUSTRIAL'",
            title: "Zona Industrial",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'ESPARCIMIENTO'",
            title: "Zona de Esparcimiento",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'COMERCIAL'",
            title: "Zona Comercial",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'AGROPECUARIA'",
            title: "Zona Agropecuaria",
            group: "zonas"
    },
	{
            source: "urbasig",
            name: "uso_del_suelo",
            visibility: false,
            cql_filter: "zonas = 'Sin Clasificar'",
            title: "Sin Clasificar",
            group: "zonas"
    },
    {
            source: "urbasig",
            name: "areas_ley_8912",
            visibility: false,
            cql_filter: "u_c_r = 'USO ESPECIFICO'",
            title: "USO ESPECIFICO",
            group: "ley"
    },
    {
            source: "urbasig",
            name: "areas_ley_8912",
            visibility: false,
            cql_filter: "u_c_r = 'URBANA'",
            title: "URBANA",
            group: "ley"
    },
    {
            source: "urbasig",
            name: "areas_ley_8912",
            visibility: false,
            cql_filter: "u_c_r = 'RURAL'",
            title: "RURAL",
            group: "ley"
    },
    {
            source: "urbasig",
            name: "areas_ley_8912",
            visibility: false,
            cql_filter: "u_c_r = 'EV, ESPARCIMIENTO, RECREACION'",
            title: "EV, ESPARCIMIENTO, RECREACION",
            group: "ley"
    },
	{
            source: "urbasig",
            name: "areas_ley_8912",
            visibility: false,
            cql_filter: "u_c_r = 'COMPLEMENTARIA'",
            title: "COMPLEMENTARIA",
            group: "ley"
    },
	{
            source: "urbasig",
            name: "zonificacion",
            visibility: false,
            title: "Zonificación segun Usos",
            group: "zoni"
    },
    
    // Capas Base ///////////////////////////////////////////////////////////////////////////////


      {
            source: "google",
            name: "HYBRID",
            title: "Google Híbrido",
            group: "background"
        },{
            source: "google",
            name: "ROADMAP",
            title: "Google Callejero",
            group: "background"
        },{
            source: "google",
            name: "SATELLITE",
            title: "Google Satélite",
            group: "background"
        },{
            source: "google",
            name: "TERRAIN",
            title: "Google Físico",
            group: "background"
        },{
            source: "bing",
            name: "Road",
            title: "Bing Road",
            group: "background"
        },{
            source: "bing",
            name: "Aerial",
            title: "Bing Aerial",
            group: "background"
        },{
            source: "bing",
            name: "AerialWithLabels",
            title: "Bing Aerial Labels",
            group: "background"
        },{
            source: "osm",
            name: "mapnik",
            title: "Open Street Map",
            group: "background"
        },{
            source: "ol",
            group: "background",
            type: "OpenLayers.Layer.WMS",
            args: ["Sin Capa base", "http://"+urba+"/geoserver/arba/wms", {layers: 'partidos'}]
        },{
             source: "ol",
             type: "OpenLayers.Layer.WMS",
             args: ["Capa Base", "http://"+urba+"/geoserver/arba/wms", {layers: 'carto_base'}],
             title: "Capa Base",
             group: "background"
         }
]
<?php
	endif;
}
?>