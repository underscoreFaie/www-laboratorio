document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const botonInicio = document.getElementById('inicio');
    const tableroContainer = document.getElementById('tablero-container');
    const entradaTamañoTablero = document.getElementById('tamañoTablero');
    const entradaTamañoFicha = document.getElementById('tamañoFicha');

    // Colores para las fichas
    const COLORES = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#ecf0f1', '#7f8c8d', '#d35400'];

    let fichaArrastrada = null;

    // Event Listeners
    botonInicio.addEventListener('click', iniciarJuego);

    /**
     * Inicia o reinicia el juego.
     * Lee los valores de los controles, y genera un nuevo tablero.
     */
    function iniciarJuego() {
        const n = parseInt(entradaTamañoTablero.value, 10);
        const tamañoFicha = parseInt(entradaTamañoFicha.value, 10);

        generarTablero(n, tamañoFicha);
    }

    /**
     * Genera y muestra el tablero de N x N.
     * @param {number} n - El tamaño del lado del tablero.
     * @param {number} tamañoFicha - El tamaño en píxeles de cada ficha.
     */
    function generarTablero(n, tamañoFicha) {
        // Limpiar tablero anterior
        tableroContainer.innerHTML = '';

        // Configurar el grid del tablero
        tableroContainer.style.gridTemplateColumns = `repeat(${n}, ${tamañoFicha}px)`;
        tableroContainer.style.gridTemplateRows = `repeat(${n}, ${tamañoFicha}px)`;

        // Crear una lista de fichas con colores válidos
        const fichas = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                fichas.push({ color: COLORES[i % COLORES.length] });
            }
        }

        // Barajar las fichas para una distribución aleatoria
        fichas.sort(() => Math.random() - 0.5);

        // Crear y añadir las fichas al DOM
        fichas.forEach(infoFicha => {
            const elementoFicha = document.createElement('div');
            elementoFicha.classList.add('ficha');
            elementoFicha.style.backgroundColor = infoFicha.color;
            elementoFicha.style.width = `${tamañoFicha}px`;
            elementoFicha.style.height = `${tamañoFicha}px`;
            
            // Atributo data-* para identificar el color
            elementoFicha.dataset.color = infoFicha.color;
            
            // Hacer la ficha arrastrable
            elementoFicha.setAttribute('draggable', 'true');

            // Añadir eventos de drag & drop
            elementoFicha.addEventListener('dragstart', comienzoArrastre);
            elementoFicha.addEventListener('dragover', sobrevolandoDestino);
            elementoFicha.addEventListener('drop', soltadoEnDestino);
            elementoFicha.addEventListener('dragend', finalizaArrastre);

            tableroContainer.appendChild(elementoFicha);
        });
    }

    // --- Funciones de Drag & Drop ---
    // Inspirado en los ejemplos de la carpeta drag&drop
    function comienzoArrastre(e) {
        fichaArrastrada = e.target;
        e.target.classList.add('dragging');
        // Usamos dataTransfer para compatibilidad, aunque aquí no transferimos datos externos.
        e.dataTransfer.effectAllowed = 'move';
    }

    function sobrevolandoDestino(e) {
        e.preventDefault(); // Necesario para permitir el drop
        e.dataTransfer.dropEffect = 'move';
    }

    function soltadoEnDestino(e) {
        e.preventDefault();
        const fichaDestino = e.target;

        // Intercambiar los colores de fondo (y los data-attributes)
        if (fichaArrastrada && fichaDestino.classList.contains('ficha') && fichaArrastrada !== fichaDestino) {
            // Intercambiamos los data-attributes que contienen el estado real
            const datoColorOrigen = fichaArrastrada.dataset.color;
            fichaArrastrada.dataset.color = fichaDestino.dataset.color;
            fichaDestino.dataset.color = datoColorOrigen;

            // Actualizamos el estilo visual para que coincida con el nuevo estado
            fichaArrastrada.style.backgroundColor = fichaDestino.style.backgroundColor;
            fichaDestino.style.backgroundColor = datoColorOrigen;

            // Comprobar si el jugador ha ganado después del intercambio
            if (comprobarVictoria()) {
                // Usamos un timeout para que el navegador pueda renderizar el último movimiento antes de mostrar la alerta
                setTimeout(() => alert('¡Felicidades! Has ganado.'), 100);
            }
        }
    }

    function finalizaArrastre(e) {
        e.target.classList.remove('dragging');
        fichaArrastrada = null;
    }

    // Iniciar el juego al cargar la página por primera vez
    iniciarJuego();

    /**
     * Comprueba si el estado actual del tablero es una victoria.
     * Una victoria ocurre cuando todas las fichas de una misma fila son del mismo color.
     * @returns {boolean} - True si se ha ganado, false en caso contrario.
     */
    function comprobarVictoria() {
        const n = parseInt(entradaTamañoTablero.value, 10);
        const fichas = Array.from(tableroContainer.children);

        // Iterar por cada fila
        for (let i = 0; i < n; i++) {
            const primerColorDeFila = fichas[i * n].dataset.color;
            // Comprobar que el resto de fichas de la fila tienen el mismo color
            for (let j = 1; j < n; j++) {
                if (fichas[i * n + j].dataset.color !== primerColorDeFila) {
                    return false; // Si una ficha no coincide, la fila no es válida
                }
            }
        }
        return true; // Si todas las filas son correctas, es una victoria
    }
});