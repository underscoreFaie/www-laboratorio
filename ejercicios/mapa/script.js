let marcadores; 

const test= document.querySelector('[data-class="test"]');
const mapContainer= document.querySelector('[data-class="map-container"]');
const map= document.querySelector('[id="map"]');

document.addEventListener('DOMContentLoaded', mostrarMarcadores);

async function cargarDatos() {
    try {
        const respuesta= await fetch('almacen.json');
        marcadores= await respuesta.json();
        console.log(marcadores)
    } catch(error) {
        console.error(error)
    }
}


async function mostrarMarcadores() {
    await cargarDatos();
    for (let i=0; i<marcadores.length; i++) {
        let marcador= marcadores[i]
        let marcador_html= document.createElement('div');
        marcador_html.id= 'marker' + (i+1);
        marcador_html.innerHTML= `
            <img class="marker" src="img/location-pin.png">
            `;
        let top= 100*marcador.coordY/map.naturalHeight;
        let left= 100*marcador.coordX/map.naturalWidth;
        marcador_html.style.position= 'absolute';
        marcador_html.style.top= top + '%';
        marcador_html.style.left= left + '%';

        mapContainer.appendChild(marcador_html);
        marcador_html.addEventListener('mouseenter', ()=> mostrarContenido(i));
        marcador_html.addEventListener('mouseleave', ()=> eliminarContenido(i));
    }
}

function mostrarContenido(i) {
    let marcador= marcadores[i];
    let info_html= document.createElement('div');
    info_html.id= 'info-container';
    info_html.innerHTML= `
        <h3 id='name'>${marcador.name}</h3>
        <div id='description'>${marcador.description}</div>
        `
    let top= 100*marcador.coordY/map.naturalHeight;
    let left= 100*marcador.coordX/map.naturalWidth;
    info_html.style.position= 'absolute';
    info_html.style.top= top + '%';
    info_html.style.left= left + '%';
    
    mapContainer.appendChild(info_html);
}

function eliminarContenido(i) {
    const contenido= document.querySelector('[id="info-container"]');
    contenido.remove();
}