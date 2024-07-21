const guessedLetters  = document.querySelectorAll(".first-try")

const arrayGuessedWord = []
let wordOfTheDay = ""
let guessedWord = ""

let nodeOrder = 0
const minimumNodeOrder = 0
const maxNodeOrder = 5


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

// Funcionalidad para añadir la tecla pulsada como valor de guessedWord

guessedLetters.forEach(function (guessedLetter) {
    guessedLetter.addEventListener("input", function(event) {

        if (isLetter(event.target.value)) {

            arrayGuessedWord.push(event.target.value)
        }
    })
})

// Función de borrado de la tecla backspace

function eraseLetter (event) {

    if (event.key === "Backspace") {

        if (nodeOrder >= minimumNodeOrder) {
            nodeOrder--
            guessedLetters[nodeOrder].focus()
            guessedLetters[nodeOrder].value = ""
            arrayGuessedWord.pop()

        } else if (nodeOrder <= minimumNodeOrder) {

            nodeOrder = minimumNodeOrder
            guessedLetters[nodeOrder].focus()

            
        } else if (nodeOrder >= maxNodeOrder) {

            nodeOrder = maxNodeOrder
            guessedLetters[nodeOrder].focus()
        }

    }
}

// Funcionalidad de la tecla "Enter" o botón "Submit"

const wordUrl = "https://words.dev-apis.com/word-of-the-day"

const validWordUrl ="https://words.dev-apis.com/validate-word"

const submitButton = document.getElementById("submit")

// Función para crear la palabra que intenta adivinar el usuario
function createWord () {

    guessedWord = arrayGuessedWord.join('')

}
// Función para obtener la palabra del día de la API

async function startGame () {

    const promise = await fetch(wordUrl)
    
    const processedResponse = await promise.json()

    wordOfTheDay = await processedResponse.word

    console.log(wordOfTheDay)

}

startGame ()

// Función para comprobar que la palabra con la que hace submit el usuario es válida

async function checkGuessedWord () {

    await fetch(validWordUrl, {
        method: "POST",
        body: JSON.stringify({
            "word": guessedWord
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

submitButton.addEventListener("click", checkGuessedWord ())
