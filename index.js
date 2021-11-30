const countdownText = document.querySelector('#count-down')
const endDate = new Date('Dec, 6 2021 01:00:00').getTime()

const padZero = number => number.toFixed().padStart(2, '0')

const updateInterval = setInterval(() => {
  const now = Date.now()
  const distance = endDate - now

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  countdownText.innerHTML = `
    ${padZero(days)}d
    ${padZero(hours)}h
    ${padZero(minutes)}m
    ${padZero(seconds)}s
  `

  if (distance < 0) {
    clearInterval(updateInterval)
    countdownText.innerHTML = 'TIMES UP'
  }
}, 1000)

let fps = 30
let now = 0
let then = 0
let interval = 1000 / fps
let delta = 0
let hue = parseInt(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--hue')
    .replace('deg', 0),
  10
)

function update() {
  requestAnimationFrame(update)

  now = performance.now()
  delta = now - then

  if (delta > interval) {
    then = now - (delta % interval)
    hue += 0.25
    hue %= 360
    document.documentElement.style.setProperty('--hue', `${hue}deg`)
  }
}

requestAnimationFrame(update)
