
function streetView(){

var Clicker = OpenLayers.Class(OpenLayers.Control, {                

    defaults: {
        pixelTolerance: 1,
        stopSingle: true
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaults
        );
        OpenLayers.Control.prototype.initialize.apply(this, arguments); 
        this.handler = new OpenLayers.Handler.Click(
            this, {click: this.trigger}, this.handlerOptions
        );
    }, 

    trigger: function(event) {
        openPopup(this.map.getLonLatFromViewPortPx(event.xy));
    }

});


var popup;
function openPopup(location) {
    if (!location) {
        location = app.mapPanel.map.getCenter();
    }
    if (popup && popup.anc) {
        popup.close();
    }

    popup = new GeoExt.Popup({
        title: "Street View",
        location: location,
        width: 600,
        height: 500,
        collapsible: true,
        map: app.mapPanel,
        items: [new gxp.GoogleStreetViewPanel()]
    });
    popup.show();
}

openPopup();

 }