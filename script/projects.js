/*
## Selector de proyectos para IDE-Hab
## by @manureta 
## Julio 2015
*/



function get_project(){
// Get url parameters
 var params = {};
// window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
 window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
   params[key] = value;
 });

 if ( (params.p)){
	console.log(params.p);
	return params.p;
}

}
