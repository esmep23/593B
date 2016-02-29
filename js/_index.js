var direccion = "http://pocket.ec/dev/beach_593/";
var _playas = new Array();
var _actividades = new Array();
var _servicios = new Array();
var _detallePlaya = new Array();
var favoritos;
var map;
var onSearch = false; //toggle
var value = localStorage.getItem('token');

$( document ).ready(function() {
   
  //sizeWindows();
   
  if (localStorage.getItem("favoritos") === null) {
    localStorage.setItem( 'favoritos', "0" );
  }


  myApp.onPageInit('playas', function (page) {

    
    setTimeout(function(){ 
      console.log('-1-');
      playasOFFLine();
      cargoFavoritos();
      misPlayas();

      $('div.navbar').css('display','block');
    }, 1000);

  });

  myApp.onPageInit('registro', function (page) {
    $('div.navbar').css('display','none');
  });

  //getMobileOperatingSystem();
 
 
  if(navigator.onLine){

    //console.log('Online');
    getPlayas();
    cargoActividades();
    
  }





  if(value){
    //alert('TENGO');    
     mainView.router.load({pageName: 'playas', animatePages: false});
  }else{
    //alert('NO TENGO');  
     mainView.router.load({pageName: 'registro', animatePages: false});
  }

 
}); // document ready

  function toggle_visibility_search(argument) {
      onRate = !onRate;
      //alert(onRate);
      if(onRate){
          
      }else{
         
      } 
  }


  function sizeWindows(){
    // $('#busqueda .contenido').css('height', screen.height-(screen.height/1.8));
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
        
        $('#busqueda .list-block ul').append('<li class="item-content" onclick="cargoDetalle('+_playas[playa].id_playa+');"><div class="item-inner"><div class="item-title">'+_playas[playa].slug+'</div></div></li>');
        
        if(_playas[playa].foto){
           $('#playas .contenido').append('<div class="row playa playa-'+_playas[playa].id_playa+'" ><div class="col-50" onclick="cargoDetalle('+_playas[playa].id_playa+');"><figcaption>'+_playas[playa].slug+'</figcaption><img src="'+_playas[playa].foto+'" class="fotodestino" /></figure></div><div class="col-50"><h5>Actividades</h5><div class="mActividades"></div><h5>Servicios</h5><div class="mServicios"></div></div><div class="rateStar"><div class="favoriteStar" onclick="rate('+_playas[playa].id_playa+')" ><i class="fa fa-star fa-lg"></i></div></div></div>');
        }else{
           $('#playas .contenido').append('<div class="row playa playa-'+_playas[playa].id_playa+'" ><div class="col-50" onclick="cargoDetalle('+_playas[playa].id_playa+');"><figcaption>'+_playas[playa].slug+'</figcaption><img src="img/comodin.png" class="fotodestino" /></figure></div><div class="col-50"><h5>Actividades</h5><div class="mActividades"></div><h5>Servicios</h5><div class="mServicios"></div></div><div class="rateStar"><div class="favoriteStar" onclick="rate('+_playas[playa].id_playa+')" ><i class="fa fa-star fa-lg"></i></div></div></div>');
        }

        

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

          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mActividades').append('<div class="item item-actividades"><i class="fa icon-hospital"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mActividades').append('<div class="item item-actividades"><i class="fa icon-chiringo"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mActividades').append('<div class="item item-actividades"><i class="fa icon-tiendas"></i></div>');
          console.log(_playas[playa].id_playa);
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mServicios').append('<div class="item item-actividades"><i class="fa icon-Kitesurf"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mServicios').append('<div class="item item-actividades"><i class="fa icon-avistamiento-aves"></i></div>');
          $('#playas .contenido .playa-'+_playas[playa].id_playa +' .mServicios').append('<div class="item item-actividades"><i class="fa icon-cabalgatas"></i></div>');
          

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
        $('#infoPlayas .contenido').append('<div id="goMapa" onclick="cargoMapa('+_playas[playa].mapa+')"><span class="fa fa-map-marker fa-4x"></span></div>');
        $('#infoPlayas .informacion-lugar').append(_playas[playa].descripcion);

        var oldItems = localStorage.getItem('favoritos');
        var presto = oldItems.indexOf(argument);
        console.log('pruebaaaaaaaaaaaaaa'+presto);

        $('#infoPlayas .contenido article figure').empty();
        if(_playas[playa].foto){
            $('#infoPlayas .contenido article figure').append('<img src="'+_playas[playa].foto+'" />');
        }else{
            $('#infoPlayas .contenido article figure').append('<img src="img/comodin.png" />');
        }
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


                        //default iconos.

          $('#infoPlayas .contenido .mActividades').append('<div class="item item-actividades"><i class="fa icon-hospital"></i></div>');
          $('#infoPlayas .contenido .mActividades').append('<div class="item item-actividades"><i class="fa icon-chiringo"></i></div>');
          $('#infoPlayas .contenido .mActividades').append('<div class="item item-actividades"><i class="fa icon-tiendas"></i></div>');
          console.log(_playas[playa].id_playa);
          $('#infoPlayas .contenido .mServicios').append('<div class="item item-actividades"><i class="fa icon-Kitesurf"></i></div>');
          $('#infoPlayas .contenido .mServicios').append('<div class="item item-actividades"><i class="fa icon-avistamiento-aves"></i></div>');
          $('#infoPlayas .contenido .mServicios').append('<div class="item item-actividades"><i class="fa icon-cabalgatas"></i></div>');
          


      }
    } 


}

