function visualizarBusqueda(distrito,nombre){

var nom = nombre;

var store = new Ext.data.JsonStore({
	method:'POST',
    url: './services/dist.php?dist='+distrito,
    root: 'data',
    fields: ['fuente','valor','descripcion']
  });

store.load({params: {/*start: 0, limit: 20*/}});

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
 
var grid = new Ext.grid.GridPanel({
    store: store, 
   // bbar: storePagingBar,// <--- we assign the store with the information we're going to use
    columns: [
       //expansor,
         {header:'Descripcion', dataIndex:'descripcion', width: 70, sortable: true},
         {header:'Valor', dataIndex:'valor', width:50,sortable: true},
         {header:'Fuente', dataIndex:'fuente', width: 120, sortable: true}
      ],

  // autoExpandColumn: '2',
 // autoHeight:true,
  //autoScroll: true,
  height: 160
 // plugins: expansor,    


});



var win = new Ext.Window({
    title: nom,
    layout: 'fit',
    width: 300,
    height: 160,
    //renderTo: win,
    items: grid
});

win.show();
//win.destroy();
//alert (distrito);

}