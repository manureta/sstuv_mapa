var Distritos = new Class({
    initialize: function(){
        //this.clickEnMapa();
    },

    mostrar: function(){
        		var self = this;
/*		if(!this.capa){
			this.capa = app.getLayerRecordFromMap({
				source: "ol",
	        	name: "distritos",
			}).getLayer();
		}
		if(!this.win){



 Locations = new OpenLayers.Layer.GML("Locations", LocationURL, {
                format: OpenLayers.Format.GeoJSON,
                projection: new OpenLayers.Projection("EPSG:4326"), //4326 for WGS84
                styleMap: new OpenLayers.StyleMap(LocationStyle)
            });			

var LayerStyle = new OpenLayers.Style({
                strokeColor: "#5B5B5B",
                strokeWidth: 1,
                fillColor: "#F4FBA1",
                pointRadius: 10,
                strokeOpacity: 0.8,
                fillOpacity: 0.8,
                label: "${Location}",
                labelYOffset: "-20",
                labelAlign: "cc",
                fontColor: "#000000",
                fontOpacity: 1,
                fontFamily: "Arial",
                fontSize: 12,
                fontWeight: "300"
            });
styleMap: new OpenLayers.StyleMap(LayerStyle)
*/
// var dist_esc = new OpenLayers.Layer.Vector("Distritos Escolares");
 //       app.mapPanel.map.addLayer(dist_esc);

     store = new GeoExt.data.FeatureStore({
     //	layer: dist_esc,
     	 fields: [
            {name: 'the_geom'},
            {name: 'distrito', type: 'string'},
            {name: 'nuevo', type: 'string'}
             ],
            proxy: new GeoExt.data.ProtocolProxy({
            protocol: new OpenLayers.Protocol.HTTP({
                 url:"ogc/partidos3.gml",
                    format: new OpenLayers.Format.GML({
                     //   featureNS: "http://www.openplans.org/topp"

                })
            })
        }),
        autoLoad: true
    });

 var map = app.mapPanel.map;


 grid = new gxp.grid.FeatureGrid({
       // title: "Feature Attributes",
        store: store,
        ignoreFields: ["the_geom"],
        map: map,
       // renderTo: app.mapPanel,
        height: 400,
        width: 300
     });

var win = new Ext.Window({
    title: 'Partidos',
    layout: 'fit',
    width: 300,
    height:350,
    renderTo: win,
    items: grid
});

win.show();

grid.on('rowclick', function(grid, rowIndex, e){
      var regsel = grid.getSelectionModel().getSelected();
      var distrito = regsel.get('distrito');
      var nombre = regsel.get('nuevo');
              // visualizarBusqueda(distrito,nombre);
            });

/*
			this.win = new Ext.Window({
				title: 'Distritos Escolares',
		        collapsible: true,
		        maximizable: true,
		        width: 350,
		        height: 300,
		        minWidth: 200,
		        minHeight: 175,
		        layout: 'fit',
		        plain: true,
		        bodyStyle: 'padding:5px;',
		        buttonAlign: 'right',
		        items: [grid],
		        closeAction: 'hide',
	
		
			});
*/			
		}
//		this.win.show();

})