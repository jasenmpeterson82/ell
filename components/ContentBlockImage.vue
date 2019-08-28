<template>
	<section
		class="content__block content__block-image"
	>
		<figure v-for="(image, index) in content.imageAsset" :key="index">
			<img :src="image.url" :alt="image.alt ? image.alt : ''" />
			<figcaption v-if="image.caption">{{ image.caption }}</figcaption>
		</figure>
	</section>
</template>

<script>
export default {
	name: 'imageBlock',
	props: {
		content: {
			type: Object,
			default: null
		}
	}
}
</script>
