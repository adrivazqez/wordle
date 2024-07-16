
const guessedLetters  = document.querySelectorAll(".first-try")
let nodeOrder = 0
const minimumNodeOrder = 0

// Función proporcionada por la lección del proyecto por su complejidad. Comprueba si lo introducido es una letra.

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

// Funcionalidad que al pulsar una letra se haga focus en el siguiente elemento de la nodelist (rejilla de juego)

guessedLetters.forEach (function (guessedLetter) {
    guessedLetter.addEventListener("keydown", function(event) {

        if(!isLetter(event.key)) {

            event.preventDefault()

        } else if (isLetter(event.key)){

            guessedLetters[nodeOrder].focus()
            nodeOrder++
        }
        
        eraseLetter(event)

    })
})

// Funcionalidad para poner las letras introducidas en mayúsculas sin que el usuario tenga que pulsar "caps"

guessedLetters.forEach(function (guessedLetter) {
    guessedLetter.addEventListener("input", function (event) {
        event.target.value = event.target.value.toUpperCase()
    })
})

// Función de borrado de la tecla backspace

function eraseLetter (event) {

    if (event.key === "Backspace") {

        if (nodeOrder >= minimumNodeOrder) {
        nodeOrder--
        guessedLetters[nodeOrder].focus()
        guessedLetters[nodeOrder].value = ""

    } else if (nodeOrder < minimumNodeOrder) {

        nodeOrder = minimumNodeOrder
    }

    preventDefault("Backspace")
    }
}

