var Buffer = new Class({
    initialize: function() {
        this.clickEnMapa();
    },
    mostrar: function() {
        var self = this;
        if (!this.capa) {
            this.capa = app.getLayerRecordFromMap({
                source: "ol",
                name: "buffer",
            }).getLayer();
        }
        if (!this.win) {
            this.form = new Ext.FormPanel({
                baseCls: 'x-plain',
                labelWidth: 100,                
                defaults: {
                    xtype: 'textfield'
                },
                items: [{
                        fieldLabel: 'Radio en metros',
                        name: 'radio',
                        value: 100,
                        allowBlank: false
                    }]
            });
            this.win = new Ext.Window({
                title: 'Dibujar Buffer',
                width: 300,
                //height: 100,
                //minWidth: 200,
                //minHeight: 175,
                layout: 'fit',
                plain: true,
                bodyStyle: 'padding:5px;',
                buttonAlign: 'right',
                items: this.form,
                closeAction: 'hide',
                buttons: [{
                        text: 'Limpiar',
                        handler: function() {
                            self.capa.removeAllFeatures();
                        }
                    }],
                onHide: function() {
                    self.clickControl.deactivate();
                    //self.capa.setVisibility(false);
                },
                onShow: function() {
                   self.clickControl.activate();
                   self.capa.setVisibility(true);
                }
            });
        }
        this.win.show();
    },
    clickEnMapa: function() {
        var self = this;
        ClickControl = OpenLayers.Class(OpenLayers.Control, {
            defaultHandlerOptions: {
                'single': true,
                'double': false,
                'pixelTolerance': 0,
                'stopSingle': false,
                'stopDouble': false
            },
            initialize: function(options) {
                this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                        );
                OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                        );
                this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                        );
            },
            trigger: function(e) {
                var bufferValue = self.form.getForm().findField('radio').getValue();                
                var lonlat = app.mapPanel.map.getLonLatFromPixel(e.xy);
                var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
                self.buffer = new OpenLayers.Geometry.Polygon.createRegularPolygon(point, bufferValue, 50);
                self.bufferVec = new OpenLayers.Feature.Vector(self.buffer);
                self.capa.addFeatures([self.bufferVec]);
            }

        });
        this.clickControl = new ClickControl();
        app.mapPanel.map.addControl(this.clickControl);
        //this.clickControl.deactivate();
    }
})