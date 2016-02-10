var direccion = "http://pocket.ec/dev/beach_593/";
var _playas = new Array();
var _actividades = new Array();
var _servicios = new Array();
var _detallePlaya = new Array();
var favoritos;
var map;


$( document ).ready(function() {
   
   sizeWindows();
   if (localStorage.getItem("favoritos") === null) {
        localStorage.setItem( 'favoritos', "0" );
    }
  

   
    if(navigator.onLine){
        alert('Online');
        getPlayas(); //cargo datos online.
        misPlayas();
      } else {
       // alert('Offline');
      
    }
    getMobileOperatingSystem();

    myApp.onPageInit('misplayas', function (page) {
      
      misPlayas();

    });

}); // document ready




function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
      _dispositivo = 2;
      alert('iOS');//return 'iOS';
  }
  else if( userAgent.match( /Android/i ) ){
    _dispositivo = 1;
    alert('Android');//return 'Android';
    }
    else
    {
      alert('unknown');//return 'unknown';
    }
}

function sizeWindows(){
  $('#busqueda .contenido').css('height', screen.height-(screen.height/1.8));
}

function getPlayas() {
    $('#busqueda .list-block').append('<ul></ul>');
    $.ajax({
      url: direccion+'actions/593_getInfo.php',
      type: "POST",
      cache: false,
      dataType: "json",
      success: function(response){  
        //$('#playas .contenido').empty();
        //$('#busqueda .contenido').css('overflow-y','scroll');
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            id_playa = value.id_playa;
            nombre = value.nombre;
            slug = value.slug;
            pais = value.pais;
            nombrePais = value.nombre_pais;
            ciudad = value.ciudad;
            nombreCiudad = value.nombre_ciudad;
            provincia  = value.provincia ;
            nombreProvincia = value.nombre_provincia;
            calle = value.calle;
            mapa = value.mapa;
            status = value.status;
            descripcion = value.descripcion;
            foto = value.foto;



            _playas.push(id_playa,nombre,slug,pais,nombrePais,ciudad,nombreCiudad,provincia,nombreProvincia,calle,mapa,status,descripcion,foto,'|');
            localStorage.setItem("_playas", JSON.stringify(_playas));

            $('#busqueda .list-block ul').append('<li class="item-content" onclick="cargoDetalle('+id_playa+');"><div class="item-inner"><div class="item-title">'+nombre+'</div></div></li>');
            //$('#playas .contenido').append('<div class="row playa playa-'+id_playa+'" ><div class="col-50" onclick="cargoDetalle('+id_playa+');"><figcaption>'+nombre+'</figcaption><img src="img/comodin.png" /></figure></div><div class="col-50"><h5>Actividades</h5><div class="mActividades"></div><h5>Servicios</h5><div class="mServicios"></div></div><div class="rateStar"><div class="favoriteStar" onclick="rate('+id_playa+')" ><i class="fa fa-star fa-lg"></i></div></div></div>');

            $('#playas .contenido').append('<div class="row playa playa-'+id_playa+'" ><div class="col-50" onclick="cargoDetalle('+id_playa+');"><figcaption>'+nombre+'</figcaption><img src="img/comodin.png" /></figure></div><div class="col-50"><h5>Actividades</h5><div class="mActividades"></div><h5>Servicios</h5><div class="mServicios"></div></div><div class="rateStar"><div class="favoriteStar" onclick="rate('+id_playa+')" ><i class="fa fa-star fa-lg"></i></div></div></div>');
            cargoFavoritos();
            cargoActividades(id_playa);
            cargoServicios(id_playa);

            });
        }              
      },
      error : function(error){     
          //alert(error);
      }
    });     
}

function cargoActividades(id_playa){
    $('#playas .contenido .mActividades').empty();
    var datos ={
    'id_playa': id_playa
    }

    $.ajax({
      url: direccion+'actions/593_getActividades.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data: datos,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
            $.each(response,function(key,value){ 
                playa = value.playa;
                actividades = value.actividades;
                nombreActividad = value.nombreActividad;
                icono = value.icono;
                
                _actividades.push(playa,actividades,nombreActividad,icono,'|');
                localStorage.setItem("_actividades", JSON.stringify(_actividades));

                //$('#busqueda .playa-'+playa+' .mActividades').append('<div class="item item-actividades"><i class="fa '+icono+'"></i></div>');
                $('#playas .contenido .mActividades').append('<div class="item item-actividades"><i class="fa '+icono+'"></i></div>');
            });
        }              
      },
      error : function(error){     
          console.log(error);
      }
    });
}

