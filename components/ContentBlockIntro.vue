<template>
	<section class="content__block content__block-intro">
		<header>
			<h4>{{ subHeader }}</h4>
			<h1
				v-if="content.headline"
				class="headline"
				v-html="constructHeader"
			/>
			<img
				v-if="content.headlineLineGraphic.length"
				:src="content.headlineLineGraphic[0].url"
				:alt="content.headlineLineGraphic[0].alt"
				class="headline-graphic"
			/>
		</header>
		<article v-if="content.copy" v-html="content.copy"></article>
		<nuxt-link
			v-if="content.doesThisLinkToAWorkFilter === true"
			class="site__button"
			:to="{
				name: 'work',
				params: {
					filter:
						content.doesThisLinkToAWorkFilter === true
							? content.filterForWork[0][0]
							: '',
					linkType: 'button'
				}
			}"
		>
			<span>{{ content.ctaLabel }}</span>
		</nuxt-link>
	</section>
</template>

<script>
export default {
	name: 'intro',
	props: {
		content: {
			type: Object,
			default: null
		},
		subHeader: {
			type: String,
			default: null
		}
	},
	computed: {
		constructHeader: function() {
			let headerText = []
			for (let item of this.content.headline) {
				headerText.push(
					`${
						item.color === 'grey'
							? `<span class="gray">${item.text}</span>`
							: item.text
					} ${item.lineBreak === true ? '<br/>' : ''}`
				)
			}
			return headerText.join(' ')
		}
	}
}
</script>
