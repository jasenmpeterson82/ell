<template>
	<figure
		:id="animation.id"
		:data-name="animation.id"
		class="lottie__animation"
	></figure>
</template>

<script>
export default {
	name: 'LottieAnimation',
	props: {
		animation: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			so: null
		}
	},
	mounted() {
		this.initLottie()
		this.so = this.$ScrollOut({
			once: true,
			targets: '.lottie__animation',
			threshold: 0.4,
			onShown: element => {
				if (!element.classList.contains('played')) {
					element.classList.add('played')
					let animationID = element.dataset.name
					this.$lottie.play(animationID)
				}
			}
		})
	},
	destroy() {
		this.so.destroy()
	},
	methods: {
		initLottie: function() {
			const element = document.getElementById(`${this.animation.id}`)
			this.$lottie.loadAnimation({
				container: element, // the dom element that will contain the animation,
				name: this.animation.id,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path: this.animation.url // the path to the animation json
			})
		}
	}
}
</script>
