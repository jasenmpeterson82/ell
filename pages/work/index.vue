<template>
	<main class="component__wrap">
		<section class="page page-work">
			<WorkComponent
				:projects="$store.state.projects.data"
				:filter="this.$nuxt._route.params.filter"
			/>
		</section>
	</main>
</template>

<script>
import WorkComponent from '../../components/WorkComponent'
export default {
	name: 'Work',
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
		WorkComponent
	},
	async fetch({ store, route }) {
		// page object/data
		let pageObject = store.state.siteContent.data.find(
			i => i.slug === 'work'
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
