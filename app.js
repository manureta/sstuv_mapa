var app, posicioname, nomenclatura_par, nomenclatura, buffer, distritos, Sesion, ficha;
var permalink;

OpenLayers.ProxyHost = "./prox/?url=";


var storeprojects,ambiente;

Ext.onReady(function() {
if (window.location.href.search('mapa_pruebas')>0) {ambiente='_pruebas';} else {ambiente=''; } ;


    GeoExt.Lang.set("es");
    app = new gxp.Viewer({
        proxy: "./prox/?url=",
        portalConfig: {
            layout: "border",
            items: [
                {
                    id: "northpanel",
                    xtype: "container",
                    region: "north",
                    border: false,
                    height: 40,
                    items: [{html: '<div> <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="grey" height="40px">  <tr> <td width="35%" style="padding-left: 10px; vertical-align: center;">  </td><td align="center" width="30%"  style="vertical-align: center;"> <img title="IDEHab" src="./app/'+get_project()+'/img/idehab-positivo-blanco.png" alt="IDE Habitacional"> </td> <td align="right" width="35%" style="padding-right:10px;  vertical-align: center;"> <img title="Ministerio de Infraestructura" src="./app/img/ministerio-subse.png" alt="Ministerio de Infraestructura"> </td></tr> </table>  </div>'}]
                },
                {
                    id: "centerpanel",
                    xtype: "tabpanel",                    
                    region: "center",
                    border: false,
                    activeTab: 0,
                    items: ["mymap",
                        {
                            title: "Barrios SSTUV",
                            html: "<iframe  width='100%' height='100%' src='/registro"+ambiente+"/folio/publico'>"
                        }, {
                            title: "Acerca de IDEHab",
                            html: "<iframe  width='100%' height='100%' src='./views/acercadeidehab.html'>"
                        }, {
                            title: "Servicios WMS",
                            html: "<iframe  width='100%' height='100%' src='./views/wms.html'>"
                        }, {
                            title: "Ayuda",
                            autoScroll: true,
                            html: "<iframe  width='100%' height='100%' src='./views/ayuda.html'>"
                        }
                    ]
                },
                {
                    region: "west",
                    id: "westcontainer",
                    layout: "vbox",
                    title: "Información",
                    border: true,
                    collapsible: true,
                    collapseMode: "mini",
                    collapsed: false,
                    width: 300,
		    align: 'stretch',
		    flex: 1,
                    defaults: {
                        width: "100%",
                        layout: "fit"
                    },
                    items:
                            [
				{
                                    layout: "accordion",
				    multi: true,
		 		    flex: 1,
                                    items: [
{
                                    title: "Capas",
                                    id: "layers_tree",
                                    border: false,
				    autoScroll: true,
					    pack: 'start',
					multi:true,
				    flex: 1
                                },
{
                                            title: "Leyenda",
                                            autoScroll: true,
                                            id: "legend",
					    pack: 'start',
					  multi:true,
					    flex: 2
                                        }, {
                                            title: "Referencia de posición",
                                            id: "position",
					    pack: 'end',
					    multi: true,
						height: 60
					   
                                        }]
                                }]
                }]
        },
        // configuration of all tool plugins for this application
        tools: [
            {
                ptype: "gxp_layertree",
                groups: grupos_capas,
                outputConfig: {
                    id: "tree",
                    useArrows: true,
                    autoScroll: true,
                    animate: true,
                    tbar: []

                },
                outputTarget: "layers_tree"
            },
            {
                ptype: "gxp_addlayers",
                actionTarget: "tree.tbar",
                search: {
                    selectedSource: "idera_csw"
                }
            }, {
                ptype: "gxp_removelayer",
                actionTarget: ["tree.tbar", "tree.contextMenu"]
            }, {
                ptype: "gxp_zoomtolayerextent",
                actionTarget: ["tree.tbar", "tree.contextMenu"]
            }, {
                ptype: "gxp_layerproperties",
                actionTarget: ["tree.tbar", "tree.contextMenu"]
            }, {
                ptype: "gxp_zoomtoextent",
                actionTarget: "map.tbar",
                extent: new OpenLayers.Bounds(-7175626.9266567,-5102437.4580823,-6304445.4046767,-3769658.7339758)
            },
            {
                ptype: "gxp_navigation",
                toggleGroup: "navegacion"
            },
            {
                ptype: "gxp_zoom",
                showZoomBoxAction: true,
                actionTarget: "map.tbar",
                toggleGroup: "navegacion"
            }, {
                ptype: "gxp_navigationhistory",
                actionTarget: "map.tbar",
                toggleGroup: "navegacion"
            },
            {
                ptype: "gxp_wmsgetfeatureinfo",
                outputConfig: {
                    width: 400,                    
                    draggable: true
                },
                actionTarget: "map.tbar",
                loadingMask: true,
                toggleGroup: "navegacion"
            },
            {
                ptype: "gxp_measure",
                id: "tool_measure",
                outputConfig: {
                    width: 400,
                    height: "auto"
                },
                controlOptions: {
                    geodesic: false
                },
                actionTarget: "map.tbar",
                toggleGroup: "navegacion"
            }, {
                ptype: "gxp_legend",
                outputTarget: "legend"
            }, {
                ptype: "gxp_googlegeocoder",
                outputTarget: "map.tbar",
                outputConfig: {
                    emptyText: "Ingrese el Partido o la Localidad ...",
                    width: 300
                }
            }, /*{ 
                xtype: "tbbutton",
                actionTarget: "map.tbar",
                actions: [{
                    text: 'Imprimir',
                    iconCls: 'bt-printer',
		    disabled: false,
                    handler: function(event) {
                         showPrintWindow();
                    }
                }]
            },*/
	    {
		   ptype: "gxp_print",
		   customParams: {outputFilename: 'SSTUV-MAPA'},
		   printService: "/geoserver/pdf/",
		   actionTarget: "map.tbar",
		   showButtonText: true
	   },


// MENU DE BUSQUEDAS
            {
                xtype: 'tbbutton',
                actions: [{
                        xtype: 'tbbutton',
                        text: 'Busqueda',
			iconCls: 'gxp-icon-find',
/*                        menu: {
                            items: [{
                                    text: 'Buffer',
                                    iconCls: 'bt-buffer',
                                    handler: function() {
                                        buffer.mostrar();
                                    }
                                },
                                {
                                    text: 'Busquedas',
                                    iconCls: 'gxp-icon-find',
  */
                                  menu: {
                                        items: [
                                            {
                                                text: 'Por Partido-Partida',                                                
                                                handler: function(item, event) {
                                                    nomenclatura_par.mostrar();
                                                }
                                            },
                                            {
                                                text: 'Por Partido-Barrio',                                                
                                                handler: function(item, event) {
                                                    busqueda_barrio.mostrar();
                                                }
                                            },
                                            {
                                                text: 'Por Nomenclatura',                                                
                                                handler: function() {
                                                    nomenclatura.mostrar();
                                                }
                                            },
                                            {
                                                text: 'Por Folio Barrial',                                                
                                                handler: function(item, event) {
                                                    busqueda_folio.mostrar();
                                                }
                                            },
                                        ]
                                    }
                  }]
            }, 

            {
                
		id:"btnSesion",
		xtype: "tbbutton",
                actionTarget: "map.tbar",
                actions: [{
                        text: 'Inicio sesión',
			id: "sesion",
                        iconCls: 'bt-users',
                        handler: function() {
                            Sesion.mostrar();
                        }
                    }]
            },
	{
            xtype:'tbbutton',
            xtype:'tbbutton',
            actionTarget: "map.tbar",
              actions: [{
                text: 'Street View',
                iconCls: "gxp-streetview",
                handler: function() {
                   streetView().show(); 
                }
            }]
        },{
		xtype:'gxp_filterbuilder',
		actionTarget: "legend"
	},
{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Enviar link',
                iconCls: "gxp-icon-permalink",
                handler: function() {
                    Ext.MessageBox.show({
                        title: 'Permalink',
                        msg: 'Seleccione y copie el texto con Ctrl+C',
                        value: permalink,
                        multiline: true,
                        width: 500,
                        icon: Ext.MessageBox.INFO
                    });
                }
            }]
        }

        ],
        
        // layer sources
        defaultSourceType: "gxp_wmssource",
        sources: sources,
        
        // map and layers
        map: {
            id: "mymap",
            title: "Mapa",
            projection: "EPSG:900913",                        
            displayProjection: "EPSG:4326",
            units: "m",            
            restrictedExtent: [-7175626.9266567,-5102437.4580823,-6304445.4046767,-3769658.7339758],
            center: [-6768040.2, -4401345.9],
            zoom: 6,
            numZoomLevels: 21,            
            stateId: "map",
            prettyStateKeys: true,
            eventListeners: {
                zoomend: function(evt) {
                    console.log(this);
                    console.log('zoomend');
                    console.log(this.getZoom());
                    console.log(this.getScale());
                    Ext.getCmp('map-bottom').update('Scale: ' + this.getScale());
                }
            },
            layers: layers,
            items: [{
                    xtype: "gx_zoomslider",
                    vertical: true,
                    height: 100
                },
                {
                    xtype: "gxp_scaleoverlay",
		},
            	{
                    ptype: "gxp_loadingindicator",
            	}

            ]
        }
    });

    app.mapPanel.map.events.register("mousemove", app.mapPanel.map, function(e) {
        position = app.mapPanel.map.getLonLatFromViewPortPx(e.xy);
        Ext.getCmp('position').update("<label>Latitud: " + position.lat + "</label><br/><label>Longitud: " + position.lon + "</label>");
    });



