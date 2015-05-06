// function createWindowArbol( layerName, notDisplay ){
var FiltroEscuelas = new Class({
  initialize: function(mapa){
    this.mapa = mapa;
    this.crearForm();
  },
  crearCapa: function(){
    this.capa = app.getLayerRecordFromMap({
      source: "me_dev",
      name: "v_escuelas_geoserver"
    })
  },
  crearForm: function(){
    var self = this;
    var form = new Ext.FormPanel({
       // url: 'geoserver.php',
       // renderTo: Ext.getBody(),
       // frame: true,
        //title: 'Capas',
        width: 350,
          items: [{
            xtype: 'radiogroup',
            columns: 3,
            fieldLabel: 'Gestión',
            id: 'gestion',
            name: 'idsector',
            items: [{
                name: 'idsector',
                boxLabel: 'Estatal',
                inputValue: '6',
                checked: true
              },{
                name: 'idsector',
                boxLabel: 'Privada',
                inputValue: '5'
              },{
                name: 'idsector',
                boxLabel: 'Ambas',
                inputValue: '1'
              }
            ]
          },{
            xtype: 'checkboxgroup',
            fieldLabel: 'Educación Común',
            itemCls: 'x-check-group-alt',
            id: 'capa',
            columns: 1,
            items: [
              {boxLabel: 'Nivel Inicial', name: 'capa', inputValue: '1'},
              {boxLabel: 'Nivel Primario', name: 'capa', inputValue: '2'},
              {boxLabel: 'Nivel Secuandario', name: 'capa', inputValue: '3'},
              {boxLabel: 'Nivel Superior no Univ.', name: 'capa', inputValue: '4'}
            ]
          },{
                xtype: 'checkboxgroup',
                fieldLabel: 'Modalidad Jóvenes, Adultos y FP',
                itemCls: 'x-check-group-alt',
                id: 'capa1',
                columns: 1,
                   items: [
                      {boxLabel: 'Nivel Primario', name: 'capa', inputValue: '5'},
                      {boxLabel: 'Nivel Medio', name: 'capa', inputValue: '6'},
                      {boxLabel: 'Formación Profesional', name: 'capa', inputValue: '7'}
                          ]
              }
              ,{
                xtype: 'checkboxgroup',
                fieldLabel: 'Modalidad Especial',
                itemCls: 'x-check-group-alt',
                id: 'capa2',
                columns: 1,
                   items: [
                      {boxLabel: 'Nivel Inicial', name: 'capa', inputValue: '8'},
                      {boxLabel: 'Nivel Primario', name: 'capa', inputValue: '9'},
                      {boxLabel: 'Post Primario', name: 'capa', inputValue: '10'},
                      {boxLabel: 'Formación Laboral', name: 'capa', inputValue: '11'}
                          ]
              }
              ,{
                xtype: 'checkboxgroup',
                fieldLabel: 'Modalidad Artística',
                itemCls: 'x-check-group-alt',
                id: 'capa3',
                columns: 1,
                   items: [
                      {boxLabel: 'Artística', name: 'capa', inputValue: '12'}
                          ]
              }
              ,{
                xtype: 'checkboxgroup',
                fieldLabel: 'Modalidad Educación Física',
                itemCls: 'x-check-group-alt',
                id: 'capa4',
                columns: 1,
                   items: [
                      {boxLabel: 'Educación Física', name: 'capa', inputValue: '13'}
                          ]
              }
               ,{
                xtype: 'checkboxgroup',
                fieldLabel: 'Modalidad Psicología Com. y PS',
                itemCls: 'x-check-group-alt',
                id: 'capa5',
                columns: 1,
                   items: [
                      {boxLabel: 'Psicología', name: 'capa', inputValue: '14'}
                    ]
              },
              {
                xtype: 'checkboxgroup',
                fieldLabel: 'Ambito',
                itemCls: 'x-check-group-alt',
                id: 'ambito',
                columns: 1,
                 items: [
                   {boxLabel: 'Ambito', name: 'ambito', inputValue: '1'}
                     ]
              },
               
                 ], //items del form_panel
              
              buttons: [{
            text: 'Mostrar en Mapa',
      handler: function(){
        var servReq = document.getElementById("gestion");
         var gestion = form.findById('gestion').getValue();
         var capas = form.findById('capa').getValue();
         capas = capas.concat(form.findById('capa1').getValue());
         capas = capas.concat(form.findById('capa2').getValue());
         capas = capas.concat(form.findById('capa3').getValue());
         capas = capas.concat(form.findById('capa4').getValue());
         capas = capas.concat(form.findById('capa5').getValue());
        capasID = [];
        for(i in capas){
          var capa = capas[i];
          if(capa.inputValue)
            capasID.push(capa.inputValue);
        }
        var gestion = gestion.inputValue;
        var ambito = (form.findById('ambito').getValue().length > 0)?true:false;
        var cql = '';
        if(gestion != 1){
          cql += 'sector = '+gestion+' AND ';
        }
        if(capas.length > 0){
          cql += 'capa IN ('+capasID.join(',')+')';
        }
        if(capasID.length<1){
          alert('Debe seleccionar al menos un nivel educativo.');
        }else{
          self.actualizarFiltro(cql,ambito);
          self.ventana.hide();
        }
      }

        }]
  }); //form_panel
    this.ventana = new Ext.Window({
          title: 'Arbol de capas',
          height: 520,
          closeAction: 'hide',
          width: 400,
          layout: 'fit',
          resizable: true,
          //iconCls: 'bt-query',
          items: [ form ]
      });
  },
  mostrar: function(){
    if(!this.capa)
      this.crearCapa();
    this.ventana.show();
  },
  actualizarFiltro: function(cql,ambito){
    this.capa.data.layer.mergeNewParams({
      'cql_filter':cql,
      'styles': (ambito==false)?'':'Escuelas_A'
    });
    this.capa.data.layer.setVisibility('true');
  }
});