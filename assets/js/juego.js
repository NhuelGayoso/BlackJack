const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'K', 'J', 'Q']

    let puntosJugadores = []

    //! Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        small = document.querySelectorAll('small')

    //! Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = []
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0)
        }

        small.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //! Esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck);;
    }

    //! Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay Cartas en el deck'
        }

        return deck.pop();
    }
    //obtener valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1)
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1
    }

    //! turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        small[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno]
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
        imgCarta.classList.add('cartas');
        divCartasJugadores[turno].append(imgCarta);

    }


    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100);

    }


    //! turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }


    // eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0)


        if (puntosJugador > 21) {
            console.warn('Lo siento perdiste');
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)

        } else if (puntosJugador === 21) {
            console.log('21, genial!');
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        }
    })


    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true
        btnPedir.disabled = true
        turnoComputadora(puntosJugadores[0])
    })

    return {
        nuevoJuego: inicializarJuego()
    }

})()