function cargoServicios(id_playa){
    $('#playas .contenido .mServicios').empty();
    var datos ={
    'id_playa': id_playa
    }
    $.ajax({
      url: direccion+'actions/593_getServicios.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data: datos,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
            $.each(response,function(key,value){ 
                playa = value.playa;
                servicios = value.servicios;
                nombreServicio = value.nombreServicio;
                icono = value.icono;

                _servicios.push(playa,servicios,nombreServicio,icono,'|');
                localStorage.setItem("_servicios", JSON.stringify(_servicios));

                //$('#busqueda .playa-'+playa+' .mServicios').append('<div class="item item-servicios"><i class="fa '+icono+'"></i></div>');
                $('#playas .contenido .mServicios').append('<div class="item item-servicios"><i class="fa '+icono+'"></i></div>');
            });
        }              
      },
      error : function(error){     
          //alert(error);
      }
    });
}

function cargoDetalle(idPlaya){
    
    //cambio pantalla
    mainView.router.load({pageName: 'infoPlayas'});
    
    var datos ={
    'playa': idPlaya
    }

    $.ajax({
      url: direccion+'actions/593_getInfobyID.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data: datos,
      success: function(response){  

        //cambioPantalla($('#_info'));

        
        $('#infoPlayas .contenido').css('overflow-y','scroll');
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            id_playa = value.id_playa;
            nombre = value.nombre;
            slug = value.slug;
            pais = value.pais;
            nombrePais = value.nombre_pais;
            ciudad = value.ciudad;
            nombreCiudad = value.nombre_ciudad;
            provincia  = value.provincia ;
            nombreProvincia = value.nombre_provincia;
            calle = value.calle;
            mapa = value.mapa;
            status = value.status;
            descripcion = value.descripcion;
            foto = value.foto;

            _detallePlaya.push(id_playa,nombre,slug,pais,nombrePais,ciudad,nombreCiudad,provincia,nombreProvincia,calle,mapa,status,descripcion,foto,'|');
            localStorage.setItem("_detallePlaya", JSON.stringify(_detallePlaya));

            $('#infoPlayas .resultado > div').empty();
            $('#infoPlayas .informacion-lugar').empty();

            $('#infoPlayas .resultado > div').append(nombre);
            $('#infoPlayas .contenido').append('<div id="goMapa" onclick="cargoMapa('+mapa+')">VER MAPA</div>');
            $('#infoPlayas .informacion-lugar').append(descripcion);

            cargoActividades(id_playa);
            cargoServicios(id_playa);
            
          });
        }              
      },
      error : function(error){     
          //alert(error);
      }
    });
}

function misPlayas(){
  $('#misplayas .contenido').empty();
  var favRate = JSON.parse(localStorage.getItem( 'favoritos') );

   for (x=0; x<=favRate.length-1; x++)  {  
      $('.playa-'+favRate[x]+' i').addClass('activo');
      var datos ={
      'playa': favRate[x]
      }
      $.ajax({
          url: direccion+'actions/593_getInfobyID.php',
          type: "POST",
          cache: false,
          dataType: "json",
          data: datos,
          success: function(response){  
            if(response!=null && response!='' && response!='[]'){ 
              $.each(response,function(key,value){ 
                id_playa = value.id_playa;
                nombre = value.nombre;
                slug = value.slug;
                pais = value.pais;
                nombrePais = value.nombre_pais;
                ciudad = value.ciudad;
                nombreCiudad = value.nombre_ciudad;
                provincia  = value.provincia ;
                nombreProvincia = value.nombre_provincia;
                calle = value.calle;
                mapa = value.mapa;
                status = value.status;
                descripcion = value.descripcion;
                foto = value.foto;

                $('#misplayas .contenido').append('<div class="col-50 playa playa-'+id_playa+' " ><div onclick="cargoDetalle('+id_playa+');"><figcaption>'+nombre+'</figcaption><img src="img/comodin.png" /></figure></div></div>');
                
                

                });
            }              
          },
          error : function(error){     
              //alert(error);
          }
        });  

  }
}

function cargoMapa(argument1, argument2){

  //cambio pantalla
  mainView.router.load({pageName: 'mapa'});
  $('#map').empty();
  $('#map').append('<iframe src = "https://maps.google.com/maps?q='+argument1+','+argument2+'&hl=es;z=8&amp;output=embed" style="height: 500px"></iframe>');
}

/* ----------------------------------------------------------------------------------------------- */
/* CARGO DATOS PARA APP */
/* ----------------------------------------------------------------------------------------------- */


/* ----------------------------------------------------------------------------------------------- */
/* FUNCIONES */
/* ----------------------------------------------------------------------------------------------- */

function rate(argument){
/*
  $( "playa-"+argument+' i' ).toggle(
    function() {
      $( this ).addClass( "activo" );
    }, function() {
      $( this ).removeClass( "activo" );
    }
  );*/

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

//clave api google maps
/*   AIzaSyCAabZ7InWzlIL9VBMa7dOXBKN7ISwnGyI  */


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      alert(1);
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    alert(2);
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
}