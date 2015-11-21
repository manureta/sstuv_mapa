var Sesion = new Class({
	initialize: function(){
		var self = this;
		var server='http://190.188.234.6';
		var jsonRequest = new Request.JSON({
    		url: server+'/account/check_session', 
    		onSuccess: function(response){
				if(response.active){
					Ext.getCmp("sesion").setText("Salir");
					Ext.getCmp("sesion").setHandler(function(){
//						alert("saliendo");
						Ext.getCmp("sesion").setText("Inicio Sesión");
					//$("sesion").set("text","Salir");
						var jsonRequest = new Request.JSON({
				    		url: server+'/account/ajax_logout', 
				    		onSuccess: function(response){
								alert('Ya salió');
							}
						}).post({
							'o': 'logout'
						});
					});
					  	
					//});
					
				}
			}
		}).get({
		//	'o': 'status'
		});
	},
	chequear: function(){

		

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
		            		url: server+'/account/ajax_login', 
		            		onSuccess: function(response){
								self.win.enable();
								if(response.ok){
									window.location.reload();
								}else{
									Ext.MessageBox.show({
							           title: 'Error',
							           msg: 'Los datos de acceso son erroneos.',
							           buttons: Ext.MessageBox.OK,
							           icon: Ext.MessageBox.ERROR
							       });
								}
							},
						data:{"username":"uuuuuu","password":"xxxxx"}
						}).post({
							'username': self.form.getForm().findField('usuario').getValue(), 
							'password': self.form.getForm().findField('contrasena').getValue(),
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
