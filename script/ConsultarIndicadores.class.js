var ConsultarIndicadores = new Class({
	initialize: function() {
		this.msg;
		//criterios � um array que vai armazenar a lista de criterios que o usu�rio adicionar
		this.criterios = new Array();
		this.crearVentana();
	},
	crearCapa: function() {
		this.capa = app.getLayerRecordFromMap({
			source: "me_dev",
        	name: "v_indi_distrito",
		})
	},
	mostrar: function() {
		if (!this.capa)
		   this.crearCapa();
		this.ventana.show();
	},
	createStoreDominio: function() {
		// le os culturas do banco de dados
		var store = new Ext.data.JsonStore({
			autoDestroy: true,
			autoLoad: true,
			url: 'services/dominio.php',
			//  storeId: 'myStore',
			root: 'data',
			totalProperty: 'total',
			idProperty: 'dominio',
			fields: ['descripcion', 'dominio'],
			sortInfo: {
				field: 'descripcion',
				direction: 'ASC'
			}
		});

		return store;

	},
	createStoreIndicador: function() {

		// le os culturas do banco de dados
		var store = new Ext.data.JsonStore({
			autoDestroy: true,
			autoLoad: true,
			url: 'services/indi.php',
			//  storeId: 'myStore',
			root: 'data',
			totalProperty: 'total',
			idProperty: 'nuevo',
			fields: ['descripcion', 'indicador'],
			sortInfo: {
				field: 'descripcion',
				direction: 'ASC'
			}
		});

		return store;

	},
	createStorePeriodos: function() {

		// le os culturas do banco de dados
		var store = new Ext.data.JsonStore({
			autoDestroy: true,
			autoLoad: true,
			url: 'services/periodos.php',
			//  storeId: 'myStore',
			root: 'data',
			totalProperty: 'total',
			idProperty: 'nuevo',
			fields: ['descripcionperiodo', 'idperiodo'],
			sortInfo: {
				field: 'descripcionperiodo',
				direction: 'ASC'
			}
		});

		return store;

	},
	createStoreOfertas: function() {

		// le os culturas do banco de dados
		var store = new Ext.data.JsonStore({
			autoDestroy: true,
			autoLoad: true,
			url: 'services/ofertas.php',
			//  storeId: 'myStore',
			root: 'data',
			totalProperty: 'total',
			idProperty: 'descripcionoferta',
			fields: ['descripcionoferta', 'oferta'],
			sortInfo: {
				field: 'descripcionoferta',
				direction: 'ASC'
			}
		});

		return store;

	},
	crearVentana: function(layerName, notDisplay) {
		// cria a store para armazenar o array de criterios
		var store = new Ext.data.ArrayStore({
			fields: [{
				name: 'titulo'
			}, {
				name: 'criterio'
			}, {
				name: 'cor'
			}, {
				name: 'label'
			}]
		});
		store.loadData(this.criterios);

		// crea combo dominio
		var storeDominio = this.createStoreDominio();
		var comboDominio = new Ext.form.ComboBox({
			id: 'comboDominio',
			store: storeDominio,
			displayField: 'descripcion',
			valueField: 'dominio',
			typeAhead: true,
			mode: 'remote',
			editable: false,
			allowBlank: false,
			blankText: 'obligatorio ',
			fieldLabel: 'Dominio',
			anchor: '100%',
			forceSelection: true,
			triggerAction: 'all',
			emptyText: 'Selecione un dominio ...',
			selectOnFocus: true
		});

		// crea combo indicadores
		var storeIndi = this.createStoreIndicador();
		var comboIndi = new Ext.form.ComboBox({
			id: 'comboIndi',
			store: storeIndi,
			displayField: 'descripcion',
			valueField: 'indicador',
			typeAhead: true,
			mode: 'remote',
			editable: false,
			allowBlank: false,
			blankText: 'obligatorio ',
			fieldLabel: 'Indicador',
			anchor: '100%',
			forceSelection: true,
			triggerAction: 'all',
			emptyText: 'Selecione un indicador ...',
			selectOnFocus: true
		});

		// crea combo indicadores
		var storePer = this.createStorePeriodos();
		var comboPer = new Ext.form.ComboBox({
			id: 'comboPer',
			store: storePer,
			displayField: 'descripcionperiodo',
			valueField: 'idperiodo',
			typeAhead: true,
			mode: 'remote',
			editable: false,
			allowBlank: false,
			blankText: 'obligatorio ',
			fieldLabel: 'Periodo',
			anchor: '100%',
			forceSelection: true,
			triggerAction: 'all',
			emptyText: 'Selecione un periodo ...',
			selectOnFocus: true
		});

		// crea combo ofertas
		var storeOfertas = this.createStoreOfertas();
		var comboOfertas = new Ext.form.ComboBox({
			id: 'comboOfertas',
			store: storeOfertas,
			displayField: 'descripcionoferta',
			valueField: 'oferta',
			typeAhead: true,
			mode: 'remote',
			editable: false,
			allowBlank: false,
			blankText: 'obligatorio ',
			fieldLabel: 'Modalidad y Nivel',
			anchor: '100%',
			forceSelection: true,
			triggerAction: 'all',
			emptyText: 'Selecione una oferta ...',
			selectOnFocus: true
		});

		var self = this;
		this.form = new Ext.FormPanel({
			id: "form_ibge_basica",
			frame: false,
			bodyStyle: 'padding:5px 5px 0',
			width: 629,
			items: [
				comboDominio, comboIndi, comboPer, comboOfertas,
			],
			buttons: [{
				text: 'Generar Capa',
				handler: function() {
					self.form_query_indi_handler();
				}
			}]
		});

		//var alturaJanela = isPerfilAdm() ? 520 : 300;
		var alturaJanela = 200;

		// tenta restaurar os valores do form
		//	restauraForm( layerName, form );

		// quando a function for executada pelo carregamento de mapas do banco de dados, n�o executa a window
		this.ventana = new Ext.Window({
			title: 'Consulta Indicadores',
			height: alturaJanela, // antigo 300 para a versao nao completa 500 para a completa
			width: 600,
			layout: 'fit',
			resizable: true,
			closeAction: 'hide',
			//iconCls: 'bt-query',
			items: [this.form]
		});
	},
	form_query_indi_handler: function() {
		//  try {

		// var domi = form.findById('comboDominio').getValue();
		var indi = this.form.findById('comboIndi').getValue();
		var per = this.form.findById('comboPer').getValue();
		var ofer = this.form.findById('comboOfertas').getValue();


		var cql = 'indicador = ' + indi + ' AND idperiodo =' + per + ' AND oferta =' + ofer + ' ';
		var estilo = '';
		if (indi == 7.4) {
			nom_capa = 'Total Establecimientos ' + ofer + ' ' + per;
			estilo = 'indi_estab_dist';
		} else if (indi == 6.1) {
			nom_capa = 'Total Alumnos ' + ofer + ' ' + per;
			estilo = 'indi_alum_dist';
		} else if (indi == 12.1) {
			nom_capa = 'Total Unidades Educativas ' + ofer + ' ' + per;
			estilo = 'indi_estab_dist';
		}

		this.capa.set('title',nom_capa);
		this.capa.data.layer.mergeNewParams({
			'cql_filter': cql,
		    'styles': estilo
		});
		this.capa.data.layer.setVisibility('true');
	}
});