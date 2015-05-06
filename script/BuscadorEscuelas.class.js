var BuscadorEscuelas = new Class({
  initialize: function(ext,map) {
    this.map = map;
    this.ext = ext;
    this.crearVentana();
  },
  mostrar: function() {
    // if (!this.capa)
    //   this.crearCapa();
    this.ventana.show();
  },
  createStoreSector: function() {
    var store = new Ext.data.JsonStore({
      autoDestroy: true,
      autoLoad: true,
      url: 'services/sector.php',
      root: 'data',
      totalProperty: 'total',
      idProperty: 'idsector',
      fields: ['descripcion', 'idsector'],
      sortInfo: {
        field: 'idsector',
        direction: 'DESC'
      }
    });
    return store;
  },
  createStoreMunicipios: function() {
    var store = new Ext.data.JsonStore({
      autoDestroy: true,
      autoLoad: true,
      url: 'services/distritos.php',
      root: 'data',
      totalProperty: 'total',
      idProperty: 'nuevo',
      fields: ['distrito', 'nuevo', 'punto'],
      sortInfo: {
        field: 'nuevo',
        direction: 'ASC'
      }
    });
    return store;
  },
  createStoreModNiv: function() {
    var store = new Ext.data.JsonStore({
      autoDestroy: true,
      autoLoad: true,
      url: 'services/mod_niv.php',
      root: 'data',
      totalProperty: 'total',
      idProperty: 'idoferta',
      fields: ['descripcionoferta', 'idoferta'],
      sortInfo: {
        field: 'idoferta',
        direction: 'ASC'
      }
    });
    return store;
  },
  crearVentana: function() {
    var self = this;
    var storeSector = this.createStoreSector();
    var comboSector = new Ext.form.ComboBox({
      id: 'comboSector',
      store: storeSector,
      displayField: 'descripcion',
      valueField: 'idsector',
      typeAhead: true,
      mode: 'remote',
      editable: false,
      allowBlank: false,
      blankText: 'obrigatorio seleccionar un sector',
      fieldLabel: 'Sector',
      anchor: '100%',
      forceSelection: true,
      triggerAction: 'all',
      emptyText: 'Seleccione un sector ...',
      selectOnFocus: true
    });
    // cria o combo para apresentar as culturas
    //  var storeDistrito = createStoreDistrito();


    var storeMunicipios = this.createStoreMunicipios();
    var comboDistrito = new Ext.form.ComboBox({
      id: 'comboDistritos',
      store: storeMunicipios,
      displayField: 'nuevo',
      valueField: 'distrito',
      fieldLabel: 'Distrito',
      typeAhead: true,
      mode: 'local',
      anchor: '100%',
      forceSelection: true,
      triggerAction: 'all',
      emptyText: 'Selecione un distrito ...',
      selectOnFocus: true,
      listeners: {
        specialkey: function(f, e) {
          if (e.getKey() == e.ENTER) {
            procurarMunicipio(comboMunicipios.value);
          }
        }
      }
    });

    //  var storeNivMod = createStoreNivMod();

    var storeModNiv = this.createStoreModNiv();
    var comboNivMod = new Ext.form.ComboBox({
      id: 'comboNivMod',
      store: storeModNiv,
      displayField: 'descripcionoferta',
      valueField: 'idoferta',
      typeAhead: true,
      mode: 'remote',
      editable: false,
      allowBlank: false,
      blankText: 'obligatorio',
      fieldLabel: 'Mod. y Niv.',
      anchor: '100%',
      forceSelection: true,
      triggerAction: 'all',
      emptyText: 'Selecione uma cultura ...',
      selectOnFocus: true
    });

    ///////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////

    this.form = new Ext.FormPanel({
      id: "form_buscar_escuela",
      frame: false,
      bodyStyle: 'padding:5px 5px 0',
      width: 629,
      items: [comboSector, comboDistrito, comboNivMod, {
          id: 'valor',
          //ref: '../valor',
          xtype: 'textfield',
          fieldLabel: 'Nombre, clave o cue',
          anchor: '100%',
          name: 'valor',
          allowBlank: false,
          blankText: 'campo obrigatorio!'
        },
        //   PresidentListingWindow

      ], //,comboNivMod,boxNombre
      buttons: [{
        text: 'Buscar',
        handler: function() {
          self.buscar();
        }

      }]
    });

    var alturaVentana = 220;

    this.ventana = new Ext.Window({
      title: 'Buscar Escuela',
      height: alturaVentana, // antigo 300 para a versao nao completa 500 para a completa
      width: 400,
      layout: 'fit',
      resizable: true,
      closeAction: 'hide',
      //  iconCls: 'gxp-icon-find',
      items: [this.form]
    });
  },
  visualizarBusqueda: function(punto) {
    var url = 'services/visualizarXML.php';
    url += '?punto=' + punto;
    var self = this;
    var myRequest = new Request({
      url: url,
      method: 'get',
      onSuccess: function(responseText,xml) {
        self.displayLocalidades(xml);
      }
    }).send();
  },
  displayLocalidades: function(xml) {
    if (xml) {
      // parse the features

      var points = xml.getElementsByTagName('point');
      for (var i = 0; i < points.length; i++) {

        var parser = new OpenLayers.Format.WKT();


        var lon = (points[i].getElementsByTagName('lon')[0].childNodes[0].nodeValue);
        // alert(lon);

        var lat = (points[i].getElementsByTagName('lat')[0].childNodes[0].nodeValue);
        // alert(lat);

        var zoom = 18;

        var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject());
        this.map.setCenter(lonLat, zoom);

      }

    }
  },
  createWindowBuscarEscuelas: function() {

    function form_BUSCAR_escuela_handler(form, layerName, notDisplay) {

      // bloco que garante que a box da mensagem msg seja fechada se der algum erro
      //  try {

      // faz a valida��o dos campos
      var sector = form.findById('comboSector').getValue();

    }

    function procurarMunicipio(municipio) {

      //map.zoomToExtent(extent);

      var teste = new OpenLayers.Layer.Vector("WFS", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.WFS({
          url: urlWFS,
          featureType: "municipios",
          featureNS: _featureNS
        }),
        styleMap: new OpenLayers.StyleMap({
          strokeWidth: 3,
          strokeColor: "#333333"
        }),
        filter: new OpenLayers.Filter.Logical({
          type: OpenLayers.Filter.Logical.AND,
          filters: [
            new OpenLayers.Filter.Comparison({
              type: OpenLayers.Filter.Comparison.EQUAL_TO,
              property: "nome",
              value: municipio
            })
          ]
        })
      });

      map.addLayer(teste);

      teste.events.register("loadend", teste, function(t) {
        var geographic = new OpenLayers.Projection("EPSG:4326");
        var mercator = new OpenLayers.Projection("EPSG:900913");
        var zoom = t.object.getDataExtent().transform(geographic, mercator);
        //var zoom = t.object.getDataExtent();
        if (zoom) {
          map.zoomToExtent(zoom);
        }
        map.removeLayer(t.object);
        t.object.destroy();
      });

    }

    function procurarMunicipio(idserv) {

      //map.zoomToExtent(extent);

      var teste = new OpenLayers.Layer.Vector("Escuelas", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.WFS({
          url: "http://192.168.57.20/geoserver/mariano/wfs",
          featureType: "mariano:v_escuelas_geoserver",
          featureNS: "192.168.57.20/mariano"
        }),
        styleMap: new OpenLayers.StyleMap({
          strokeWidth: 3,
          strokeColor: "#333333"
        }),
        filter: new OpenLayers.Filter.Logical({
          type: OpenLayers.Filter.Logical.AND,
          filters: [
            new OpenLayers.Filter.Comparison({
              type: OpenLayers.Filter.Comparison.EQUAL_TO,
              property: "idserv",
              value: 158
            })
          ]
        })
      });
      /*
 var teste = new OpenLayers.Layer.WMS("Comun Inicial", "http://192.168.57.20/geoserver/mariano/wms", {
            layers: "mariano:v_escuelas_geoserver",transparent:true, cql_filter: 'idserv = 86',
            format: 'image/png'},
            {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "comun",singleTile: true
          }
   );
 */
      map.addLayer(teste);

      teste.events.register("loadend", teste, function(t) {
        var geographic = new OpenLayers.Projection("EPSG:4326");
        var mercator = new OpenLayers.Projection("EPSG:900913");
        var zoom = t.object.getDataExtent(); //.transform(geographic, mercator)
        //var zoom = t.object.getDataExtent();
        if (zoom) {
          map.zoomToExtent(zoom);
        }
        map.removeLayer(t.object);
        t.object.destroy();
      });

    }


    function activada(idserv, oferta) {
      //	alert('activada '+idserv+' '+oferta);

      //var Activas = verCapas();

      var
      opciones = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=630,height=450,top=50,left=50";
      var url = "./capasIdserv.php?idserv=" + idserv + "&oferta=" + oferta;

      //		var url=url+'c='+c+'&map='+puntomap+'&queryType='+queryType+'&capas='+Activas;
      //alert ('url :'+url);
      //muestro la mascara de 'Loading...'
      //		showLoading();
      //Llamo a una func. de OL para Ajax
      //los parametros mas importantes son los dos ultimos: el scope y el handler(funcion a ejecutar
      //cuando termina el request)
      OpenLayers.loadURL(url, '', this);

    };

    //Funcion que se ejecuta cuando el request de una consulta gráfica termina
    QResponse = function(response) {

      //    alert('result = '+response.responseText);
      // if (response.responseText != '')
      {
        //	  alert(response.responseText);
        // setCapas(response.responseText);
        //	Ext.onReady(function() {
        //		   Ext.Msg.alert('Recuerde','Para visualizar la escuela debe tildar la capa '+ response.responseText +' en el arbol (Panel derecho)');});
      }

      // alert('consultas2.Js linea 210 response.responseText '+response.responseText);
      //    var texto = response.responseText;
      //	var j=new OpenLayers.Format.JSON();//creo un parser de JSON
      //	var result=j.read(response.responseText);//parseo el JSON que devuelve el request
      //  alert('result = '+result);
      //		win1 = window.open("consultas/ListaBaires2.php?capas="+Capas,"",opciones);
      //		win1.focus;
    }
  },
  buscar: function() {
    //Ext.get('resultados').update('');
    var self = this;
    var sector = this.form.findById('comboSector').getValue();
    var dist = this.form.findById('comboDistritos').getValue();
    var tipoest = this.form.findById('comboNivMod').getValue();
    var nombre = this.form.findById('valor').getValue();

    var Record = Ext.data.Record.create([{
      name: 'clave'
    }, {
      name: 'pnombre'
    }]);

    var store = new Ext.data.JsonStore({
      method: 'POST',
      url: 'services/datos_result.php?sector=' + sector + '&dist=' + dist + '&tipoest=' + tipoest + '&nombre=' + nombre,
      root: 'data',
      fields: ['clave', 'pnombre', 'distrito', 'punto']
    });

    store.load({
      params: { /*start: 0, limit: 20*/ }
    });

    var storePagingBar = new Ext.PagingToolbar({
      pageSize: 20,
      store: store,
      displayInfo: true
    });

    var expansor = new Ext.grid.RowExpander({
      tpl: new Ext.Template(
        '<p style="font-family:Verdana"> Clave:{clave} <br>Distrito: {distrito}</p>'
      )
    });

    // Muestra en negrita el nombre del toponimo
    function negrita(val) {
      return '<b>' + val + '</b>';
    }


    var grid = new Ext.grid.GridPanel({
      store: store,
      // bbar: storePagingBar,// <--- we assign the store with the information we're going to use
      columns: [
        expansor, {
          header: 'Clave',
          dataIndex: 'clave',
          width: 70,
          sortable: true
        }, {
          id: 'pnombre',
          header: 'Nombre',
          dataIndex: 'pnombre',
          width: 250,
          sortable: true
        }
        //{id:'distrito',header:'distrito', dataIndex:'distrito', width:250,sortable: true,renderer: negrita}
        //{header: '', dataIndex: 'punto'}
      ],

      // autoExpandColumn: '2',
      // autoHeight:true,
      //autoScroll: true,
      height: 480,
      plugins: expansor,
      //el: 'resultados'
    });

    // grid.render();
    // grid.expand();

    grid.on('rowclick', function(grid, rowIndex, e) {
      var regsel = grid.getSelectionModel().getSelected();
      var punto = regsel.get('punto');
      self.visualizarBusqueda(punto);
    });

    function renderButton(data, cell, record, rowIndex, columnIndex, store, grid) {
      var contentId = Ext.id();
      createGridButton.defer(1, this, [data, contentId]);
      console.debug(contentId);
      return '<div id="' + contentId + '"></div>';
    }

    function createGridButton(value, id, record) {
      new Ext.Button({
        //iconCls: 'agregar',
        text: 'Ver en mapa',
        handler: function(btn, e) {
          // do whatever you want here
          // alert ('agregar ' + value);
          // procurarMunicipio(value);
          visualizarBusqueda(value);
        }
      }).render(document.body, id);
    }

    var win = new Ext.Window({
      title: 'Escuelas',
      layout: 'fit',
      width: 510,
      height: 350,
      //renderTo: tabPanel.id('2'),
      items: [grid]
    });

    win.show();

  }
});