// NOMENCLATURA 

    nomenclatura = new Nomenclatura(this);
    nomenclatura_par = new Nomenclatura_par(this);
    Sesion = new Sesion(this); //Para Login
    //ficha = new Ficha(this);
    //distritos = new Distritos(this); //Para crear un vector de los partidos

// BUSQUEDAS
	busqueda_barrio = new Busqueda_Barrio(this);
	busqueda_folio = new Busqueda_Folio(this);
	
    //add highlight of identified object to map, called from feature-info render-event, configured in userconfig.ashx (from database))
    function addHighlight(feature) {
        //add feature to map
        var vectors = app.mapPanel.map.getLayersByName("highlightLayer")[0];
        try {
            vectors.removeAllFeatures();
            //reproject feature to mapProj (considering all overlays are in epsg:4326)
            if (app.mapPanel.map.baseLayer.projection.projCode !== 'EPSG:4326') {
                var geom = feature.geometry.transform(new OpenLayers.Projection('EPSG:4326'), app.mapPanel.map.baseLayer.projection);
                feature = new OpenLayers.Feature.Vector(geom);
            }
            vectors.addFeatures([feature]);
        } catch (exp) {
        }
    }

});


function showPrintWindow() {
    var printWindow = new Ext.Window({
        title: "Imprimir Mapa",
        modal: true,
        border: false,
        resizable: false,
        width: 550,        
        autoHeight: true,
        items: new GeoExt.ux.PrintPreview({
            autoHeight: false,
            printMapPanel: {
                // limit scales to those that can be previewed
                //limitScales: true,
                // no zooming on the map
                map: {controls: [
                    new OpenLayers.Control.Navigation({
                        zoomBoxEnabled: false,
                        zoomWheelEnabled: false
                    }),
                    new OpenLayers.Control.PanPanel()
                ]}                
            },
            printProvider: {
                // using get for remote service access without same origin
                // restriction. For async requests, we would set method to "POST".
                //method: "GET",
                method: "POST",
                // capabilities from script tag in Printing.html.
                capabilities: printCapabilities,
                listeners: {
                    "print": function() {printWindow.close();}
                }
            },                        
            mapTitle: "Imprimir Mapa",
            sourceMap: app.mapPanel.map
        })
    }).show().center();
}
