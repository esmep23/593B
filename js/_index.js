var direccion = "http://pocket.ec/dev/beach_593/";
var _playas = new Array();
var _actividades = new Array();
var _servicios = new Array();
var _detallePlaya = new Array();
var favoritos;
var map;


$( document ).ready(function() {
   
  //sizeWindows();



  if (localStorage.getItem("favoritos") === null) {
    localStorage.setItem( 'favoritos', "0" );
  }


  myApp.onPageInit('playas', function (page) {
    playasOFFLine();
    cargoFavoritos();
    misPlayas();

    $('div.navbar').css('display','block');
  });


  getMobileOperatingSystem();
 
 
  if(navigator.onLine){
    //console.log('Online');
    getPlayas();
    cargoActividades();

      
    
  } else {
    // alert('Offline');

    

  }



$( "playa-"+argument+' .rateStar .favoriteStar i' ).toggle(
    function() {
      alert(0);
      //$( this ).addClass( "activo" );
    }, function() {
      alert(1);
      //$( this ).removeClass( "activo" );
    }
  );


}); // document ready

  function sizeWindows(){
    $('#busqueda .contenido').css('height', screen.height-(screen.height/1.8));
  }

  /* detect */
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
    {
      //return 'iOS';
      var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "dist/css/framework7.ios.min.css"
      });
      css_link.appendTo('head');

      var css_cssespecifico = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "css/css.ios.css"
      });
      css_cssespecifico.appendTo('head');

    }
    else if( userAgent.match( /Android/i ) )
    {

      //return 'Android';
      var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "dist/css/framework7.material.min.css"
      });
      css_link.appendTo('head');

      var css_cssespecifico = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "css/css.material.css"
      });
      css_cssespecifico.appendTo('head');
      
    }
    else
    {
      //return 'unknown';
      var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        //href: "dist/css/framework7.material.min.css"
        href: "dist/css/framework7.ios.min.css"
      });
      css_link.appendTo('head');


      var css_cssespecifico = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        //href: "css/css.material.css"
        href: "css/css.ios.css"
      });
      css_cssespecifico.appendTo('head');
      
    }
  }
  /*detect*/

  function getPlayas() {
    console.log('getPlayas');
    $('#busqueda .list-block').append('<ul></ul>');
    $.ajax({
      url: direccion+'actions/593_getInfo.php',
      type: "POST",
      cache: false,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 

            var valueToPush = { };
           
            valueToPush.id_playa = value.id_playa;
            valueToPush.nombre = value.nombre;
            valueToPush.slug = value.slug;
            valueToPush.pais = value.pais;
            valueToPush.nombrePais = value.nombre_pais;
            valueToPush.ciudad = value.ciudad;
            valueToPush.nombreCiudad = value.nombre_ciudad;
            valueToPush.provincia  = value.provincia ;
            valueToPush.nombreProvincia = value.nombre_provincia;
            valueToPush.calle = value.calle;
            valueToPush.mapa = value.mapa;
            valueToPush.status = value.status;
            valueToPush.descripcion = value.descripcion;
            valueToPush.foto = value.foto;

            _playas.push(valueToPush);
            localStorage.setItem("_playas", JSON.stringify(_playas));

            });
        }              
      },
      complete : function(data){
        
        //console.log(data);
        
      },
      error : function(error){     
          //alert(error);
      }
    });     
  }

  function cargoActividades(){
    console.log('cargoActividades');
    
    $.ajax({
      url: direccion+'actions/593_getActividades_1.php',
      type: "POST",
      cache: false,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
            $.each(response,function(key,value){ 
                var valueToPush = { };

                valueToPush.playa = value.playa;
                valueToPush.actividades = value.actividades;
                valueToPush.nombreActividad = value.nombreActividad;
                valueToPush.icono = value.icono;
                valueToPush.tipo = value.tipo;
                
                _actividades.push(valueToPush);
                localStorage.setItem("_actividades", JSON.stringify(_actividades));

            });
        }              
      },
      complete : function(data){
        
        console.log(data);
      },
      error : function(error){     
          console.log(error);
      }
    });
  }

/* ----------------------------------------------------------------------------------------------- */
/* CARGO DATOS PARA APP */
/* ----------------------------------------------------------------------------------------------- */

function playasOFFLine(){
  console.log('playasOFFLine');
  //[0] - id_playa
  //[1] - nombre
  //[2] - slug
  //[3] - pais
  //[4] - nombrePais
  //[5] - ciudad
  //[6] - nombreCiudad
  //[7] - provincia
  //[8] - nombreProvincia
  //[9] - calle
  //[10] - mapa
  //[11] - status
  //[12] - descripcion
  //[13] - foto
      
      for ( playa in _playas) {
         //console.log( _playas[playa].nombre );
        
        $('#busqueda .list-block ul').append('<li class="item-content" onclick="cargoDetalle('+_playas[playa].id_playa+');"><div class="item-inner"><div class="item-title">'+_playas[playa].nombre+'</div></div></li>');
        $('#playas .contenido').append('<div class="row playa playa-'+_playas[playa].id_playa+'" ><div class="col-50" onclick="cargoDetalle('+_playas[playa].id_playa+');"><figcaption>'+_playas[playa].slug+'</figcaption><img src="img/comodin.png" class="fotodestino" /></figure></div><div class="col-50"><h5>Actividades</h5><div class="mActividades"></div><h5>Servicios</h5><div class="mServicios"></div></div><div class="rateStar"><div class="favoriteStar" onclick="rate('+_playas[playa].id_playa+')" ><i class="fa fa-star fa-lg"></i></div></div></div>');
        

        for ( actividad in _actividades) {

            
            //console.log(argument);
            if (_actividades[actividad].playa == _playas[playa].id_playa ){

              console.log(_actividades[actividad].tipo);
              if ( _actividades[actividad].tipo == '1'){
                console.log('#playas .contenido .playa-'+_actividades[actividad].playa+' .mActividades');
                $('#playas .contenido .playa-'+_actividades[actividad].playa+' .mActividades').append('<div class="item item-actividades"><i class="fa '+  _actividades[actividad].icono  +'"></i></div>');
              
              }else{
                console.log('#playas .contenido .playa-'+_actividades[actividad].playa+' .mActividades');
                $('#playas .contenido .playa-'+_actividades[actividad].playa+' .mServicios').append('<div class="item item-actividades"><i class="fa '+  _actividades[actividad].icono  +'"></i></div>');
              
              }
              
            }
            
        }

      
        //default iconos.

          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mActividades').append('<div class="item item-actividades"><i class="fa fa-hospital"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mActividades').append('<div class="item item-actividades"><i class="fa fa-chiringo"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mActividades').append('<div class="item item-actividades"><i class="fa fa-tiendas"></i></div>');
          console.log(_playas[playa].id_playa);
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mServicios').append('<div class="item item-actividades"><i class="fa fa-windsurf"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mServicios').append('<div class="item item-actividades"><i class="fa fa-aves"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mServicios').append('<div class="item item-actividades"><i class="fa fa-cabalgatas"></i></div>');
          

        } 
    
}

