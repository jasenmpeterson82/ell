import lottie from 'lottie-web'
import { TimelineMax, TweenMax, Power4 } from 'gsap'
let timeline = null
const curtainBlack = document.querySelector('.site-curtain-black')
const curtainWhite = document.querySelector('.site-curtain-white')
const lottieAnimationCurtain = document.querySelector(
	'.lottie__animation-curtain'
)
const animatedLogo = lottie.loadAnimation({
	container: document.querySelector('.lottie__animation-curtain'),
	// the dom element that will contain the animation,
	name: 'lottie__animation-curtain',
	autoplay: false,
	renderer: 'svg',
	path: 'https://assets.ellcdn.com/ell-site/animations/loader.json' // the path to the animation json
})


// global elements to animate after site reveal
const headerLogo = document.querySelector('.site__header .logo-link')
TweenMax.set(headerLogo, { opacity: 0, y: 20 })

const tagline = document.querySelector('.tagline')
TweenMax.set(tagline, { opacity: 0, x: 20 })

const siteMenuButton = document.querySelector('.site__menu-button')
TweenMax.set(siteMenuButton, { opacity: 0, y: 20 })

const body = document.getElementsByTagName('body')

timeline = new TimelineMax({
	id: 'intro',
	paused: true,
	onStart: function() {
		body[0].classList.add('dom-loaded')
	},
	onComplete: () => {
		body[0].classList.remove('dom-loaded')
	}
})

timeline.to(
	curtainWhite,
	1,
	{
		scaleX: 0.5,
		ease: Power4.easeInOut
	},
	'0.33'
)

timeline.to(curtainWhite, 1, {
	x: '-100%',
	ease: Power4.easeInOut
})

timeline.to(
	curtainBlack,
	1,
	{
		x: '-100%',
		ease: Power4.easeInOut
	},
	'1.85'
)

timeline.to(
	lottieAnimationCurtain,
	0.2,
	{
		opacity: 0
	},
	'2.30'
)

TweenMax.to(headerLogo, 1, {
	opacity: 1,
	y: 0,
	delay: 2.2,
	ease: Power4.easeInOut
})

TweenMax.to(tagline, 1, {
	x: 0,
	opacity: 1,
	delay: 2.22,
	ease: Power4.easeInOut
})

TweenMax.to(siteMenuButton, 1, {
	y: 0,
	opacity: 1,
	delay: 2.24,
	ease: Power4.easeInOut
})

export default { timeline, animatedLogo }
