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
   let btnLeft = null;                                          //almacena el boton de navegación izquierda
   let btnRight = null;                                         //almacena el boton de navegación derecha
   let nav = null;                                            //almacena el contenedor de los botones de navegación
   let timeoutID = null;                                        //temporizador para controlar los cambios automáticos de diapositiva
   let currentSlide = 0;                                        //almacena el índice de la diapositiva actual
   let direction = 1; // 1 = derecha, -1 = izquierda            //desplazamiento de la diapositiva


   const carrusel = document.querySelector('.carrusel');        //selecciona el contenedor del carrusel
   const track = document.querySelector('.carrusel .track');    //selecciona el contenedor que contiene  las diapositivas
   const slides = track.querySelectorAll('.hero-panel');        //obtiene una lista de todas las diapositivas (.hero-panel)
   const slidesTopLimit = slides.length - 1;                    //indice máximo de diapositivas, para saber cuándo invertir la dirección)
   const waitingTime = 5000; // 3s = 3000ms                     //tiempo a esperar antes de cambiar de diapositiva

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
        //slides[currentSlide].querrySelector('img').style.transform = 'scale(1)';
        //slides[moveTo].querrySelector('img').style.transform = 'scale(1.5)';
        console.log(track);
       // track.style.transform = `translateX(calc(100vw * ${moveTo * -1}))`; //mueve el track horizontalmente
        track.style.transform = `translateX(calc(-100% * ${moveTo}))`; //mueve el track horizontalmente

        /*SEGUNDA FORMA DE HACERLO
        nav.querySelectorAll(`button`)[currentSlide].classList.remove('active');
        nav.querySelectorAll(`button`)[moveTo].classList.add('active');
        */

        //TERCERA FORMA DE HACERLO
        nav.children[currentSlide].classList.remove('active');  //desactiva el botón de la diapositiva actual
        nav.children[moveTo].classList.add('active');           //activa el botón de la diapositiva a la que se va a mover

        /*PRIMERA FORMA DE HACERLO
        nav.querySelectorAll('button').forEach((dot, index)=>{
            if(index == moveTo){
                dot.classList.add('active');
            }else{
                dot.classList.remove('active');
            }
        });
        */

        slides.forEach(slide => slide.classList.remove('active'));//BONO
        slides[moveTo].classList.add('active');//BONO

        currentSlide = moveTo;                                  //actualiza el índice de la diapositiva actual
        tickFunction();                                         //reinicia el temporizador
   }//fin renderSlide

   function renderNavigation() {                                //función que renderiza los botones de navegación
        const btnLeft = document.createElement('BUTTON');       //crea un botón para navegar a la izquierda
        btnLeft.textContent = "<";                              //asigna el texto al botón
        btnLeft.classList.add("btn-left");                      //agrega una clase al botón
        btnLeft.addEventListener('click', ()=>{                 //agrega un evento clicl al botón
            if(currentSlide > 0) {                              //si no es la primera diapositiva 
                renderSlide(currentSlide - 1);                  //llama a la función que mueve la diapositiva a la izquierda
            }
        });

        const btnRight = document.createElement('BUTTON');       //crea un botón para navegar a la derecha
        btnRight.textContent = ">";                              //asigna el texto al botón
        btnRight.classList.add("btn-right");                     //agrega una clase al botón
        btnRight.addEventListener('click', ()=>{                 //agrega un evento clicl al botón
            if(currentSlide < slidesTopLimit) {                  //si no es la última diapositiva
                renderSlide(currentSlide + 1);                   //llama a la función que mueve la diapositiva a la derecha
            }
        });
        carrusel.appendChild(btnLeft);//appendChild hace que el botón de navegación izquierda sea hijo del carrusel
        carrusel.appendChild(btnRight);//appendChild hace que el botón de navegación derecha sea hijo del carrusel

        nav = document.createElement("DIV");                    //crea un contenedor para los botones de navegación
        nav.classList.add('nav');                               //agrega una clase al contenedor
        slides.forEach(
            (slide, index)=>{                                   //por cada diapositiva
                const btn = document.createElement("BUTTON");   //crea un botón
                btn.textContent = (index + 1);                  //asigna el texto al botón
                btn.addEventListener('click', ()=>{             //agrega un evento clic al botón
                    renderSlide(index);                         //llama a la función que mueve la diapositiva
                });
                nav.appendChild(btn);                           //appendChild hace que el botón sea hijo del contenedor
            }
        );
        carrusel.appendChild(nav);                              //appendChild hace que el contenedor de botones sea hijo del carrusel
   }//fin renderNavigation



   const tickFunction = () => {                                 //el carrusel se mueve automáticamente cada 3 segundos
        timeoutID = setTimeout(moveSlide, waitingTime);         //llama a moveSlide() después de 3 segundos
    }//fin tickFunction

    renderNavigation();                                         //llama a renderNavigation() para iniciar el ciclo de diapositivas
    tickFunction();                                             //llama a tickFunction() al cargar la página para iniciar el ciclo de diapositivas
    
});