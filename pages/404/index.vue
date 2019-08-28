<template>
	<main
		class="component__wrap page-error-component__wrap"
	>
		<section class="page page-error">
			<img src="/404.svg" alt="404 Page Graphic" />
			<h1>Well, would you look at that. Nothing.</h1>
			<nuxt-link class="site__button" to="/">
				<span>Return to Home Page</span>
			</nuxt-link>
		</section>
	</main>
</template>

<script>
export default {
	name: 'error',
	head() {
		const SEO_TITLE = '404 Error Page - Ell Creative'
		const SEO_DESCRIPTION = '404 Error Page - Ell Creative'
		const SEO_KEYWORDS = ''
		return {
			title: SEO_TITLE,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: SEO_DESCRIPTION
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: SEO_KEYWORDS
				}
			]
		}
	},
	layout: 'error'
}
</script>
