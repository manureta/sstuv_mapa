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
		source:"proyectosgis",
		name: "geonode:registro_organizaciones", 
		visibility: false,
		selected: true,
		group: "local"
   	},        
	{
		source:"proyectosgis",
		name: "geonode:lote_con_servicios", 
		visibility: false,
		selected: true,
		group: "local"
   	},
	{
		source:"proyectosgis",
		name: "geonode:subsidios", 
		visibility: false,
		selected: true,
		group: "local"
   	},	
	{
		source:"proyectosgis",
		name: "geonode:familia_propietaria", 
		visibility: false,
		selected: true,
		group: "local"
   	},
	{
		source:"proyectosgis",
		name: "geonode:expropiaciones", 
		visibility: false,
		selected: true,
		group: "local"
   	},
	{
		source:"proyectosgis",
		name: "geonode:conflictos", 
		visibility: false,
		selected: true,
		group: "local"
        },
        {
		source:"proyectosgis",
                name: "geonode:rppvap_base_2",
                title: "Barrios que iniciaron un proceso de regularizacion",
		visibility: false,
		selected: true,
		group: "local",
                styles: "rppvap_base_2_2d9c8ec4"
   	},
	{
		source:"proyectosgis",
                name: "geonode:rppvap_base_2",
                title: "Barrios con intervencion habitacional",
		visibility: false,
		selected: true,
		group: "local",
                styles: "rppvap_base_2_0f6bad4c"
   	},
        {
		source:"proyectosgis",
                name: "geonode:rppvap_base_2",
                title: "Periodo de origen",
		visibility: false,
		selected: true,
		group: "local",
                styles: "rppvap_base_2_7a7b89a2"
   	},
        {
		source:"proyectosgis",
                name: "geonode:rppvap_base_2",
                title: "Densidad (Hog/Ha)",
		visibility: false,
		selected: true,
		group: "local",
                styles: "rppvap_base_2_6eff4bd7"
   	},
	{
		source:"proyectosgis",
		name: "registro:caratulas", 
		title: "Villas y Asentamientos (Mapeo Preliminar)",
		visibility: true,
		group: "local",
		styles: "caratulas_48078e41" 
   	},
	{
		source:"sstuv",
		name: "villas_y_asentamientos_confirmados_rppvap", 
		title: "Villas y Asentamientos (Confirmados)",
		visibility: true,
		group: "local"
   	},	
	{
		source:"proyectosgis",
		name: "geonode:rppvap_avance", 
		title: "RPPVAP Avance Provincial",
		visibility: false,
		group: "local"
   	},
	{
		source:"proyectosgis",
		title: "Limite Partido",
		name: "geonode:partidos_pba_2014_cod_catastro", 
		visibility: false,
		group: "local",
		styles: "partidos_pba_2014_cod_catastro_6be100d9" 
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
	visibility: true,
        selected: true
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
	visibility: false,        
	selected: false,
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
