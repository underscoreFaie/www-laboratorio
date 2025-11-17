document.addEventListener('DOMContentLoaded', () => {
    const whiteKeysContainer = document.querySelector('.white-keys');
    const blackKeysContainer = document.querySelector('.black-keys');
    const waveformSelector = document.getElementById('waveform-selector');

    // Inicializar AudioContext
    let audioContext;
    const getAudioContext = () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    };

    // Frecuencias de las notas para una octava (C4 a C5)
    // Basado en A4 = 440 Hz, cada semitono es 2^(1/12) veces la frecuencia anterior.
    const notes = {
        'C4': 261.63,
        'C#4': 277.18,
        'D4': 293.66,
        'D#4': 311.13,
        'E4': 329.63,
        'F4': 349.23,
        'F#4': 369.99,
        'G4': 392.00,
        'G#4': 415.30,
        'A4': 440.00,
        'A#4': 466.16,
        'B4': 493.88,
        'C5': 523.25
    };

    const whiteNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    const blackNotes = ['C#4', 'D#4', 'F#4', 'G#4', 'A#4'];

    // Mapa para almacenar los osciladores activos y sus nodos de ganancia
    const activeOscillators = new Map(); // Map<noteName, {oscillator: OscillatorNode, gainNode: GainNode}>

    // Parámetros del envolvente ADSR
    const attackTime = 0.02;
    const decayTime = 0.1;
    const sustainLevel = 0.7;
    const releaseTime = 0.3;

    // Función para crear las teclas del piano
    const createKeys = () => {
        whiteNotes.forEach(noteName => {
            const key = document.createElement('div');
            key.classList.add('key', 'white');
            key.dataset.note = noteName;
            key.dataset.frequency = notes[noteName];
            key.textContent = noteName.replace('4', '').replace('5', ''); // Mostrar solo la nota
            whiteKeysContainer.appendChild(key);
        });

        blackNotes.forEach(noteName => {
            const key = document.createElement('div');
            key.classList.add('key', 'black');
            key.dataset.note = noteName;
            key.dataset.frequency = notes[noteName];
            key.textContent = noteName.replace('4', '').replace('5', ''); // Mostrar solo la nota
            blackKeysContainer.appendChild(key);
        });
    };

    // Función para iniciar la reproducción de una nota
    const playNote = (noteName, frequency) => {
        const context = getAudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = waveformSelector.value;
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);

        // Conectar nodos: oscillator -> gainNode -> destination
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        // Aplicar envolvente ADSR
        gainNode.gain.setValueAtTime(0, context.currentTime); // Empezar en 0 volumen
        gainNode.gain.linearRampToValueAtTime(1, context.currentTime + attackTime); // Ataque
        gainNode.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + attackTime + decayTime); // Decaimiento a nivel de sustain

        oscillator.start();

        // Almacenar el oscilador y gainNode para poder detenerlo
        activeOscillators.set(noteName, { oscillator, gainNode });
    };

    // Función para detener la reproducción de una nota
    const stopNote = (noteName) => {
        const context = getAudioContext();
        if (activeOscillators.has(noteName)) {
            const { oscillator, gainNode } = activeOscillators.get(noteName);

            // Cancelar valores programados y aplicar release
            gainNode.gain.cancelScheduledValues(context.currentTime);
            gainNode.gain.linearRampToValueAtTime(0, context.currentTime + releaseTime);

            // Detener el oscilador después del tiempo de release
            oscillator.stop(context.currentTime + releaseTime);
            oscillator.onended = () => {
                oscillator.disconnect();
                gainNode.disconnect();
            };

            activeOscillators.delete(noteName);
        }
    };

    // Manejadores de eventos para las teclas
    const handleKeyPress = (event) => {
        const key = event.target.closest('.key');
        if (!key) return;

        const noteName = key.dataset.note;
        const frequency = parseFloat(key.dataset.frequency);

        if (!activeOscillators.has(noteName)) {
            key.classList.add('active');
            playNote(noteName, frequency);
        }
    };

    const handleKeyRelease = (event) => {
        const key = event.target.closest('.key');
        if (!key) return;

        const noteName = key.dataset.note;
        if (activeOscillators.has(noteName)) {
            key.classList.remove('active');
            stopNote(noteName);
        }
    };

    // Inicializar el piano
    createKeys();

    // Añadir event listeners a los contenedores de teclas
    whiteKeysContainer.addEventListener('mousedown', handleKeyPress);
    whiteKeysContainer.addEventListener('mouseup', handleKeyRelease);
    whiteKeysContainer.addEventListener('mouseleave', handleKeyRelease); // Para soltar si el ratón se sale de la tecla

    blackKeysContainer.addEventListener('mousedown', handleKeyPress);
    blackKeysContainer.addEventListener('mouseup', handleKeyRelease);
    blackKeysContainer.addEventListener('mouseleave', handleKeyRelease); // Para soltar si el ratón se sale de la tecla
});