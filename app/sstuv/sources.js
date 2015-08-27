var urba = "sig.gobierno.gba.gov.ar:8080";
var sources = {
    urbasig: {
        url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/urbasig/wms?",
        title: "Buenos Aires - URBASIG",
        ptype: "gxp_wmscsource"
    },
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
    arbalocal: {
        url: "http://localhost:8080/geoserver/cartografiabasearba/wms?",
        title: "Buenos Aires - ARBA-Local",
        ptype: "gxp_wmscsource"    
    },
    proyectosgis: {
        url: "http://localhost:8080/geoserver/proyectosgis/wms?",
        title: "Proyectos GIS",
        ptype: "gxp_wmscsource"
    },
    cartolocal: {
        url: "http://localhost:8080/geoserver/cartografiabase/wms?",
        title: "Cartografía Base Local",
        ptype: "gxp_wmscsource"
    },
    ol: {
        ptype: "gxp_olsource"
    },
    bing: {
        ptype: "gxp_bingsource"
    },
    google: {
        ptype: "gxp_googlesource"
    },
    osm: {
        ptype: "gxp_osmsource"
    }
}
