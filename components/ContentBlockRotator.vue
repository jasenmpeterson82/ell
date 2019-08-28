<template>
	<section class="content__block-rotator-wrap">
		<div class="curtain hidden"></div>
		<section class="video-container">
			<video
				class="w-screen"
				src="https://assets.ellcdn.com/ell-site/ELL_SITE_BANNER_PAINT_low.mp4"
				muted
				loop
				autoplay
			></video>
		</section>
		<section class="content__block content__block-rotator relative">
			<!-- <img src="/video-background_alt.jpg" alt="" class="mobile-background" /> -->
			<section class="slides">
				<div
					v-for="(slide, index) in content.slides"
					:key="index"
					:data-index="index"
					class="slide"
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
				</div>
			</section>
		</section>
	</section>
</template>

<script>
import { TimelineMax, TweenMax, Power4 } from 'gsap'
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
			timeline: null
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
	mounted() {
		this.animateSlide()
	},
	methods: {
		animateSlide: function() {
			const slides = document.querySelectorAll(
				'.content__block-rotator .slide'
			)
			this.timeline = new TimelineMax({
				delay: 0.7,
				paused: true,
				onComplete: () => {
					this.timeline.progress(0)
				}
			})
			for (let slide of slides) {
				const timeline = new TimelineMax()
				const subHeader = slide.querySelector('.subheader')
				TweenMax.set(subHeader, { y: 35 })
				const headline = slide.querySelector('.headline')
				TweenMax.set(headline, { y: 35 })
				const button = slide.querySelector('.site__button')
				TweenMax.set(button, { y: 35 })

				timeline.to(slide, 0, {
					zIndex: 200
				})
				timeline.to(subHeader, 1, {
					autoAlpha: 1,
					y: 0,
					ease: Power4.easeOut
				})
				timeline.to(
					headline,
					1,
					{
						autoAlpha: 1,
						y: 0,
						ease: Power4.easeOut
					},
					'0.1'
				)
				timeline.to(
					button,
					1,
					{
						autoAlpha: 1,
						y: 0,
						ease: Power4.easeOut
					},
					'0.2'
				)

				timeline.timeScale(0.7)

				const timelineOut = new TimelineMax({
					delay: 4
				})

				timelineOut.to(button, 1, {
					autoAlpha: 0,
					y: 35,
					ease: Power4.easeOut
				})
				timelineOut.to(
					headline,
					1,
					{
						autoAlpha: 0,
						y: 35,
						ease: Power4.easeOut
					},
					'0.1'
				)
				timelineOut.to(
					subHeader,
					1,
					{
						autoAlpha: 0,
						y: 35,
						ease: Power4.easeOut
					},
					'0.2'
				)
				timelineOut.to(slide, 0, {
					zIndex: 1
				})

				timelineOut.timeScale(1.5)
				timeline.add(timelineOut)

				this.timeline.add(timeline)
			}
			this.timeline.play()
		}
	}
}
</script>
