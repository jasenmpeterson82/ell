<template>
	<section class="content__block-rotator-wrap">
		<div class="curtain"></div>
		<section class="video-container">
			<video
				class="w-screen"
				src="https://assets.ellcdn.com/ell-site/ELL_SITE_BANNER_PAINT_RED_cv_v01_5000kbps.mp4"
				muted
				loop
				autoplay
			></video>
		</section>
		<section class="content__block content__block-rotator relative">
			<section class="slides">
				<div
					v-for="(slide, index) in content.slides"
					:key="index"
					class="slide"
					:data-index="index"
				>
					<main>
						<div>
							<article>
								<h4 v-if="slide.subheading" class="subheader">
									{{ slide.subheading }}
								</h4>
								<h1
									v-if="slide.headline.length"
									class="headline"
									v-html="constructHeader[index]"
								/>
								<Button
									v-if="slide.ctaEntriesLink.length"
									class="site__button rotator__button"
									:button="{
										label: slide.ctaLabel,
										btnColor: 'orange',
										slug: slide.ctaEntriesLink
									}"
								/>
							</article>
						</div>
					</main>
					<!--				<figure>-->
					<!--					<img-->
					<!--						:src="slide.image[0].url"-->
					<!--						:alt="-->
					<!--							slide.image[0].alt !== null-->
					<!--								? slide.image[0].alt-->
					<!--								: ''-->
					<!--						"-->
					<!--					/>-->
					<!--				</figure>-->
				</div>
			</section>
			<button
				class="nextBtn text-milk cursor-pointer absolute right-0 z-20 hidden"
			>
				Next
			</button>
			<button
				class="prevBtn text-milk cursor-pointer absolute left-0 z-20 hidden"
			>
				Prev
			</button>
		</section>
	</section>
</template>

