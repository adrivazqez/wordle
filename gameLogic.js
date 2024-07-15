// Establecer focus inicial

const guessedLetters  = document.querySelectorAll(".word-guessed_letter")

// Función proporcionada por la lección del proyecto por su complejidad. Comprueba si lo introducido es una letra.
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

// Funcionalidad que al pulsar una letra se haga focus en el siguiente elemento de la nodelist (rejilla de juego)

let nodeOrder = 0

guessedLetters.forEach (function (guessedLetter) {
    guessedLetter.addEventListener("keydown", function(event) {

        if(!isLetter(event.key)) {
            event.preventDefault()
        }

        if(event.key === "Backspace") {
            nodeOrder--
            guessedLetters[nodeOrder].focus()
                guessedLetters[nodeOrder].value = ""
        } else {
            guessedLetters[nodeOrder].focus()
        nodeOrder++
        }

    })
})

// Funcionalidad para poner las letras introducidas en mayúsculas sin que el usuario tenga que pulsar "caps"

guessedLetters.forEach(function (guessedLetter) {
    guessedLetter.addEventListener("input", function (event) {
        event.target.value = event.target.value.toUpperCase()
    })
})

