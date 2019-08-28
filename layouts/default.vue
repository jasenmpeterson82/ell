<template>
	<main class="app__wrap">
		<div class="site-curtain site-curtain-black"></div>
		<div class="site-curtain site-curtain-white"></div>
		<figure class="lottie__animation-curtain"></figure>
		<Menu />
		<SiteHeader />
		<transition
			:css="false"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
		>
			<nuxt />
		</transition>
		<SiteFooter />
	</main>
</template>
<script>
import SiteHeader from '../components/Header'
import SiteFooter from '../components/Footer'
import Menu from '../components/Menu'
import { mapGetters, mapActions } from 'vuex'
import { TweenMax } from 'gsap'
let siteCurtainAnimation = null
let curtain = null
if (process.browser) {
	siteCurtainAnimation = require('~/plugins/siteCurtain')
}

export default {
	name: 'Default',
	components: {
		SiteFooter,
		SiteHeader,
		Menu
	},
	data() {
		return {
			structuredData: {
				'@context': 'http://schema.org',
				'@type': 'Organization',
				name: 'Ell Creative',
				url: 'http://www.ellcreative.com',
				sameAs: [
					'https://www.facebook.com/ellcreative',
					'https://twitter.com/ELLCreative',
					'https://www.instagram.com/ellcreative/',
					'https://www.youtube.com/ellcreative',
					'https://vimeo.com/ellcreative',
					'https://www.linkedin.com/company/852430'
				]
			},
			curtainBlack: null,
			curtainWhite: null,
			animatedLogo: null,
			lottieAnimationCurtain: null,
			curtainTimeline: null
		}
	},
	computed: {
		...mapGetters(['getMenuState'])
	},
	head() {
		return {
			__dangerouslyDisableSanitizers: ['script'],
			script: [
				{
					innerHTML: JSON.stringify(this.structuredData),
					type: 'application/ld+json'
				}
			]
		}
	},
	mounted() {
		// see ~/plugins/siteCurtain.js
		curtain = siteCurtainAnimation.default
		curtain.animatedLogo.play()
		curtain.timeline.play()
	},
	methods: {
		...mapActions(['siteCurtain']),
		beforeEnter(el, done) {
			TweenMax.set(el, { visibility: 'hidden' })
			if (
				this.$route.params &&
				this.$route.params.linkType === 'button'
			) {
				curtain.timeline.progress(0).pause()
				curtain.animatedLogo.goToAndStop(0)
				curtain.animatedLogo.play()
				curtain.timeline.play()
			}
		},
		enter(el, done) {
			TweenMax.to(el, 0, {
				visibility: 'visible',
				delay: 2.5
			})
		}
	}
}
</script>
