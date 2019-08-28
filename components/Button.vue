<template>
	<nuxt-link
		:to="{
			name: 'slug',
			params: { linkType: 'button', slug: button.slug[0].url }
		}"
		:class="[
			button.btnColor
				? 'site__button site__button-' + button.btnColor
				: 'site__button'
		]"
	>
		<span>{{ button.label }}</span>
	</nuxt-link>
</template>

<script>
export default {
	name: 'Button',
	props: {
		button: {
			type: Object,
			default: null
		}
	}
}
</script>
