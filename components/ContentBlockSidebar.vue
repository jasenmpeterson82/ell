<template>
	<aside class="content__block content__block-sidebar">
		<figure v-if="content.backgroundImage.length">
			<img :src="content.backgroundImage[0].url" />
		</figure>
		<div class="wrap">
			<h4>{{ content.headline }}</h4>
			<article class="list" v-html="content.copy"></article>
		</div>
	</aside>
</template>

<script>
export default {
	name: 'sidebar',
	props: {
		content: {
			type: Object,
			default: null
		}
	}
}
</script>