<script>
import { TweenMax, TimelineMax, Power4 } from 'gsap'
import Button from './Button'
if (process.client) {
	require('gsap/ModifiersPlugin')
}
export default {
	name: 'rotator',
	components: {
		Button
	},
	props: {
		content: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			currentSlide: 0,
			slides: null,
			currentSlideNode: null,
			totalSlides: null,
			slideTimeline: null,
			nextButton: null,
			i: 0,
			so: null
		}
	},
	computed: {
		constructHeader: function() {
			return this.content.slides.map(function(header) {
				let headerText = []
				for (let item of header.headline) {
					headerText.push(
						`${
							item.color === 'grey'
								? `<span class="gray">${item.text}</span>`
								: item.text
						} ${item.lineBreak === true ? '<br/>' : ''}`
					)
				}
				return headerText.join(' ')
			})
		}
	},
	watch: {
		currentSlide: function() {
			for (let slide of this.slides) {
				if (
					slide.dataset.index !== this.currentSlideNode.dataset.index
				) {
					let subHeader = slide.querySelectorAll('.subheader .word')
					TweenMax.set(subHeader, {
						x: 15,
						autoAlpha: 0
					})
					let button = slide.querySelectorAll('.site__button')
					let headline = slide.querySelectorAll('.headline')
					TweenMax.set(headline, {
						y: 25,
						autoAlpha: 0
					})
					TweenMax.set(button, {
						y: 45,
						autoAlpha: 0
					})
				}
			}
		}
	},
	mounted() {
		this.$Splitting({
			target: ['.content__block-rotator h4'],
			by: 'words'
		})
		const body = document.getElementsByTagName('body')
		this.initSlider()
		this.so = this.$ScrollOut({
			once: true,
			targets: '.content__block-rotator-wrap',
			onShown: element => {
				const curtain = element.querySelector('.curtain')
				TweenMax.to(curtain, 0.8, {
					scaleX: 0,
					ease: Power4.easeInOut,
					delay: body[0].classList.contains('dom-loaded') ? 2 : 0.3
				})
			}
		})
	},
	destroy() {
		this.contentBlockRotatorScrollOut.destroy()
	},
	methods: {
		imgsLoaded: function(instance, image) {},
		initSlider: function() {
			// store the component in a variable so it can be used in a standard function ('this' inside a function would scope to the function itself)
			const component = this
			component.nextButton = document.querySelector('.nextBtn')
			component.slides = document.querySelectorAll('.slide')
			component.totalSlides = component.slides.length
			const slideWidth = component.slides[0].offsetWidth
			const wrapWidth = (component.slides.length - 1) * slideWidth
			const animateNext = animateCarousel.bind(
				component.nextButton,
				slideWidth
			)
			component.nextButton.addEventListener('click', animateNext)

			// animated elements
			const subHeader = document.querySelectorAll('.subheader .word')
			TweenMax.set(subHeader, { x: 15 })
			const button = document.querySelectorAll('.site__button')
			const headline = document.querySelectorAll('.headline')
			TweenMax.set(headline, { y: 25 })
			TweenMax.set(button, { y: 45 })

			TweenMax.set(component.slides, {
				x: function(i) {
					return i * slideWidth
				}
			})

			setInterval(() => {
				component.nextButton.click()
			}, 6500)

			// function animate carousel
			// 1. loop through slides (stored in component data) and set x coord value
			// 2. On Completion of slide we look for the slide that has an x coord of 0, ie the current visible slide
			// 3. We update the state of the currentSlide value
			// 4. There is a watcher for the value of currentSlide, when the value is changed all instances of the animated elements are reset
			// EXCEPT for the current element (since it would have been reset in previous slide interactions)
			// 5. We run the animateSlide method which creates a new timeline instance, animates the text elements, etc.
			// 6. This is a brief explanation of how this works. I'd advised looking into the GSAP modifier plugin to understand how it's infinite.

			function animateCarousel(delta) {
				TweenMax.to([button, headline, subHeader], 0.5, {
					autoAlpha: 0
				})
				TweenMax.to(component.slides, 1.5, {
					x: function(i, target) {
						var x =
							Math.round(target._gsTransform.x / slideWidth) *
							slideWidth
						return x + delta
					},
					ease: Power4.easeOut,
					// get current visible slide
					onComplete: function() {
						for (let currentTarget of this.target) {
							if (currentTarget._gsTransform.x === 0) {
								// store component ID in component data
								component.currSlide(currentTarget.dataset.index)
								component.animateSlide()
							}
						}
					},
					modifiers: {
						x: function(x, target) {
							return wrap(x, -slideWidth, wrapWidth)
						}
					}
				})
			}

			let wrap = (value, min, max) => {
				let v = value - min
				let r = max - min
				return ((r + (v % r)) % r) + min
			}

			this.animateSlide()
		},
		currSlide: function(val) {
			this.currentSlide = parseInt(val)
		},
		animateSlide: function() {
			// vars
			const rotator = document.querySelector('.content__block-rotator')
			if (rotator) {
				this.currentSlideNode = document.querySelector(
					`.slide[data-index="${this.currentSlide}"]`
				)
				let headline = this.currentSlideNode.querySelector('.headline')
				let subHeader = this.currentSlideNode.querySelectorAll(
					'.subheader .word'
				)
				let button = this.currentSlideNode.querySelector(
					'.site__button'
				)
				this.slideTimeline = new TimelineMax({
					delay: this.i === 0 ? 2.5 : 0,
					onComplete: () => {
						this.i++
					}
				})

				// sub header
				this.slideTimeline.staggerTo(
					subHeader,
					1.5,
					{
						x: 0,
						autoAlpha: 1,
						ease: Power4.easeOut
					},
					0.2
				)

				// headline
				this.slideTimeline.to(
					[headline, button],
					1.5,
					{
						y: 0,
						autoAlpha: 1,
						ease: Power4.easeOut
					},
					'0.2'
				)
			}
		}
	}
}
</script>
