var Ficha = new Class({
  initialize: function() {
    window.callbackFicha = this.callback.bind(this);
  },
  callback: function(result) {
    var ids = [];
    for (i in result.features) {
      var act = result.features[i];
      if (typeof act == "function")
        continue;
      ids.push(act.properties.idserv);
    }
    if (ids.length == 0) {
      Ext.MessageBox.show({
        title: 'Error',
        msg: 'No selecciono ninguna escuela.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
      });
      return;
    }
    this.crearVentana(ids.join(','));
  },
  mostrar: function() {
    if (!this.capa) {
      this.capa = app.getLayerRecordFromMap({
        source: "ol",
        name: "buffer",
      }).getLayer();
    };
    if (!this.herramienta) {
      this.herramienta = new OpenLayers.Control.DrawFeature(this.capa,
        OpenLayers.Handler.RegularPolygon, {
          handlerOptions: {
            sides: 4,
            irregular: true
          }
        });
      this.herramienta.events.register('featureadded', false, function(result) {
        var bounds = result.feature.geometry.transform(app.mapPanel.map.getProjection(), "EPSG:4326").getBounds().toArray();
        self.reqJsonP = new Request.JSONP({
          url: server + 'geoserver/mariano/wfs',
          timeout: 7000,
          data: {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: 'v_escuelas_geoserver',
            maxFeatures: '100',
            srsName: app.mapPanel.map.getProjection(),
            cql_filter: filtroEscuelas.capa.data.layer.params.CQL_FILTER + ' AND bbox("the_geom",' + bounds[0] + ',' + bounds[1] + ',' + bounds[2] + ',' + bounds[3] + ')',
            outputFormat: 'text/javascript',
            format_options: 'callback:callbackFicha',
          },
          onTimeout: function() {
            console.log('onTimeout', arguments);
            //Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
            self.win.enable();
          }
        }).send();
      });
      app.mapPanel.map.addControl(this.herramienta);
    }
    if (!filtroEscuelas.capa) {
      Ext.MessageBox.show({
        title: 'Error',
        msg: 'No esta mostrando ninguna escuela.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
      });
      return;
    }
    this.herramienta.activate();
  },
  crearVentana: function(ids) {
    Ext.QuickTips.init();
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    var store = new Ext.data.Store({
      proxy: new Ext.data.HttpProxy({
        url: './services/grilla.php',
        method: 'POST'
      }),
      baseParams: {
        ids: ids
      },
      reader: new Ext.data.JsonReader({
        root: 'results',
        totalProperty: 'total',
        id: 'pidserv'
      }, [{
        name: 'pidserv',
        type: 'integer',
        mapping: 'pidserv'
      }, {
        name: 'pnombre',
        type: 'string',
        mapping: 'pnombre'
      }, {
        name: 'cue',
        type: 'string',
        mapping: 'cue'
      }, {
        name: 'anexo',
        type: 'string',
        mapping: 'anexo'
      }]),
      sortInfo: {
        field: 'pnombre',
        direction: "ASC"
      }
    });
    store.load({
      params: {
        start: 0,
        limit: 9
      }
    });

/*///////////////////////////////////////////////////////////////////////////////////
  grid = new Ext.grid.GridPanel({
        title: "Feature Grid",
        region: "east",
        store: store,
        width: 320,
        columns: [{
            header: "pidserv",
            width: 200,
            dataIndex: "pidserv"
        }, {
            header: "pnombre",
            width: 100,
            dataIndex: "pnombre"
        }],
        sm: new GeoExt.grid.FeatureSelectionModel()
    });

 mainPanel = new Ext.Panel({
        renderTo: "mainpanel",
        layout: "border",
        height: 400,
        width: 920,
        items: [mapPanel, grid]
    });
/*////////////////////////////////////////////////////////////////////////////////////

    var grid = new Ext.grid.GridPanel({
      store: store,
      stripeRows: true,
      enableColumnMove: false,
      width: 630,
      height: 285,
      stateful: true,
      stateId: 'grid',
      columns: [{
        id: 'pidserv',
        header: "Idserv",
        width: 50,
        sortable: true,
        dataIndex: 'pidserv'
      }, {
        id: 'pnombre',
        header: "Escuela",
        width: 520,
        sortable: true,
        dataIndex: 'pnombre'
      }, {
        xtype: 'actioncolumn',
        width: 50,
        items: [{
          icon: './theme/icono_vermas.gif',
          align: 'center',
          tooltip: 'Ver mas información',
          handler: function(grid, rowIndex, colIndex) {
            var rec = store.getAt(rowIndex);
            tabs.add({
              title: rec.get('pidserv'),
              autoLoad: {
                url: './services/datosescuela.php',
                params: {
                  idserv: rec.get('pidserv')
                }
              },
              discardUrl: false,
              nocache: true,
              text: "Cargando...",
              timeout: 30,
              scripts: false,
              closable: true
            }).show();
          }
        }]

      }],

      bbar: new Ext.PagingToolbar({
        pageSize: 9,
        store: store,
        displayInfo: true,
        plugins: new Ext.ux.ProgressBarPager()
      })
      //,
      // sm: new GeoExt.grid.FeatureSelectionModel()
    });

    var tabs = new Ext.TabPanel({
      region: 'center',
      autoDestroy: false,
      deferredRender: false,
      activeTab: 0,
      enableTabScroll: true,
      defaults: {
        autoScroll: true
      },
      items: [{
        id: 'lista',
        title: 'ESTABLECIMIENTOS',
        items: [grid]
      }]
    });


    var self = this;
    if (!win) {
      var win = new Ext.Window({
        title: 'Resultados de la busqueda',
        closable: false,
        width: 650,
        height: 380,
        plain: true,
        layout: 'border',
        items: [tabs],
        buttons: [{
          text: 'Cerrar',
          handler: function() {
            tabs.setActiveTab(0);
            win.hide();
          }
        }],
        onHide: function(){
          self.herramienta.deactivate();
        }
      }).show();
    }


  }
})