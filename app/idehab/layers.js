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
        {
                source: "arbalocal",
                name: "partidos",
                visibility: true,
                title: "L¡≠mite de Partidos",
                visibility: false,
                group: "ideba"
        },
        {
	source:"proyectosgis",
	title: "Limite Partido",
	name: "geonode:partidos_pba_2014_cod_catastro", 
	visibility: false,
	group: "ideba",
	styles: "partidos_pba_2014_cod_catastro_6be100d9" 
        },

// Deficit urbano - habitacional
       {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Sin cobertura de agua de red (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_8d5de8b6"
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Sin cobertura de red cloacal (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_024a9fd6"
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Sin cobertura de gas de red (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_76ba8e40"
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Conexion insuficiente a servicios basicos (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_c88f2bf2"
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Calidad constructiva insuficiente (% viv)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_f4399157"
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "NBI (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_37461de4"   
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Estructura etaria (- 14/+ 65)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_9f1d95f9"   
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Inquilinos (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_5640a48a"   
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Tenencia irregular (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_65e71b9c"   
   	},
        {
		source:"proyectosgis",
                name: "geonode:censo_2010_dic15",
                title: "Hacinamiento critico (% hog)",
		visibility: false,
		selected: true,
		group: "deficit",
                styles: "censo_2010_dic15_dcc60444"   
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
                title: "Lotes con servicios",
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
		title: "Villas y Asentamientos",
		visibility: true,
		group: "local"
   	},	
	{
		source:"proyectosgis",
		name: "geonode:rppvap_avance", 
		title: "RPPVAP Avance Provincial",
		visibility: false,
		group: "registro"
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
                title:"Municipalidades",
		visibility: false,
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
        title: "Google H√≠brido",
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
        title: "Google Sat√©lite",
        group: "background",
     visibility: false,
        selected: false
    }, {
        source: "google",
        name: "TERRAIN",
        title: "Google F√≠sico",
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
