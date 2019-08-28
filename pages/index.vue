<template>
	<main class="component__wrap">
		<section class="page page-home">
			<ContentBlock
				:content-block-content="$store.state.page.contentBlocks"
			/>
		</section>
		<ContactForm />
	</main>
</template>
<script>
import ContentBlock from '../components/ContentBlock'
import ContactForm from '../components/ContactForm'
export default {
	name: 'Home',
	components: {
		ContactForm,
		ContentBlock
	},
	head() {
		const SEO_TITLE = this.$store.getters['page/getPageTitle']
		const SEO_DESCRIPTION = this.$store.getters['page/getPageDescription']
		const SEO_KEYWORDS = this.$store.getters['page/getPageKeywords']
		return {
			bodyAttrs: {
				class: 'page-home'
			},
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
	async fetch({ store, route }) {
		// page object/data
		let pageObject = store.state.siteContent.data.find(
			i => i.slug === 'home'
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
