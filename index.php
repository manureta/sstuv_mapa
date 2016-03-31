<html>
    <head>
        <title>Visualizador de mapas de la Infraestructura de datos de Habitat</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="./script/ext-3.4.0/resources/css/ext-all.css"/>
        <link rel="stylesheet" type="text/css" href="./script/ext-3.4.0/resources/css/examples.css"/>
        <link rel="stylesheet" type="text/css" href="./script/ext-3.4.0/resources/css/xtheme-gray.css"/>
        <link rel="stylesheet" type="text/css" href="./theme/openlayers/default/style.css"/>
        <link rel="stylesheet" type="text/css" href="./theme/openlayers/default/google.css"/>
        <link rel="stylesheet" type="text/css" href="./theme/geoext/css/geoext-all.css"/>
        <link rel="stylesheet" type="text/css" href="./theme/gxp/all.css"/>
        <link rel="stylesheet" type="text/css" href="./theme/vialidad.css"/>
        <link rel="stylesheet" type="text/css" href="./theme/educacion.css"/>        
        <link rel="stylesheet" type="text/css" href="./theme/viewer.css"/>
	<link rel="stylesheet" type="text/css" href="./script/GeoExt.ux/printpreview.css"></script>

        <script type="text/javascript" src="./script/ext-3.4.0/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="./script/ext-3.4.0/ext-all.js"></script>
        <script type="text/javascript" src="./script/ext-3.4.0/examples/ux/ProgressBarPager.js"></script>
        <script type="text/javascript" src="./script/OpenLayers.js"></script>
        <script type="text/javascript" src="./script/GeoExt.js"></script>
        <script type="text/javascript" src="./script/GeoExt.ux/Ext.ux.SearchField.js"></script>
        <script type="text/javascript" src="./script/GeoExt.ux/ProgressBarPager.js"></script>
        <script type="text/javascript" src="./script/GeoExt.ux/Ext.ux.GridPrinter.js"></script>
        <script type="text/javascript" src="./script/gxp/script/loader.js"></script>
        <script type="text/javascript" src="./script/RowExpander.js"></script>
        
        <script type="text/javascript" src="./script/GeoExt.ux/PrintPreview.js"></script>
        <script type="text/javascript" src="./script/GeoExt/widgets/PrintMapPanel.js"></script>
        <script type="text/javascript" src="./script/GeoExt/plugins/PrintProviderField.js"></script>
        <script type="text/javascript" src="./script/GeoExt/plugins/PrintPageField.js"></script>
        <script type="text/javascript" src="/geoserver/pdf/info.json?var=printCapabilities"></script>

        <script type="text/javascript" src="./script/mootools-core-1.4.5.js"></script>
        <script type="text/javascript" src="./script/mootools-more-1.4.0.1.js"></script>
        <script type="text/javascript" src="./script/proj4.js"></script>
        <script type="text/javascript" src="./script/Nomenclatura.class.js"></script>
        <script type="text/javascript" src="./script/Nomenclatura_partido_partida.class.js"></script>
        <script type="text/javascript" src="./script/BusquedaBarrio.class.js"></script>
        <script type="text/javascript" src="./script/BusquedaFolio.class.js"></script>
        <script type="text/javascript" src="./script/posicionamiento.class.js"></script>
        <script type="text/javascript" src="./script/dist.js"></script>         
        <script type="text/javascript" src="./script/Sesion.class.js"></script>         
	<script type="text/javascript" src="./script/streetView.class.js"></script>

	<script type="text/javascript" src="./script/projects.js"></script>
<?php if ($_GET['p']=='idehab'): $proyecto=$_GET['p']; endif; ?>
<?php if ($_GET['p']=='sstuv'): $proyecto=$_GET['p']; endif ;?>
<?php if ($_GET['p']=='demo'): $proyecto=$_GET['p']; endif ;?>

        <script type="text/javascript" src="./app/<?php echo $proyecto; ?>/grupos_capas.js"></script>
        <script type="text/javascript" src="./app/<?php echo $proyecto; ?>/sources.js"></script>
        <!--<script src="./services/sesion.php?o=layers"></script>-->
        <script type="text/javascript" src="./app/<?php echo $proyecto; ?>/layers.js"></script>
        <script type="text/javascript" src="./app/<?php echo $proyecto; ?>/utils.js"></script>

        <script type="text/javascript" src="./app.js"></script>

        <style type="text/css">
            body {
                background-color: #FFFFFF !important;
                font-family: helvetica,tahoma,verdana,sans-serif;
                font-size: 13px;
                padding: 0px 0px 0px;
            }
        </style>
        
    </head>
<body>
    <div id="header" class="x-hidden">
        <h1>Depto SIG</h1>
    </div>
    <div id="nomenclatura" class="x-hidden">
        <div>
            <label>Partido:</label>
            <input id="partidoN" type="text" tipo="numero" largo="3"/>
            <br>
            <label>Circunscripción:</label>
            <input id="circunscripcionN" type="text" tipo="texto" largo="2"/>
            <br>
            <label>Sección:</label>
            <input id="seccionN" type="text" tipo="texto" largo="2"/>
            <br>
            <label>Chacra:</label>
            <input id="chacraNN" type="text" tipo="numero" largo="4"/><input id="chacraTN" type="text" tipo="texto" largo="3"/>
            <br>
            <label>Quinta:</label>
            <input id="quintaNN" type="text" tipo="numero" largo="4"/><input id="quintaTN" type="text" tipo="texto" largo="3"/>
            <br>
            <label>Fracción:</label>
            <input id="fraccionNN" type="text" tipo="numero" largo="4"/><input id="fraccionTN" type="text" tipo="texto" largo="3"/>
            <br>
            <label>Manzana:</label>
            <input id="manzanaNN" type="text" tipo="numero" largo="4"/><input id="manzanaTN" type="text" tipo="texto" largo="3"/>
            <br>
            <label>Parcela:</label>
            <input id="parcelaNN" type="text" tipo="numero" largo="4"/><input id="parcelaTN" type="text" tipo="texto" largo="3"/>
            <br>
            <button>Buscar</button>
        </div>
    </div>
    <div id="nomenclatura_par" class="x-hidden">
        <div>
            <label>Partido:</label>
            <input id="partidoN" type="text" tipo="numero" largo="3"/>
            <br>
            <label>Partida:</label>
            <input id="partidaN" type="text" tipo="texto" largo="6"/>
            <br>
            <button>Buscar</button>
        </div>
    </div>
    <div id="busqueda_barrio" class="x-hidden">
        <div>
            <label>Partido:</label>
            <input id="partidoN" type="text" tipo="texto" largo="20"/>
            <br>
            <label>Barrio:</label>
            <input id="barrioN" type="text" tipo="texto" largo="6"/>
            <br>
            <button>Buscar</button>
    <div id="busqueda_folio" class="x-hidden">
        <div>
            <label>Folio:</label>
            <input id="folioN" type="text" tipo="numero" largo="10"/>
            <button>Buscar</button>
        </div>
     </div>
        </div>
     </div>
</body>
</html>
