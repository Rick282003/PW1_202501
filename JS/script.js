document.addEventListener('DOMContentLoaded', () => {
    let linksCollection = document.querySelectorAll('header nav ul li a'); //Selecciona todos los enlaces de li
    linksCollection.forEach((link)=>{
        link.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();
            alert("Navegariá a traves de esta página al target: " + e.target.href + " pero no.");
        });
    })
});