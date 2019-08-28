<template>
	<section
		:class="[
			'content__block content__block-content-split',
			content.contentOrientation === 'right' ? 'row-reverse' : ''
		]"
	>
		<div
			v-if="content.blurb || content.headline"
			class="content__block-content-split__content"
		>
			<h1 v-if="content.headline">
				{{ content.headline }}
			</h1>
			<main v-if="content.blurb" v-html="content.blurb"></main>
			<img
				v-if="content.blurbGraphic.length"
				:src="content.blurbGraphic[0].url"
				:alt="content.blurbGraphic[0].alt"
				class="blurb-graphic"
			/>
			<div v-if="content.ctaEntriesLink.length" class="button__wrap">
				<nuxt-link
					class="site__button"
					:to="content.ctaEntriesLink[0].url"
				>
					<span>{{ content.ctaLabel }}</span>
				</nuxt-link>
			</div>
		</div>

		<div
			v-if="content.imageAsset.length"
			class="content__block-content-split__image"
		>
			<figure v-for="(image, index) in content.imageAsset" :key="index">
				<img :src="image.url" :alt="image.alt ? image.alt : ''" />
			</figure>
		</div>
		<div
			v-if="Object.entries(content.animation).length !== 0"
			:class="[
				content.animation.id +
					'-lottie__animation lottie__animation-container'
			]"
		>
			<LottieAnimation :animation="content.animation" />
		</div>
	</section>
</template>

<script>
import { TweenMax, Power4 } from 'gsap'
import LottieAnimation from './LottieAnimation'
export default {
	name: 'contentSplit',
	components: {
		LottieAnimation
	},
	props: {
		content: {
			type: Object,
			default: null
		},
		component: {
			type: Number,
			default: null
		}
	},
	data() {
		return {
			so: null
		}
	},
	mounted() {
		this.$Splitting({
			target: [
				'.content__block-content-split__content h1',
				'.content__block-content-split__content p'
			],
			by: 'words'
		})
		this.so = this.$ScrollOut({
			once: true,
			targets: '.content__block-content-split__content',
			threshold: 0.7,
			onShown: element => {
				const headline = element.querySelectorAll('h1 .word')
				const main = element.querySelector('main')
				const button = element.querySelector('.button__wrap')

				// if (headline) {
				// 	TweenMax.staggerTo(headline, 1, {
				// 		opacity: 1,
				// 		x: 0,
				// 		stagger: 0.2,
				// 		ease: Power4.easeInOut
				// 	})
				// }
				//
				// if (main) {
				// 	TweenMax.to(main, 1, {
				// 		opacity: 1,
				// 		y: 0,
				// 		ease: Power4.easeOut,
				// 		delay: 0.2
				// 	})
				// }
				//
				// if (button) {
				// 	TweenMax.to(button, 1, {
				// 		opacity: 1,
				// 		y: 0,
				// 		ease: Power4.easeOut,
				// 		delay: 0.4
				// 	})
				// }
			}
		})
	}
}
</script>
