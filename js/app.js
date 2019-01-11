 
//$(document).ready(function(){});

var entradaDulces=0;
var eliminar=0; 
var puntosSuma=0;
var movimientos=0;
var tiempoAtras=0;
var min=2;
var seg=0;

/////////////// cargar imagenes ///////////
$(document).ready(function(){


     $(".btn-reinicio").click(function(){
        

         puntosSuma=0;
         movimientos=0
         borrarDulces(); 
         $(this).html("Reiniciar"); 
         $("#score-text").html("0");
         $("#movimientos-text").html("0");
         $(".panel-score").css("width","25%");
         $(".panel-tablero").show();
         $(".time").show(); 
         clearInterval(eliminar);  
         clearInterval(entradaDulces);
         clearInterval(tiempoAtras); 
         min=2;
         seg=0;  
         entradaDulces=setInterval(function(){        
               agregarDulces()
            },400); // tiempo de ingreso de dulces de arriba hacia abajo(mas grande = mas lento)
         tiempoAtras=setInterval(function(){
                   tiempo() // dos minutos de tiempo
           },1000);
        });
});
    

///////////////// inicio=dulces aleatorios ////////////////////////////


function agregarDulces(){
 
//var ruta =0;
//var numero =0;        
  for(var i=1 ; i<8 ; i++){
          if ($(".col-"+i).children().length < 7){ 
               
             var numero = Math.floor((Math.random() * 4) + 1);
             var ruta = "image/"+numero+".png";
             //$(".dulce").attr("src",ruta);
             $(".col-"+i).prepend("<img src="+ruta+" class='dulce'/>").css("justify-content","flex-start")
          // $(".col-"+j).append("<img src="+ruta+" class='dulce'/>").css("justify-content","flex-start")                      
       }        
  } 

  eliminar=setInterval(function(){ // funcion que elimina dulces= eliminar= "var eliminar=0"
          eliminarDulces()
       },500);//tiempo para empezar a elim dulces al inicio del juego


 // $(function(){  //drag & drop

        $(".dulce").draggable({
          disabled:false,
          revert:true,
          revertDuration: 10,       
          //helper:"clone",
          containment:".panel-tablero",
         start:function(event,ui){
           movimientos=movimientos+1;
          $("#movimientos-text").html(movimientos);}        
        });


        $(".dulce").droppable({      
          
          drop: function(event,ui){


             var draggable= ui.draggable,
             droppable= $(this),
             dragPos= draggable.position(),
             dropPos= droppable.position();
             
             
             draggable.css({
              left: dropPos.left-"px",
              top: dropPos.top-"px",
             });

             droppable.css({
              left: dragPos.left-"px",
              top: dragPos.top-"px",
             });
            
             draggable.swap(droppable);

          /*   var dragIgual= draggable.html("class") ; 
             var dropIgual= droppable.html("class") ;     
            
    if ( dragIgual != "dulce igual" && dropIgual != "dulce igual" ){ 
            
          function cambio(){
               
                //dragIgual.droppable( "disable" );
                //dropIgual.droppable( "disable")
                //droppable.swap(draggable);
              }

                setTimeout(cambio);
             }*/
 
           }
        }); 
    //});  
};
//////////////////// tiempo contador hacia atras///////////////

function tiempo()
{
  if(seg!=0)
  {
    seg=seg-1;
  }
  if(seg==0)
  {
    if(min==0)
    {
      clearInterval(eliminar);
      clearInterval(entradaDulces);
      clearInterval(tiempoAtras);
      $( ".panel-tablero" ).hide("drop","slow",finJuego);
      $( ".time" ).hide();
    }
    seg=59;
    min=min-1;
  }
  $("#timer").html("0"+min+":"+seg)
};
///////////////  movimiento  tablero final/////////////////////////////////
function finJuego(){

  $( ".panel-score" ).animate({width:'100%'},4000);
  
};
 ///////////////////intercambiar dulces//////////

   jQuery.fn.swap=function(b){
  b=jQuery(b)[0];
  var a=this[0];
  var t=a.parentNode.insertBefore(document.createTextNode(''),a);
  b.parentNode.insertBefore(a,b);
  t.parentNode.insertBefore(b,t);
  t.parentNode.removeChild(t);
  return this;
};



/////////////// borrar todo/////////////////

function borrarDulces(){ // para reiniciar
  for(var i=1; i<8 ; i++){
     $(".col-"+i).children("img").detach();
     }
}



////////// eliminar combinaciones////////////


function eliminarDulces(){
     matriz=0;
     
     for(var i=1; i<8 ; i++){
          matriz= matriz+$(".col-"+i).children().length;
     }
     if(matriz==49){
       
        
        $(".igual").toggle("pulsate",750,function(){
            var puntos= $(".igual").length;
            $(".igual").remove("img");
            puntosSuma = puntosSuma+puntos*5;
            $("#score-text").html(puntosSuma);
                        
      });
   
       //buscar y eliminar dulces (3 ó más)
       //fila:
       for(var i=1;i<8;i++){ //dulces(img)repite 7 veces
          for(var j=1;j<6;j++){//columnas-repite 5 veces x cada "i"
               var res1=$(".col-"+j).children("img:nth-last-child("+i+")").attr("src");//Todos los elementos "img" que son el "i" hijo de su padre, contando desde el último hijo
               var res2=$(".col-"+(j+1)).children("img:nth-last-child("+i+")").attr("src");//Todos los elementos"img" que son el "i" hijo de su padre, contando desde el último hijo
               var res3=$(".col-"+(j+2)).children("img:nth-last-child("+i+")").attr("src");//Todos los elementos "img" que son el "i" hijo de su padre, contando desde el último hijo
           if((res1==res2) && (res2==res3)){ //comparar si hay iguales 
                $(".col-"+j).children("img:nth-last-child("+i+")").attr("class","dulce igual");
                $(".col-"+(j+1)).children("img:nth-last-child("+i+")").attr("class","dulce igual");
                $(".col-"+(j+2)).children("img:nth-last-child("+i+")").attr("class","dulce igual");               
               }
             }
           }
      //columna:
      for(var i=1;i<6;i++){//dulces
          for(var j=1;j<8;j++){//columnas 
               var res1=$(".col-"+j).children("img:nth-child("+i+")").attr("src");
               var res2=$(".col-"+j).children("img:nth-child("+(i+1)+")").attr("src");
               var res3=$(".col-"+j).children("img:nth-child("+(i+2)+")").attr("src");
          if((res1==res2) && (res2==res3)){
               $(".col-"+j).children("img:nth-child("+i+")").attr("class","dulce igual");
               $(".col-"+j).children("img:nth-child("+(i+1)+")").attr("class","dulce igual");
               $(".col-"+j).children("img:nth-child("+(i+2)+")").attr("class","dulce igual");
              }
            }

          }


       
       }
      
};






/////////////////// cambio color del texto ////////////////

function cambioColor(){

        if($(".main-titulo").css("color")=="rgb(220, 255, 14)"){

              $(".main-titulo").css("color","white");

        }else  $(".main-titulo").css("color","rgb(220, 255, 14)");
        
    };

onload=function(){
        cambioColor();
        setInterval(cambioColor, 500);      
       }


