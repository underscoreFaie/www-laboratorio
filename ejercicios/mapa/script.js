import ubicaciones from "./almacen.js";

const marcador_img= 'img/location-pin.png';

const test= document.querySelector('[data-class="test"]');
const mapContainer= document.querySelector('[data-class="mapContainer"]');
const map= document.querySelector('[id="map"]');
const menuButton= document.querySelector('[data-class="menuButton"]');
const mapMenu= document.querySelector('[id="map-menu"]');
const confirm= document.getElementById('confirm');
const nombre_input= document.getElementById('name-input');
const description_input= document.getElementById('description-input');
const message= document.getElementById('message');

let num_marcadores=0;

document.addEventListener('DOMContentLoaded', mostrarMarcadores);
menuButton.addEventListener('click', mostrarMenu);
confirm.addEventListener('click', evt => {
    message.style.display= "block";
    map.addEventListener('click', anadirMarcador);
});

function mostrarMarcadores() {
/* Para cada entrada de marcadores añade un marcador a mapContainer, lo posiciona y añade los listeners para mostrar y eliminar la información adicional
*/
    for (let i=0; i<ubicaciones.length; i++) {
        let marcador= ubicaciones[i];

        //Crear div
        let marcador_html= generarDiv(marcador, num_marcadores);
        
        //Añadir div al documento
        mapContainer.appendChild(marcador_html);
        marcador_html.addEventListener('mouseenter', ()=> mostrarContenido(i));
        marcador_html.addEventListener('mouseleave', eliminarContenido);
        num_marcadores++;
    }
}

function generarDiv(marcador, i, is_new=false) {
    //TODO - Hacer un switch sobre marcador.type para cambiar el tipo de marcador
    let marcador_html= document.createElement('div');
        marcador_html.id= 'marker' + (i+1);
        marcador_html.classList.add('marker');
        marcador_html.innerHTML= `
            <img class="marker_img" src="${marcador_img}">`;
        
        //Calcular posición (como porcentaje)
        let top= marcador.coordY, left= marcador.coordX;
        if (!(is_new)) {
            top= 100*top/map.naturalHeight;
            left= 100*left/map.naturalWidth;
        } else {
            top= 100*top/map.clientHeight;
            left= 100*left/map.clientWidth;
        }
        //Poner posición
        marcador_html.style.position= 'absolute';
        marcador_html.style.top= top + '%';
        marcador_html.style.left= left + '%';
    return marcador_html;
}

function mostrarContenido(i, is_new=false) {
// Añade un div con la información adicional a mapContainer
    test.innerText= i;
    let marcador= ubicaciones[i];

    //Crear div
    let info_html= document.createElement('div');
    info_html.id= 'info-container';
    info_html.innerHTML= `
        <h3 id='name'>${marcador.name}</h3>
        <div id='description'>${marcador.description}</div>`
    //Calcular posición
    let top= marcador.coordY, left= marcador.coordX;
    if (!(is_new)) {
        top= 100*top/map.naturalHeight;
        left= 100*left/map.naturalWidth;
    } else {
        top= 100*top/map.clientHeight;
        left= 100*left/map.clientWidth;
    }
    
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

function anadirMarcador(evt) {
    /* Lee el contenido del formulario y añade un nuevo marcador en la posición del ratón
    */
    let posX= evt.offsetX;
    let posY= evt.offsetY;
    test.innerText= posX + '(' + map.naturalHeight + ')' + ', ' + posY;
    let marcador= {
        "name": nombre_input.value,
        "description": description_input.value,
        "coordX": posX,
        "coordY": posY,
        "type": 1};
    ubicaciones.push(marcador);
    let marcador_html= generarDiv(marcador, num_marcadores, true);
    mapContainer.appendChild(marcador_html);
    const i= num_marcadores;
    marcador_html.addEventListener('mouseenter', ()=> mostrarContenido(i, true));
    marcador_html.addEventListener('mouseleave', eliminarContenido);
    num_marcadores++;    
    
    message.style.display= "none";
    map.removeEventListener('click', anadirMarcador);
}