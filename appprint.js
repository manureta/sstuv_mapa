var mapPanel, printMapPanel, legendPanel;
var PrefLayer, regionLayer, roadLayer;

Ext.onReady(function() {

	var bounds = new OpenLayers.Bounds(
		138.85, 35.03, 
		139.81, 35.76
	);

	// Base Layer

	mapPanel = new GeoExt.MapPanel({
				region : "center",
				map : {
					maxExtent : bounds,
					maxResolution : 0.018140625,
					projection : "EPSG:4326",
					units : 'degrees'
				},
				layers : [prefLayer, regionLayer, roadLayer],
				extent : bounds,
				bbar : [{
							text : "Print...",
							handler : showPrintWindow
						}]
			});

	legendPanel = new GeoExt.LegendPanel({
				width : 150,
				region : "west",
				defaults : {
					style : "padding:5px",
					baseParams : {
						FORMAT : "image/png"
					}
				}
			});
	new Ext.Panel({
				layout : "border",
				renderTo : "content",
				width : 600,
				height : 350,
				items : [mapPanel, legendPanel]
			});
});

function showPrintWindow() {
	var printWindow = new Ext.Window({
				title : "Print",
				modal : true,
				border : false,
				resizable : false,
				width : 360,
				autoHeight : true,
				items : new GeoExt.ux.PrintPreview({
							autoHeight : true,
							printMapPanel : {
								// limit scales to those that can be previewed
								limitScales : true,
								// no zooming on the map
								map : {
									controls : [
											new OpenLayers.Control.Navigation({
														zoomBoxEnabled : false,
														zoomWheelEnabled : false
													}),
											new OpenLayers.Control.PanPanel()]
								}
							},
							printProvider : {
								// using get for remote service access without
								// same origin
								// restriction. For async requests, we would set
								// method to "POST".
								method : "GET",
								// method: "POST",

								// capabilities from script tag in
								// Printing.html.
								capabilities : printCapabilities,
								listeners : {
									"print" : function() {
										printWindow.close();
									}
								}
							},
							includeLegend : true,
							mapTitle : "PrintMapPanel Demo",
							sourceMap : mapPanel,
							legend : legendPanel
						})
			}).show().center();
}