function guardoDatos(){
  nick = $('#nick').val();
  email = $('#email').val();
  pais = $('#pais').val();
  anio = $('#anio').val();
  
  var datos ={
      'nick': nick,
      'email': email,
      'pais': pais,
      'anio': anio,
      'foto': localStorage.getItem( '_imagenPerfil')
    }
    $.ajax({
      url: direccion+'actions/guardoRegistro.php',
      type: "POST",
      cache: true,
      dataType: "json",
      data: datos,
      success: function(response){  
        //alert(response); 
        mainView.router.load({pageName: 'playas', animatePages: false});
    
        var obj = response;
        
        localStorage.setItem('token', obj);
      },
      error : function(error){     
          //alert(error);
      }

    }); 
}

/*********************************************************************************************/
/*********************************************************************************************/

    $("#chooseFile").click(function(e){
      e.preventDefault();
      $("input[type=file]").trigger("click");
    });

    $("input[type=file]").change(function(){
      var file = $("input[type=file]")[0].files[0];            
      $("#preview").empty();
      $("button#chooseFile").css('display','none');
      $(".takePick #info").css('display','none');
      displayAsImage3(file, "preview");
      
      /*$info = $(".takePick #info");
      $info.empty();
      if (file && file.name) {
        $info.append("<li>name:<span>" + file.name + "</span></li>");
      }
      if (file && file.type) {
        $info.append("<li>size:<span>" + file.type + " bytes</span></li>");
      }
      if (file && file.size) {
        $info.append("<li>size:<span>" + file.size + " bytes</span></li>");
      }
      if (file && file.lastModifiedDate) {
        $info.append("<li>lastModifiedDate:<span>" + file.lastModifiedDate + " bytes</span></li>");
      }
      $info.listview("refresh");*/
    });

 function displayAsImage3(file, containerid) {
    if (typeof FileReader !== "undefined") {
      var container = document.getElementById(containerid),
          img = document.createElement("img"),
          reader;
      container.appendChild(img);

      reader = new FileReader();
      reader.onload = (function (theImg) {
        return function (evt) {
          theImg.src = evt.target.result;
          localStorage.setItem("_imagenPerfil", evt.target.result);
          console.log(evt.target.result);
        };
      }(img));
      reader.readAsDataURL(file);
    }
  }


// Usage


/*********************************************************************************************/
/*********************************************************************************************/


function cargoMapa(argument1, argument2){
  //alert(argument1 +' - '+argument2);
  console.log(argument1+ '-' +argument2);
  mainView.router.load({pageName: 'mapa'});
  $('#mapa .contenido').empty();
  $('#mapa .contenido').append('<iframe src = "https://maps.google.com/maps?q='+argument1+','+argument2+'&hl=es;z=8&amp;output=embed" style="height: 500px; border: 0"></iframe>');
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
