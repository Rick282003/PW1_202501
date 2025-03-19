document.addEventListener('DOMContentLoaded', () => { //Espera a que el documento esté cargado
    /*let linksCollection = document.querySelectorAll('header nav ul li a'); //Selecciona todos los enlaces de li
    linksCollection.forEach((link)=>{
        link.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();
            alert("Navegariá a traves de esta página al target: " + e.target.href + " pero no.");
        });
    })
    */
   const track = document.querySelector('.carrusel .track');    //selecciona el contenedor que contiene  las diapositivas
   let currentSlide = 0;                                        //almacena el índice de la diapositiva actual
   const slides = track.querySelectorAll('.hero-panel');        //obtiene una lista de todas las diapositivas (.hero-panel)
   const slidesTopLimit = slides.length - 1;                    //indice máximo de diapositivas, para saber cuándo invertir la dirección)
   let direction = 1; // 1 = derecha, -1 = izquierda            //desplazamiento de la diapositiva
   const waitingTime = 3000; // 3s = 3000ms                     //tiempo a esperar antes de cambiar de diapositiva
   let timeoutID = null;                                        //temporizador para controlar los cambios automáticos de diapositiva
   console.log("Slides Found: ", slides);

   function moveSlide() {
        console.log("Move Slide Triggered");
        let nextSlide = currentSlide + direction;
        if(nextSlide < 0){//si el índice de la siguiente diapositiva es menor que 0, cambia la dirección hacia la derecha
            nextSlide = 1;
            direction = 1;
        }

        if(nextSlide > slidesTopLimit){//si el índice de la siguiente diapositiva es mayor que el máximo permitido, cambia la dirección hacia la izquierda
            nextSlide = slidesTopLimit - 1;
            direction = -1;
        }

        renderSlide(nextSlide);                                 //llama a la función que mueve la diapositiva
        tickFunction();                                         //llama a la función que reinicia el temporizador
   }//fin moveSlide

   function renderSlide(moveTo) {
        if(timeoutID){
            clearTimeout(timeoutID);                            //cancela el temporizador anterior para evitar que se acumulen llamadas
        }
        console.log(track);
        track.style.transform = `translateX(calc(100vw * ${moveTo * -1}))`; //mueve el track horizontalmente
        currentSlide = moveTo;                                  //actualiza el índice de la diapositiva actual
        tickFunction();                                         //reinicia el temporizador
   }//fin renderSlide

   const tickFunction = () => {                                 //el carrusel se mueve automáticamente cada 3 segundos
        timeoutID = setTimeout(moveSlide, waitingTime);         //llama a moveSlide() después de 3 segundos
    }//fin tickFunction

    tickFunction();                                             //llama a tickFunction() al cargar la página para iniciar el ciclo de diapositivas
});