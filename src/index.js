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

  // console.log(player)
  // console.log(computer)

  $('figure.player img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${player}.svg`
  $('figure.computer img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${computer}.svg`

  // HINT: Check for win, lose or draw, then call `gameOver()` eventually.
  if ((player === 'rock') && (computer === 'paper')) {
    counterComputer++
    //  gameOver(false)
  } else if ((player === 'rock') && (computer === 'scissors')) {
    counterPlayer++
    //  gameOver(true)
  } else if ((player === 'paper') && (computer === 'rock')) {
    counterPlayer++
    //  gameOver(true)
  } else if ((player === 'paper') && (computer === 'scissors')) {
    counterComputer++
  //  gameOver(false)
  } else if ((player === 'scissors') && (computer === 'rock')) {
    counterComputer++
  //  gameOver(false)
  } else if ((player === 'scissors') && (computer === 'paper')) {
    counterPlayer++
  //  gameOver(true)
  } else {
    // equal
  }

  documentPlayer.textContent = counterPlayer
  documentComputer.textContent = counterComputer
    // document.querySelector(span.player) = counterPlayer
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
    counterPlayer++
  } else {
    $('.dialog h3').textContent = 'You lost!'
    counterComputer++
  }
  $('body').className = 'modal'
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
