<template>
	<main class="component__wrap">
		<figure
			v-if="
				$store.state.page.pageData &&
					$store.state.page.pageData.pageBackgroundImage.length
			"
			class="page__background-image"
			:style="{
				backgroundImage:
					'url(' +
					$store.state.page.pageData.pageBackgroundImage[0].url +
					')'
			}"
			:aria-label="$store.state.page.pageData.pageBackgroundImage[0].alt"
		/>
		<section :class="['page', `page-${$store.state.page.pageSlug}`]">
			<ContentBlock
				:page-title="$store.state.page.pageTitle"
				:content-block-content="$store.state.page.contentBlocks"
			/>
		</section>
	</main>
</template>

<script>
import ContentBlock from '../../components/ContentBlock'
export default {
	name: 'Page',
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
	async fetch({ store, route, app, redirect }) {
		// page object/data
		let pageObject = store.state.siteContent.data.find(
			i => i.slug === route.params.slug
		)
		store.commit('page/setPageData', pageObject)
		if (store.getters['page/getPageData'] !== undefined) {
			store.commit(
				'page/setContentBlocks',
				store.getters['page/getPageData'].body
			)
			// page title
			store.commit('page/setPageTitle', pageObject.title)

			// page description
			store.commit(
				'page/setPageDescription',
				pageObject.meta.descriptionRaw
			)

			// page keywords
			let keywordArray = []
			for (let keyword of pageObject.meta.keywords) {
				keywordArray.push(keyword.keyword)
			}
			store.commit('page/setPageKeywords', keywordArray.join(', '))

			// page slug
			store.commit('page/setPageSlug', pageObject.slug)
		} else {
			return redirect('/404')
		}
	}
}
</script>
