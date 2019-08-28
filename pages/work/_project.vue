<template>
	<main class="component__wrap">
		<section class="page page-project">
			<header class="project-header">
				<nuxt-link
					:to="{
						name: 'work',
						params: { path: '/work', linkType: 'button' }
					}"
					class="back-to-projects"
				>
					<figure>
						<!-- prettier-ignore -->
						<svg
							width="61"
							height="61"
							viewBox="0 0 61 61"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="30.5"
								cy="30.5"
								r="30.5"
								fill="#DE5640"
							/>
							<path
								d="M26.23 39.45C26.57 39.81 27.14 39.81 27.5 39.45C27.84 39.11 27.84 38.54 27.5 38.19L21.06 31.75H42.3C42.8 31.75 43.19 31.36 43.19 30.86C43.19 30.37 42.8 29.96 42.3 29.96H21.06L27.5 23.54C27.84 23.18 27.84 22.61 27.5 22.27C27.14 21.91 26.57 21.91 26.23 22.27L18.27 30.23C17.91 30.57 17.91 31.14 18.27 31.48L26.23 39.45Z"
								fill="white" />
						</svg>
					</figure>
					<div>
						<span>more projects</span>
					</div>
				</nuxt-link>
				<h3>{{ $store.state.page.pageData.workCategory }}</h3>
				<h1>{{ $store.state.page.pageTitle }}</h1>
			</header>
			<ContentBlock
				:content-block-content="$store.state.page.contentBlocks"
			/>
		</section>
	</main>
</template>

<script>
import ContentBlock from '../../components/ContentBlock'
export default {
	name: 'Project',
	head() {
		const SEO_TITLE = this.$store.getters['page/getPageTitle']
		const SEO_DESCRIPTION = this.$store.getters['page/getPageDescription']
		const SEO_KEYWORDS = this.$store.getters['page/getPageKeywords']
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
	components: {
		ContentBlock
	},
	async fetch({ store, route }) {
		// page object/data
		let pageObject = store.state.projects.data.find(
			i => i.slug === route.params.project
		)
		store.commit('page/setPageData', pageObject)
		store.commit(
			'page/setContentBlocks',
			store.getters['page/getPageData'].body
		)

		// page title
		store.commit('page/setPageTitle', pageObject.title)

		// page description
		store.commit('page/setPageDescription', pageObject.meta.descriptionRaw)

		// page keywords
		let keywordArray = []
		for (let keyword of pageObject.meta.keywords) {
			keywordArray.push(keyword.keyword)
		}
		store.commit('page/setPageKeywords', keywordArray.join(', '))
	}
}
</script>
