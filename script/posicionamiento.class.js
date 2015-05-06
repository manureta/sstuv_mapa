function posicioname(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var lnglat = new OpenLayers.LonLat(lng,lat).transform(
          new OpenLayers.Projection("EPSG:4326"),


               app.mapPanel.map.getProjectionObject())
               app.mapPanel.map.setCenter(lnglat, 14);

              var markers = new OpenLayers.Layer.Markers( "Marcas" );
                 markers.addMarker(new OpenLayers.Marker(lnglat));
                 app.mapPanel.map.addLayer(markers);

      });
    }
  }