<template>
	<section class="content__block content__block-simple-rotator">
		<no-ssr>
			<flickity
				ref="flickity"
				v-images-loaded="imgsLoaded"
				:options="options"
			>
				<figure
					v-for="(slide, index) in content.slides"
					:key="index"
					class="carousel-cell"
				>
					<img :src="slide['image'][0].url" alt="" />
				</figure>
			</flickity>
		</no-ssr>
	</section>
</template>

<script>
export default {
	name: 'simpleRotator',
	props: {
		content: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			options: {
				wrapAround: true,
				selectedAttraction: 0.01,
				friction: 0.15,
				prevNextButtons: false,
				autoPlay: 3500
			}
		}
	},
	methods: {
		imgsLoaded: function(instance, image) {
			let flickityInstance = this.$refs.flickity
			flickityInstance.reloadCells()
			flickityInstance.select(2)
		}
	}
}
</script>
