import ubicaciones from "./almacen.js";

let marcadores;
const marcador_img= 'img/location-pin.png';

const test= document.querySelector('[data-class="test"]');
const mapContainer= document.querySelector('[data-class="mapContainer"]');
const map= document.querySelector('[id="map"]');
const menuButton= document.querySelector('[data-class="menuButton"]');
const mapMenu= document.querySelector('[id="map-menu"]');

document.addEventListener('DOMContentLoaded', mostrarMarcadores);
menuButton.addEventListener('click', mostrarMenu)


function mostrarMarcadores() {
/* Para cada entrada de marcadores añade un marcador a mapContainer, lo posiciona y añade los listeners para mostrar y eliminar la información adicional
*/
    for (let i=0; i<ubicaciones.length; i++) {
        let marcador= ubicaciones[i]

        //Crear div
        let marcador_html= generarDiv(marcador, i);
        
        //Añadir div al documento
        mapContainer.appendChild(marcador_html);
        marcador_html.addEventListener('mouseenter', ()=> mostrarContenido(i));
        marcador_html.addEventListener('mouseleave', eliminarContenido);
    }
}

function generarDiv(marcador, i) {
    //TODO - Hacer un switch sobre marcador.type para cambiar el tipo de marcador
    let marcador_html= document.createElement('div');
        marcador_html.id= 'marker' + (i+1);
        marcador_html.classList.add('marker');
        marcador_html.innerHTML= `
            <img class="marker_img" src="${marcador_img}">`;
        
        //Calcular posición (como porcentaje)
        let top= 100*marcador.coordY/map.naturalHeight;
        let left= 100*marcador.coordX/map.naturalWidth;
        //Poner posición
        marcador_html.style.position= 'absolute';
        marcador_html.style.top= top + '%';
        marcador_html.style.left= left + '%';
    return marcador_html;
}

function mostrarContenido(i) {
// Añade un div con la información adicional a mapContainer
    let marcador= ubicaciones[i];

    //Crear div
    let info_html= document.createElement('div');
    info_html.id= 'info-container';
    info_html.innerHTML= `
        <h3 id='name'>${marcador.name}</h3>
        <div id='description'>${marcador.description}</div>`
    //Calcular posición
    let top= 100*marcador.coordY/map.naturalHeight;
    let left= 100*marcador.coordX/map.naturalWidth;
    //Poner posición
    info_html.style.position= 'absolute';
    info_html.style.top= top + '%';
    info_html.style.left= left + '%';
    
    mapContainer.appendChild(info_html);
}

function eliminarContenido() {
/* Elimina el div que se creó en mouseenter
*/
    const contenido= document.querySelector('[id="info-container"]');
    contenido.remove();
}

function mostrarMenu() {
    /* Muestra u oculta el menú
    */
    if (mapMenu.style.left != '-20%') mapMenu.style.left= '-20%';
    else mapMenu.style.left= '-500%';
}

function anadirMarcador() {
    /* Añade un nuevo marcador
    * TODO - Añadir un formulario al menú. Leer resultados y añadir el marcador
    */
   
}