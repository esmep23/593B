var direccion = "http://pocket.ec/dev/beach_593/";

$( document ).ready(function() {
   sizeWindows();
   getPlayas();
}); // document ready

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
            $('#busqueda .list-block ul').append('<li class="item-content" onclick="cargoDetalle('+id_playa+');"><div class="item-inner"><div class="item-title">'+nombre+'</div></div></li>');
            $('#playas .contenido').append('<div class="row playa playa-'+id_playa+'" onclick="cargoDetalle('+id_playa+');"><div class="col-50"><figcaption>'+nombre+'</figcaption><img src="img/comodin.png" /></figure></div><div class="col-50"><h5>Actividades</h5><div class="mActividades"></div><h5>Servicios</h5><div class="mServicios"></div></div><div class="rateStar"></div></div>');
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

        $('#busqueda .contenido').empty();
        $('#busqueda .contenido').css('overflow-y','scroll');
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

            $('#_info .resultado > div').empty();
            $('#_info .informacion-lugar').empty();

            $('#_info .resultado > div').append(nombre);
            $('#_info .contenido').append('<div id="goMapa" onclick="cargoMapa('+mapa+')">VER MAPA</div>');
            $('#_info .informacion-lugar').append(descripcion);

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