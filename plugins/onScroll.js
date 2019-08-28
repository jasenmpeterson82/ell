let scrollPos = 1000
const tagline = document.querySelector('.tagline span')

export default function() {
	function checkPosition() {
		let windowY = window.scrollY
		if (windowY >= scrollPos) {
			// Scrolling UP
			tagline.classList.add('is-hidden')
		} else if (windowY < 65) {
			// Scrolling DOWN
			tagline.classList.remove('is-hidden')
		}
		scrollPos = windowY
	}

	function debounce(func, wait = 10, immediate = true) {
		let timeout
		return function() {
			let context = this
			let args = arguments
			let later = function() {
				timeout = null
				if (!immediate) func.apply(context, args)
			}
			let callNow = immediate && !timeout
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
			if (callNow) func.apply(context, args)
		}
	}

	window.addEventListener('scroll', debounce(checkPosition))
}
