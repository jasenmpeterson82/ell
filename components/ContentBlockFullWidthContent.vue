<template>
	<section class="content__block content__block-full-width">
		<article v-html="content.copy"></article>
	</section>
</template>

<script>
export default {
	name: 'fullWidthContent',
	props: {
		content: {
			type: Object,
			default: null
		}
	}
}
</script>
