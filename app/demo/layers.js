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
        group: "arba"
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
        group: "limi"
    },
    {
        source: "bing",
        name: "Road",
        title: "Bing Road",
        group: "background"
    },
    {
        source: "bing",
        name: "Aerial",
        title: "Bing Aerial",
        group: "background"
    },
    {
        source: "bing",
        name: "AerialWithLabels",
        title: "Bing Aerial Labels",
        group: "background"
    },
    {
        source: "google",
        name: "HYBRID",
        title: "Google Híbrido",
        group: "background"
    }, {
        source: "google",
        name: "ROADMAP",
        title: "Google Callejero",
        group: "background"
    }, {
        source: "google",
        name: "SATELLITE",
        title: "Google Satélite",
        group: "background"
    }, {
        source: "google",
        name: "TERRAIN",
        title: "Google Físico",
        group: "background"
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
