var server = "http://hyperdvba:8080/";//"http://25.9.84.47:8080/";//http://hyperdvba:8080/";
var capa = "primaria";//"primaria";
var workspace = "dvba";//"dvba";
proj4.defs["EPSG:22185"] = "+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
//var Proj4js = proj4;
var Progresiva = new Class({ 
	Implements: Events,
	win: false,
	dom: false,
	ext: false,
	initialize: function(ext){
		this.ext = ext;
		this.dom = $('progresiva');
		this.clickEnMapa();
		this.dom.getElement('button').addEvent('click',this.consultar.bind(this));
		window.callbackProgresiva = this.procesarRespuesta.bind(this);
		this.capa = new OpenLayers.Layer.Vector("Consulta Progresiva", {
			group: "vialidad"
		});
	},
	mostrar: function(){
		var self = this;
		if(!this.win){
			this.win = new Ext.Window({
				title		: 'Busqueda y Calculo de Progresiva',
				width		: 300,
				height		: 100,
				closeAction	: 'hide',
				contentEl	: this.dom,
				autoScroll	: true,
				onHide: function(){
					self.clickControl.deactivate();
					app.mapPanel.map.removeLayer(self.capa);
				},
				onShow: function(){
					self.clickControl.activate();
					app.mapPanel.map.addLayer(self.capa);
				}
			});
		}
		app.mapPanel.map.addLayer(this.capa);
		this.win.show(this.ext);
	},
	clickEnMapa: function(){
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
            	var resultadoDom = self.dom.getElement('#resultadoP')
				resultadoDom.empty();
                var lonlat = app.mapPanel.map.getLonLatFromPixel(e.xy);
                var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);
                if(self.bufferVec){
					self.capa.removeFeatures([self.bufferVec]);
					self.bufferVec = false;
                }
                var bufferValue = 50;
                self.buffer = new OpenLayers.Geometry.Polygon.createRegularPolygon(point,bufferValue,20);
				
				self.bufferVec = new OpenLayers.Feature.Vector(self.buffer);
				self.capa.addFeatures([self.bufferVec]);
                
                var bounds = self.buffer.getBounds().toArray();
                self.win.disable();
				self.reqJsonP = new Request.JSONP({
					url: server+'geoserver/'+workspace+'/wfs',
					timeout: 7000,
					onTimeout: function(){
						console.log('onTimeout',arguments);	
						//Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
						self.win.enable();
					},
					data: {
						service: 'WFS',
						version: '1.0.0',
						request: 'GetFeature',
						typeName: capa,
						maxFeatures: '100',
						srsName: app.mapPanel.map.getProjection(),
						outputFormat: 'text/javascript',
						format_options: 'callback:callbackProgresiva',
						filter: "<Filter><BBOX><PropertyName>the_geom</PropertyName><Box srsName='EPSG:900913'><coordinates>"+bounds[0]+","+bounds[1]+" "+bounds[2]+","+bounds[3]+"</coordinates></Box></BBOX></Filter>"
					},
				}).send();
            }

        });
		this.clickControl = new ClickControl();
		app.mapPanel.map.addControl(this.clickControl);
		//this.clickControl.deactivate();
	},
	consultar: function(){
		var resultadoDom = this.dom.getElement('#resultadoP')
		resultadoDom.empty();
		this.kilometro = this.dom.getElement('#kilomentroP').value;
		this.ruta = this.dom.getElement('#rutaP').value.trim();
		this.win.disable();
		this.reqJsonP = new Request.JSONP({
			url: server+'geoserver/'+workspace+'/wfs',
			timeout: 7000,
			data: {
				service: 'WFS',
				version: '1.0.0',
				request: 'GetFeature',
				typeName: capa,
				maxFeatures: '100',
				srsName: app.mapPanel.map.getProjection(),
				outputFormat: 'text/javascript',
				format_options: 'callback:callbackProgresiva',
				filter: '<And>  <PropertyIsEqualTo>    <PropertyName>RUTA</PropertyName>    <Literal>'+this.ruta+'</Literal>  </PropertyIsEqualTo>  <PropertyIsGreaterThanOrEqualTo>   <PropertyName>PK_FINAL</PropertyName>   <Literal>'+this.kilometro+'</Literal>  </PropertyIsGreaterThanOrEqualTo>  <PropertyIsLessThanOrEqualTo>   <PropertyName>PK_INIC</PropertyName>   <Literal>'+this.kilometro+'</Literal>  </PropertyIsLessThanOrEqualTo> </And>'
			},
			onTimeout: function(){
				console.log('onTimeout',arguments);	
				//Ext.MessageBox.alert('Error', 'No se pudo encontrar un resultado, los datos son erroneos.');
				self.win.enable();
			}
		}).send();
	},
	procesarRespuesta: function(response){
		this.reqJsonP.cancel();
		var respuesta = response;
		var self = this;
		console.log('Respuesta',respuesta);
		var resultadoDom = this.dom.getElement('#resultadoP')
		resultadoDom.empty();
		if(respuesta.features.length == 0){
			Ext.MessageBox.alert('Error', 'No se pudo encontrar la progresiva, los datos son erroneos.');
		}else{
			respuesta.features.each(function(item){
				var feature = item;
				// var mapa = [];
				// for(i in feature.properties){
				// 	if(typeof feature.properties[i] == 'function')
				// 		continue;
				// 	mapa.push([i,feature.properties[i]]);
				// }
				// var resultado = new HtmlTable({
				// 	properties: {
				// 		border: 1,
				// 		cellspacing: 0
				// 	},
				// 	headers: ['Propiedad', 'Valor'],
				// 	rows: mapa,
				// 	zebra: true
				// });
				var punto,
					lineString = [];
				for (i in feature.geometry.coordinates[0]){
					punto = feature.geometry.coordinates[0][i];
					if(typeof punto == 'function') continue;
					punto = new OpenLayers.Geometry.Point(punto[0],punto[1]);
					lineString.push(punto);
				}

				var geometria = new OpenLayers.Geometry.LineString(lineString);

				//Calculo la el punto de la progresiva dentro del tramo
				//PK_INIC,PK_FINAL
				//console.log(feature.properties.PK_INIC, feature.properties.PK_FINAL, ' = ', feature.properties.PK_FINAL - feature.properties.PK_INIC);
				var porcentaje = ((parseFloat(self.kilometro)-feature.properties.PK_INIC))/(feature.properties.PK_FINAL-feature.properties.PK_INIC);
				console.log(porcentaje);
				var vertices = geometria.getVertices();
				var suma = 0;
				vertices.each(function(point,i){
					if(i==vertices.length-1) return;
					//console.log(point.distanceTo(vertices[i+1]));
					if(self.buffer){
						var partecita = new OpenLayers.Geometry.LineString([vertices[i],vertices[i+1]]);
						if(self.buffer.intersects(partecita)){
							sumaBuffer = suma + point.distanceTo(self.buffer.getCentroid());
						}
					}
					suma += point.distanceTo(vertices[i+1]);
				})
				if(self.buffer){
					self.buffer = false;
					var porcentaje = ((sumaBuffer / suma)>1)?1:(sumaBuffer / suma);
					self.dom.getElement('#kilomentroP').value = Math.round((feature.properties.PK_INIC + (feature.properties.PK_FINAL - feature.properties.PK_INIC) * porcentaje)*1000)/1000;
					self.dom.getElement('#rutaP').value = feature.properties.RUTA;
				}
				
				var porcentajeEnSuma = suma * porcentaje;
				
				var listo = false;
				vertices.each(function(point,i){
					if(listo) return;
					if(i==vertices.length-1) return;
					//console.log(point.distanceTo(vertices[i+1]));
					if(porcentajeEnSuma - point.distanceTo(vertices[i+1]) < 0){
						listo = true;
						var porcentajeTramo = porcentajeEnSuma/point.distanceTo(vertices[i+1]);
						var distanciaProximo = point.distanceTo(vertices[i+1],{details:true});
						if(self.puntoFeature){
							self.capa.removeFeatures([self.puntoFeature]);
							self.puntoFeature = false;
		                }
						self.puntoConsulta = point.clone();
						self.puntoConsulta.x = distanciaProximo.x0+(distanciaProximo.x1-distanciaProximo.x0)*porcentajeTramo;
						self.puntoConsulta.y = distanciaProximo.y0+(distanciaProximo.y1-distanciaProximo.y0)*porcentajeTramo;
						self.puntoFeature = new OpenLayers.Feature.Vector(self.puntoConsulta);
						self.capa.addFeatures([self.puntoFeature]);
					}else{
						porcentajeEnSuma -= point.distanceTo(vertices[i+1]);
					}
				})

				if(self.vectorFeature){
					self.capa.removeFeatures([self.vectorFeature]);
					self.vectorFeature = false;
                }
				self.vectorFeature = new OpenLayers.Feature.Vector(geometria);
				self.capa.addFeatures([self.vectorFeature]);
				self.win.enable();
				app.mapPanel.map.setCenter([self.puntoConsulta.x,self.puntoConsulta.y],15);
				// var boton = new Element('button',{
				// 	text: 'Ver en mapa'
				// });
				// boton.addEvent('click',function(){
				// 	app.mapPanel.map.zoomToExtent(geometria.getBounds());
				// })
				
				// boton.inject(resultadoDom);
				// resultado.inject(resultadoDom);
			})
		}
	}
});