function cargoDetalle(argument){
    console.log('cargoDetalle');



    mainView.router.load({pageName: 'infoPlayas'});

    for ( playa in _playas) {
      if (_playas[playa].id_playa == argument ){
        $('#infoPlayas .resultado > div').empty();
        //$('#infoPlayas .contenido').empty();
        $('#infoPlayas .informacion-lugar').empty();
        $('#infoPlayas .contenido .mActividades').empty();
        $('#infoPlayas .contenido .mServicios').empty();
        $('#infoPlayas .rated .stars i').removeClass('activo');
        
        $('#infoPlayas .resultado > div').append('<h3>'+_playas[playa].nombre+'</h3>');
        $('#infoPlayas .contenido').append('<div id="goMapa" onclick="cargoMapa('+_playas[playa].id_playa+')"><span class="fa fa-map-marker fa-4x"></span></div>');
        $('#infoPlayas .informacion-lugar').append(_playas[playa].descripcion);

        var oldItems = localStorage.getItem('favoritos');
        var presto = oldItems.indexOf(argument);
        console.log('pruebaaaaaaaaaaaaaa'+presto);
        if (presto == -1){
          //oldItems.push(argument);
          $('#infoPlayas .rated .stars i').removeClass('activo');
        }else{
          $('#infoPlayas .rated .stars i').addClass('activo');
        }

                for ( actividad in _actividades) {

            
                    //console.log(argument);
                    if (_actividades[actividad].playa == _playas[playa].id_playa ){

                      //console.log(_actividades[actividad].tipo);
                      if ( _actividades[actividad].tipo == '1'){
                        console.log('#infoPlayas .contenido .mActividades');
                        $('#infoPlayas .contenido .mActividades').append('<div class="item item-actividades"><i class="fa '+  _actividades[actividad].icono  +'"></i></div>');
                      
                      }else{
                        console.log('#infoPlayas .contenido .mServicios');
                        $('#infoPlayas .contenido .mServicios').append('<div class="item item-actividades"><i class="fa '+  _actividades[actividad].icono  +'"></i></div>');
                      
                      }
                      
                    } 
                    
                }

      }
    } 


}

function cargoMapa(argument){

}

function misPlayas(){
  console.log('misPlayas');
  $('#misplayas .contenido').empty();
  var favRate = JSON.parse(localStorage.getItem( 'favoritos') );
    //favRate = favRate.shift();
    //console.log('favRate - '+ favRate.length);
   for (var x=0; x<=favRate.length-1; x++)  {  
      $('.playa-'+favRate[x]+' i').addClass('activo');

      //console.log('_playas - '+ _playas.length);
      for (var p=0; p<=_playas.length-1; p++)  { 
       // _playas[p].indexOf(favRate[x]);
       //console.log(_playas[p].id_playa +' - ' + favRate[x]);
         if(_playas[p].id_playa == favRate[x]){
            //console.log('OK ----------------------'+(p+1));
            $('#misplayas .contenido').append('<div class="col-50 playa playa-'+_playas[p].id_playa+' " ><div onclick="cargoDetalle('+_playas[p].id_playa+');"><figcaption>'+_playas[p].nombre+'</figcaption><img src="img/comodin.png" /></figure></div></div>');
         }
        
      }
  }
}

function rate(argument){

  

  var oldItems = JSON.parse(localStorage.getItem('favoritos')) || [];
  var presto = oldItems.indexOf(argument);
  if (presto == 0){

  }else{
    oldItems.push(argument);
  }

  localStorage.setItem('favoritos', JSON.stringify(eliminateDuplicates(oldItems)));
  var favRate = JSON.parse(localStorage.getItem( 'favoritos') );
   for (x=0; x<=favRate.length-1; x++)  {  
      $('.playa-'+favRate[x]+' i').addClass('activo');
  }

}

function cargoFavoritos(){
  console.log('cargoFavoritos');
  var favRate = JSON.parse(localStorage.getItem( 'favoritos') );
   for (x=0; x<=favRate.length-1; x++)  {  
      $('.playa-'+favRate[x]+' i').addClass('activo');
  }
}

function eliminateDuplicates(arr) {
 var i,
     len=arr.length,
     out=[],
     obj={};

 for (i=0;i<len;i++) {
    obj[arr[i]]=0;
 }
 for (i in obj) {
    out.push(i);
 }
 return out;
}
