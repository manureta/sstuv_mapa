var urba = "sig.gobierno.gba.gov.ar:8080";
var sources = {
    sstuv: {
        url: "http://190.188.234.6/geoserver/publico/wms?",
        title: "SSTUV",
        ptype: "gxp_wmssource"
    },
/*
    urbasig: {
        url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/urbasig/wms?",
        title: "Buenos Aires - URBASIG",
        ptype: "gxp_wmscsource"
    },
  */
  ign: {
        url: "http://wms.ign.gob.ar/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities",
        title: "Instituto Geografico Nacional",
        ptype: "gxp_wmscsource"
    },
    arba: {
        url: "http://cartoservices.arba.gov.ar/geoserver/cartoservice/wms?service=WMS&request=GetCapabilities",
        title: "Buenos Aires - ARBA",
        ptype: "gxp_wmscsource"
    },
   /*
    arbalocal: {
        url: "http://localhost:8080/geoserver/cartografiabasearba/wms?",
        title: "Buenos Aires - ARBA-Local",
        ptype: "gxp_wmscsource"    
    },
  */
    proyectosgis: {
        url: "http://190.188.234.6/geoserver/wms?",
        title: "Otras",
        ptype: "gxp_wmscsource"
    },
   
    "mapaescolar": {
        "url": "http://190.210.101.129/cgi-bin/mapaescolar?service=WMS&version=1.1.1&request=getcapabilities",
        "title": "Dirección General de Cultura y Educación - GBA - Mapa Escolar",
        "ptype": "gxp_wmscsource"
    },
    /*
    "salud": {
        "url": "http://sig.gobierno.gba.gov.ar:8080/geoserver/salud/wms?version=1.1.1&request=GetCapabilities",
        "title": "Ministerio de Salud - GBA",
        "ptype": "gxp_wmscsource"
    },
   
    "mosp": {
        "url": "http://geobasig.com.ar/wms_hidraulica/cgi-bin/mapserv.exe?map=/ms4w/apps/m/wms.map&REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.1.1",
        "title": "Dirección de Hidráulica - Ministerio de Infraestructura - GBA",
        "ptype": "gxp_wmscsource"
    },
   */
   geodesia: {
        url: "http://geobasig.com.ar/geoserver/Geodesia/wms?",
        title: "Geodesia ",
        ptype: "gxp_wmscsource"
    },
    ol: {
        ptype: "gxp_olsource"
    },
    bing: {
        ptype: "gxp_bingsource",
       apiKey: 'Ak2G9A8_K_Iu0w69k-uulFwa3a_6JDTBm8BrEih-vGwrl5SVSht3SeMgFGYnBctZ' 
    },
    google: {
        ptype: "gxp_googlesource"
    },
    osm: {
        ptype: "gxp_osmsource"
    }
}
