<template>
	<section
		class="content__block content__block-content"
		v-html="content.copy"
	/>
</template>

<script>
export default {
	name: 'contentBlock',
	props: {
		content: {
			type: Object,
			default: null
		}
	}
}
</script>
