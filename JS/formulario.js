const regexIsEmpy = /^\s*$/    //Expresiones regulares para validar campos vacíos

document.addEventListener('DOMContentLoaded', () => {
    const formSolicitud = document.getElementById("formSolicitud");
    const txtPrimerNombre = document.getElementById("txtPrimerNombre");
    const txtApellidoPaterno = document.getElementById("txtApellidoPaterno");
    //const divPrimerNombre = document.getElementById("divPrimerNombre");
    //const divApellidoPaterno = document.getElementById("divApellidoPaterno");

    function onSubmit_formSolicitud (e) {
        const errors = {};
        let hasError = false;

        txtPrimerNombre.classList.remove('error');
        txtApellidoPaterno.classList.remove('error');

        if(regexIsEmpy.test(txtPrimerNombre.value)) {
            hasError = true;
            errors["PrimerNombre"] = "El nombre no puede ir vacío.";
        }

        if(regexIsEmpy.test(txtApellidoPaterno.value)) {
            hasError = true;
            errors["ApellidoPaterno"] = "El apellido no puede ir vacío.";
        }
        
        if(hasError){
            const errorKeys = Object.keys(errors);
            let focusAssigned = false;
            for(errorKey of errorKeys){
                const errorDivHolder = document.getElementById(`div${errorKey}`);
                if(errorDivHolder){
                    let errorDivMessage = document.getElementById('${errorKey}Error');
                    if(errorDivMessage){
                        errorDivMessage.textContent = errors[errorKey];
                    }else {
                        errorDivMessage = document.createElement("DIV");
                        errorDivMessage.textContent = errors[errorKey];
                        errorDivMessage.classList.add('error');
                        errorDivHolder.appendChild(errorDivMessage);
                    }
                    let inputObject = errorDivHolder.querySelector('input');
                    inputObject.classList.add('error');
                    if(!focusAssigned){
                        inputObject.focus();
                    }
                }
            }
            /*alert(
                JSON.stringify(errors, null, 2)
            );*/
            e.preventDefault();
            e.stopPropagation();
        }
    }

    formSolicitud.addEventListener("submit", onSubmit_formSolicitud);
});