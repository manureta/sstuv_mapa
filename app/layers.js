var layers = [
    {
        source: "ol",
        name: "buffer",
        visibility: false,
        title: "Buffer",
        args: ["Buffer"],
        type: "OpenLayers.Layer.Vector",
        group: "consulta"
    },
// SSTUV
	{
		source:"sstuv",
		name: "villas_y_asentamientos_confirmados", 
		visibility: true,
		group: "local"
   	}, 

// de UrbaSIG
	{
		source:"urbasig",
		name: "zonificacion",
		visibility: false,
		group: "ideba"
   	}, 
	{
		source:"urbasig",
		name: "areas_ley_8912",
		visibility: false,
		group: "ideba"
   	}, 
	{
		source:"urbasig",
		name: "usos_del_suelo",
		visibility: false,
		group: "ideba"
   	}, 
	{
		source:"urbasig",
		name: "urba_cerradas",
		visibility: false,
		group: "ideba"
   	}, 
	{
		source:"urbasig",
		name: "municipalidades",
		visibility: false,
		group: "ideba"
   	}, 
    // ARBA
    {
        source: "arba",
        name: "Grupo ARBA",
        visibility: false,
        title: "Catastro",
        group: "ideba"
    },    
    {
        source: "geodesia",
        name: "ParcelarioCompleto",
        visibility: false,
        title: "Parcelario Geodesia",
        group: "ideba"
    },   
   // SALUD
    {
        source: "salud",
        name: "salud",
        visibility: false,
        title: "Establecimientos de Salud",
        group: "ideba"
    },   

   // IDERA
	{
		source:"ign",
			name: "ideign:CURSOS_DE_AGUA",
		visibility: false,
		title: "Cursos de Agua",
		group: "idera"
   	}, 
	{
		source:"ign",
		name: "ideign:CUERPOS_DE_AGUA",
		visibility: false,
		title: "Cuerpo de Agua",
		group: "idera"
   	}, 
	{
		source:"ign",
		name: "capabaseargenmap",
		visibility: false,
		title: "Capa Base IGN",
		group: "idera"
   	}, 
 
    // Capas de la DPUyT
    {
     source: "cartolocal",
     name: "divisionpolitica",
     visibility: false,
     title: "areametro",
     group: "local"
    },
 
    // Capas Base
    {
        source: "arbalocal",
        name: "partidos",
        visibility: true,
        title: "Límite de Partidos",
     visibility: false,
        group: "ideba"
    },
    {
        source: "bing",
        name: "Road",
        title: "Bing Road",
        group: "background",
     visibility: false,
	selected: false
    },
    {
        source: "bing",
        name: "Aerial",
        title: "Bing Aerial",
        group: "background",
     visibility: false,
        selected: false
    },
    {
        source: "bing",
        name: "AerialWithLabels",
        title: "Bing Aerial Labels",
        group: "background",
     visibility: false,
        selected: false
    },
    {
        source: "google",
        name: "HYBRID",
        title: "Google Híbrido",
        group: "background",
     visibility: false,
        selected: false
    }, {
        source: "google",
        name: "ROADMAP",
        title: "Google Callejero",
        group: "background",
     visibility: false,
        selected: false
    }, {
        source: "google",
        name: "SATELLITE",
        title: "Google Satélite",
        group: "background",
     visibility: false,
        selected: false
    }, {
        source: "google",
        name: "TERRAIN",
        title: "Google Físico",
        group: "background",
     visibility: false,
        selected: false
    },
    {
        source: "osm",
        name: "mapnik",
        title: "Open Street Map",
        selected: true,
        group: "background"
    },
    {
        source: "ol",
        group: "background",
        fixed: true,
        type: "OpenLayers.Layer",
        args: ["Sin capa base",
            {
                visibility: false
            }]
    } 
];
