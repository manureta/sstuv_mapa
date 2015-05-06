var Sesion = new Class({
	initialize: function(){
		var self = this;
		var jsonRequest = new Request.JSON({
    		url: './services/sesion.php', 
    		onSuccess: function(response){
				if(response){
					$('sesion').set('text','Salir');
					$('sesion').addEvent('click',function(){
						var jsonRequest = new Request.JSON({
				    		url: './services/sesion.php', 
				    		onSuccess: function(response){
								window.location.reload();
							}
						}).get({
							'o': 'logout'
						});
					});
				}else{
					$('sesion').set('text','Ingresar');
					$('sesion').addEvent('click',self.mostrar.bind(this));
				}
			}
		}).get({
			'o': 'status'
		});
	},
	mostrar: function(){
		var self = this;
		if(!this.capa){
			this.capa = app.getLayerRecordFromMap({
				source: "ol",
	        	name: "buffer",
			}).getLayer();
		}
		if(!this.win){
			 this.form = new Ext.FormPanel({
		        baseCls: 'x-plain',
		        labelWidth: 100,
		        // layout: {
		        //     type: 'vbox',
		        //     align: 'stretch'  // Child items are stretched to full width
		        // },
		        defaults: {
		            xtype: 'textfield'
		        },

		        items: [{
                	fieldLabel: 'Usuario',
                	name: 'usuario',
                	allowBlank:false
            	},{
                	fieldLabel: 'Contraseña',
                	name: 'contrasena',
                	inputType: 'password',
                	allowBlank:false
            	}]
		    });
			this.win = new Ext.Window({
				title: 'Ingresar',
		        collapsible: true,
		        maximizable: true,
		        width: 300,
		        height: 150,
		        minWidth: 200,
		        minHeight: 175,
		        layout: 'fit',
		        plain: true,
		        bodyStyle: 'padding:5px;',
		        buttonAlign: 'right',
		        items: this.form,
		        closeAction: 'hide',
		        buttons: [{
		            text: 'Entrar',
		            handler: function(){
		            	self.win.disable();
		            	var jsonRequest = new Request.JSON({
		            		url: './services/sesion.php', 
		            		onSuccess: function(response){
								self.win.enable();
								if(response){
									window.location.reload();
								}else{
									Ext.MessageBox.show({
							           title: 'Error',
							           msg: 'Los datos de acceso son erroneos.',
							           buttons: Ext.MessageBox.OK,
							           icon: Ext.MessageBox.ERROR
							       });
								}
							}
						}).get({
							'usuario': self.form.getForm().findField('usuario').getValue(), 
							'contrasena': self.form.getForm().findField('contrasena').getValue(),
							'o': 'login'
						});
		            }
		        }],
				onHide: function(){
					
				},
				onShow: function(){
					
				}
			});
		}
		this.win.show();
	},
});