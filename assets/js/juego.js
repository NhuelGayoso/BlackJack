(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'K', 'J', 'Q']

    let puntosJugador = 0
    let puntosComputadora = 0

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')
    const small = document.querySelectorAll('small')

    //! Esta funcion crea un nuevo deck
    const crearDeck = () => {
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
        // console.log( deck );
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck()

    //! Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay Cartas en el deck'
        }
        const carta = deck.pop()
        return carta;
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1)
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1
    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta()

            puntosComputadora = puntosComputadora + valorCarta(carta)
            small[1].innerText = puntosComputadora

            // <img class="cartas" src="assets/cartas/10C.png" alt="">
            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('cartas')
            divCartasComputadora.append(imgCarta);
            if (puntosMinimos > 21) {
                break
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos < 21))
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(')
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana')
            } else {
                alert('Computadora gana')

            }
        }, 10)

    }



    // eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()

        puntosJugador = puntosJugador + valorCarta(carta)
        small[0].innerText = puntosJugador

        // <img class="cartas" src="assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('cartas')
        console.log(imgCarta);
        divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugador)
    })


    btnNuevo.addEventListener('click', () => {
        console.clear()
        deck = []
        deck = crearDeck()

        puntosJugador = 0;
        puntosComputadora = 0;

        small[0].innerText = 0;
        small[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })
})()