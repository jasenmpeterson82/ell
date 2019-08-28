<template>
	<main class="component__wrap" style="visibility: hidden">
		<section class="page page-error">
			<article v-if="error.statusCode === 404">
				<img src="/404.svg" alt="404 Page Graphic" />
				<h1>Well, would you look at that. Nothing.</h1>
				<nuxt-link class="site__button" to="/">
					<span>Return to Home Page</span>
				</nuxt-link>
			</article>
		</section>
	</main>
</template>

<script>
export default {
	name: 'error',
	props: {
		error: {
			type: Object,
			default: null
		}
	}
}
</script>
