/**********************************************************************/
/*  PROYECTO Mecanografía      */
import {recuperaElementoAleatorio} from './utils.js';

//Variables globales
var idIntervalo= 0;
var pruebaEnMarcha= false;
var currentPalabra= '';
const PALABRAS= ['ferruquímico', 'alomántico', 'hemalúrgico', 'acero', 'hierro', 'peltre', 'estaño', 'zinc', 'latón', 'cobre', 'bronce'];

//Variables con las que vamos a interactuar
const palabraMuestra= document.getElementById('muestra');
const botonComenzar= document.getElementById('start');
const palabrasCorrectas= document.getElementById('puntos');
const tiempo= document.getElementById('tiempo');
const entrada= document.getElementById('text-input');

//eventos
botonComenzar.addEventListener('click', comenzarPrueba);
entrada.addEventListener('input', onEntradaCambio);

function actualizaTiempo() {
    let valorTiempo= +tiempo.innerText;
    valorTiempo--;
    tiempo.innerText = valorTiempo;

    if (valorTiempo === 0) {
        pruebaEnMarcha= false;
        clearInterval(idIntervalo);
        console.log('Fin de la prueba');
        palabraMuestra.innerText= 'Fin de la prueba';
        idIntervalo= 0;
    }
}

function comenzarPrueba(e) {
    if (idIntervalo === 0) {
        tiempo.innerText= 10;
        idIntervalo= setInterval(actualizaTiempo, 1000);
        pruebaEnMarcha= true;
        palabrasCorrectas.innerText= '0';
        entrada.value= "";
        nuevaPalabra();
        console.log('Prueba iniciada');
    }
}

function nuevaPalabra() {
  const siguiente = recuperaElementoAleatorio(PALABRAS);
  currentPalabra = siguiente;
  entrada.placeholder= currentPalabra;
  palabraMuestra.innerText= currentPalabra;
}

function onEntradaCambio() {
  if (pruebaEnMarcha) {
    const objetivo = currentPalabra;
    const texto = entrada.value.trim();

    if (texto === objetivo) {
        // Acertada
        let valor = +palabrasCorrectas.innerText;
        valor++;
        palabrasCorrectas.innerText = valor.toString();
        entrada.value = "";
        nuevaPalabra();
    }
  }
}







