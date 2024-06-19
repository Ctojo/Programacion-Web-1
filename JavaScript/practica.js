const boton = document.getElementById("boton");
const contadorSpan = document.getElementById("contador");

let contador = 0;
boton.addEventListener('click', () => {
    contador++;
    contadorSpan.textContent = contador;
});

const borrar = document.getElementById("borrar");
const contadorBorrado = document.getElementById("contador-borrado");

let borrados = 0;
borrar.addEventListener('click', () => {
    borrados++;
    contadorBorrado.textContent = borrados;
});


const nombre = getElementById("nombre").value

function chequear(){
    if (nombre === "" || email === "" || mensaje === ""){
        error.textContent = "Completa el campo burro"
        }
   else{
    
}
}