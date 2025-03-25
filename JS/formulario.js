const regexIsEmpy = /^\s*$/    //Expresiones regulares para validar campos vacíos

document.addEventListener('DOMContentLoaded', () => {
    const formSolicitud = document.getElementById("formSolicitud");
    const txtPrimerNombre = document.getElementById("txtPrimerNombre");
    const txtApellidoPaterno = document.getElementById("txtApellidoPaterno");

    function onSubmit_formSolicitud (e) {
        const errors = {};
        let hasError = false;
        if(regexIsEmpy.test(txtPrimerNombre.value)) {
            hasError = true;
            errors["txtPrimerNombreError"] = "El nombre no puede ir vacío.";
        }
        
        if(hasError){
            alert("");
        }
        e.preventDefault();
        e.stopPropagation();
    }

    formSolicitud.addEventListener("submit", onSubmit_formSolicitud);
});