class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector
    this.targetDate = targetDate
    this.intervalId = null
  }

  getRefs() {
    const container = document.querySelector(this.selector)
    const days = container.querySelector('[data-value="days"]')
    const hours = container.querySelector('[data-value="hours"]')
    const mins = container.querySelector('[data-value="mins"]')
    const secs = container.querySelector('[data-value="secs"]')
    return { container, days, hours, mins, secs }
  }

  updateTimer({ container, days, hours, mins, secs }) {
    const time = this.targetDate - Date.now()
    days.textContent = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)))
    hours.textContent = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    mins.textContent = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))
    secs.textContent = this.pad(Math.floor((time % (1000 * 60)) / 1000))
  }

  pad(value) {
    return String(value).padStart(2, '0')
  }

  start() {
    this.intervalId = setInterval(() => {
      this.updateTimer(this.getRefs())
    }, 1000)
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 25, 2021'),
})

window.addEventListener('DOMContentLoaded', timer.start.bind(timer))
