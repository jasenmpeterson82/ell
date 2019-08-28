<template>
	<main class="component__wrap">
		<div class="contact-wrap relative">
			<figure
				v-if="$store.state.page.pageData.pageBackgroundImage.length"
				class="page__background-image"
				:style="{
					backgroundImage:
						'url(' +
						$store.state.page.pageData.pageBackgroundImage[0].url +
						')'
				}"
				:aria-label="
					$store.state.page.pageData.pageBackgroundImage[0].alt
				"
			/>
			<section class="content__block-intro">
				<main>
					<h4>{{ pageTitle }}</h4>
					<h1>{{ contactHeader }}</h1>
					<article v-html="contactCopy"></article>
				</main>
			</section>
		</div>
		<section class="page page-contact">
			<ContactForm />
		</section>
	</main>
</template>
<script>
import ContactForm from '../../components/ContactForm'
export default {
	name: 'Contact',
	head() {
		const SEO_TITLE = this.$store.getters['page/getPageTitle']
		const SEO_DESCRIPTION = this.$store.getters['page/getPageDescription']
		const SEO_KEYWORDS = this.$store.getters['page/getPageKeywords']
		return {
			title: SEO_TITLE,
			bodyAttrs: {
				class: 'body-contact'
			},
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
		ContactForm
	},
	data() {
		return {
			contactHeader: this.$store.state.page.contentBlocks[0].headline[0]
				.text,
			contactCopy: this.$store.state.page.contentBlocks[0].copy,
			pageTitle: this.$store.state.page.pageTitle
		}
	},
	async fetch({ store, route }) {
		// page object/data
		let pageObject = store.state.siteContent.data.find(
			i => i.slug === 'contact'
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

		// page slug
		store.commit('page/setPageSlug', pageObject.slug)
	}
}
</script>
