document.addEventListener("DOMContentLoaded", ()=>{
    /*
    Cargar el Plan de Estudio ☻
    Generar el Cotenedeor del Plan de Estudio ☻
    Generar los Bloques 
    Generar las Asignaturas
    Manejar el onMouseOver para mostrar (visualmente) los requisitos y las clase que abre
    */

    const jsonUrl ='js/planEstudioICC.json';

    const planNodeTree = {};

    fetch(jsonUrl)
    .then((response)=>{
        if(response.status === 200) {
            return response.json();
        } else {
            return new Promise((resolve)=>resolve({}));
        }
    }).then((data) =>{
        console.log("Data del Server:", JSON.stringify(data, null, 2));
        createContainer(data);
    })
    .catch(
        (error) =>{
            console.log("error fetching json", error);
        }
    );


    function createContainer(data){
        const container = document.createElement("SECTION");
        container.classList.add("plan-container");

        const header = document.createElement("SECTION");
        header.classList.add("plan-header")

        const title = document.createElement("H1");
        title.textContent = data.titulo;
        header.appendChild(title);

        const subtitle = document.createElement("H2");
        subtitle.textContent = data.codigo;
        header.appendChild(subtitle);
        container.appendChild(header);
        //AQUI GENERAR LOS BLOQUES

        data.plan.forEach(
            (bloque) =>{
                container.appendChild(createBlock(bloque));
            }
        );


        const rootContainer = document.getElementById('root');
        rootContainer.appendChild(container);
    }

    function createBlock(blockData){
        const blockContainer = document.createElement("DIV");
        blockContainer.classList.add("plan-block");

        const blockLabel = document.createElement("DIV");
        blockLabel.classList.add("plan-block-label");
        blockLabel.textContent = blockData.bloque;
        blockContainer.appendChild(blockLabel);

        const blockClasses = document.createElement("DIV");
        blockClasses.classList.add("plan-block-classes");
        //AGREGAR LAS ASIGNATURAS

        blockData.asignaturas.forEach(
            (asignatura)=>{
                const asignaturaContainer = document.createElement("DIV");
                asignaturaContainer.classList.add("asignatura");

                const asignaturaLabel = document.createElement("DIV");
                asignaturaLabel.textContent = `(${asignatura.codigo}) ${asignatura.descripcion}`;

                const asignaturaCreditos = document.createElement("DIV");
                asignaturaCreditos.textContent = `Créditos: ${asignatura.creditos}`;
                asignaturaContainer.appendChild(asignaturaLabel);
                asignaturaContainer.appendChild(asignaturaCreditos);
                //
                planNodeTree[asignatura.codigo] = {
                    asignatura: asignaturaContainer,
                    requisitos:[],
                    apertura: [],
                };
                asignatura.requisitos.forEach(
                    (requisito)=>{
                        planNodeTree[asignatura.codigo].requisitos.push(planNodeTree[requisito].asignatura);
                        planNodeTree[requisito].apertura.push(planNodeTree[asignatura.codigo].asignatura);
                    }
                );
                asignaturaContainer.addEventListener("mouseenter",(e)=>{
                    planNodeTree[asignatura.codigo].requisitos.forEach(
                        (nodoRequisito)=>{
                            nodoRequisito.classList.add("requisito");
                        }
                    )

                    planNodeTree[asignatura.codigo].apertura.forEach(
                        (nodoRequisito)=>{
                            nodoRequisito.classList.add("apertura");
                        }
                    )

                    planNodeTree[asignatura.codigo].asignatura.classList.add("active");
                });

                asignaturaContainer.addEventListener("mouseleave",(e)=>{
                    planNodeTree[asignatura.codigo].requisitos.forEach(
                        (nodoRequisito)=>{
                            nodoRequisito.classList.remove("requisito");
                        }
                    )

                    planNodeTree[asignatura.codigo].apertura.forEach(
                        (nodoRequisito)=>{
                            nodoRequisito.classList.remove("apertura");
                        }
                    )

                    planNodeTree[asignatura.codigo].asignatura.classList.remove("active");
                });
                blockClasses.appendChild(asignaturaContainer);
            }
        )

        blockContainer.appendChild(blockClasses);
        return blockContainer;
    }

});