if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

let counterPlayer = 0
let counterComputer = 0
let documentComputer = document.querySelector('span.computer')
let documentPlayer = document.querySelector('span.player')

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()

  $('figure.player img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${player}.svg`
  $('figure.computer img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${computer}.svg`

  // HINT: Check for win, lose or draw, then call `gameOver()` eventually.
  if ((player === 'rock') && (computer === 'paper')) {
    counterComputer++
  } else if ((player === 'rock') && (computer === 'scissors')) {
    counterPlayer++
  } else if ((player === 'paper') && (computer === 'rock')) {
    counterPlayer++
  } else if ((player === 'paper') && (computer === 'scissors')) {
    counterComputer++
  } else if ((player === 'scissors') && (computer === 'rock')) {
    counterComputer++
  } else if ((player === 'scissors') && (computer === 'paper')) {
    counterPlayer++
  } else {
    // player and computer are equal
  }

  if (((counterPlayer + counterComputer) === 2) || ((counterPlayer + counterComputer) === 3)) {
    console.log(counterPlayer + counterComputer)
    switch (counterPlayer) {
      case 2:
        disableButtons(true)
        setTimeout(function () { gameOver(true) }, 3000)
        break
      default:
    }
    switch (counterComputer) {
      case 2:
        disableButtons(true)
        setTimeout(function () { gameOver(false) }, 3000)
        break
      default:
    }
  }

  documentPlayer.textContent = counterPlayer
  documentComputer.textContent = counterComputer
}

const disableButtons = (disable) => {
  let inputs = document.getElementsByTagName('button')
  for (var i = 0; i < inputs.length; i++) {
    if (disable) {
      inputs[i].disabled = true
    } else {
      inputs[i].disabled = false
    }
  }
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
  } else {
    $('.dialog h3').textContent = 'You lost!'
  }
  $('body').className = 'modal'
  counterPlayer = 0
  counterComputer = 0
  documentPlayer.textContent = 0
  documentComputer.textContent = 0
  disableButtons(false)
}

const resetGame = () => {
  // TODO: Probably need to do more to reset the game here...
  $('figure.player img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('figure.computer img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('body').className = ''
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
