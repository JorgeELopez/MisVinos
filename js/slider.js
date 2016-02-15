$(document).ready(function(){
    var slides, timer;
    slides = $('#slider .slidesContainer > .slide');
    //desplazar el contenedor
    function sliderScroll(direction){

       //Calcula la posición actual del contenedor
	   // Declaramos la var position que inicializaremos con el valor que nos devuelva el método scrollLeft().
	   
	   // El método scrollLeft() nos devuelve o establece el valor actual de la posición horizontal de 
	   // la barra de desplazamiento para un elemento dado. 
	   
       var position = $('#slider').scrollLeft();

       // Declaramos la var totalWidth que calcula la anchura total menos el último slide.
       //Se usa para calcular cuando el scroll llega al final.
	   
	   //La propiedad length, que existe en cualquier objeto jQuery, nos sirve para obtener el número de 
	   //elementos de la página que hemos seleccionado.
	    
	   //La propiedad offsetWidth devuelve el ancho en pixeles de un elemento dado
	   
       var totalWidth = (slides.length * slides[0].offsetWidth) - slides[0].offsetWidth

       //Se comprueba la variable direction para hacer el scroll hacia izquierda o derecha
       switch (direction) {
            case 'right':
                if (position+slides[0].offsetWidth > totalWidth){ //Si la siguiente posición se sale del contenedor, vuelve al principio.
                    $('#slider:not(:animated)').animate({scrollLeft:0},1000);
                } else { //Si no es el final, suma a la posición actual la anchura del slide.
                    $('#slider:not(:animated)').animate({scrollLeft:position+slides[0].offsetWidth},1000);
                }
                break;

            case 'left': //Izquierda
                if (position-slides[0].offsetWidth < 0){ //Si la siguiente posición se sale del contenedor, vuelve al final.
                    $('#slider:not(:animated)').animate({scrollLeft:totalWidth},1000);
                } else { //Si no es el final, resta a la posición actual la anchura del slide.
                    $('#slider:not(:animated)').animate({scrollLeft:position-slides[0].offsetWidth},1000);
                }
                break;
        }

   }

   //setInterval es una función estándar de javascript no es de jquery.
   //Para ejecutar animaciones, refrescos de página o de imágenes, avisos regulares, etc 
   // es necesario disponer de algún método que ejecute una acción cada cierto tiempo. 
   // Esto lo podemos conseguir mediante el método setInterval( ) que llama a la función 
   //indicada como primer argumento a intervalos regulares de tiempo, estos intervalos vienen dados en 
   //milisegundos por el segundo argumento de la función.
   
   function initTimer(){
       var timer = setInterval(function(){sliderScroll('right');}, 5000);
   }

    //Asigna el ancho total de los slides al contenedor
    //La anchura total se obtiene multiplicando la medida de un slide por el número de slides)
    $('#slider .slidesContainer').css('width',slides[0].offsetWidth * slides.length);

	//El método javascript clearInterval se utiliza para detener el bucle cronometrado que se inició con el método setInterval () anterior.

    //Click en el botón "next"
    $('.next').click(function(){
        clearInterval(timer); //Desactiva el temporizador
        sliderScroll('right'); //Mueve el scroll a la derecha
        initTimer(); //Vuelve a activar el temporizador
        return false;
    });

    //Click en el botón "prev"
    $('.prev').click(function(){
        clearInterval(timer); //Desactiva el temporizador
        sliderScroll('left'); //Mueve el scroll a la izquierda
        initTimer(); //Vuelve a activar el temporizador
        return false;
    });

    //Inicia el temporizador
    initTimer();

});