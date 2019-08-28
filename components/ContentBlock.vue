<template>
	<section v-if="contentBlockContent" class="content__blocks">
		<component
			v-for="(contentBlock, index) in contentBlockContent"
			:is="contentBlock.type"
			:key="index"
			:content="contentBlock"
			:component="index"
			:sub-header="contentBlock.type === 'intro' ? pageTitle : null"
			:data-row="index"
		>
		</component>
	</section>
</template>

<script>
import videoBlock from './ContentBlockVideo'
import headline from './ContentBlockHeader'
import imageBlock from './ContentBlockImage'
import contentBlock from './ContentBlockContent'
import contentSplit from './ContentBlockContentSplit'
import tabsBlock from './ContentBlockTabs'
import columnedContent from './ContentBlockColumnedContent'
import sidebar from './ContentBlockSidebar'
import grid from './ContentBlockGrid'
import intro from './ContentBlockIntro'
import rotator from './ContentBlockRotator'
import simpleRotator from './ContentBlockSimpleRotator'
import fullWidthContent from './ContentBlockFullWidthContent'
export default {
	name: 'ContentBlock',
	components: {
		videoBlock,
		headline,
		imageBlock,
		contentBlock,
		columnedContent,
		contentSplit,
		grid,
		sidebar,
		intro,
		tabsBlock,
		rotator,
		simpleRotator,
		fullWidthContent
	},
	props: {
		contentBlockContent: {
			type: Array,
			default: null
		},
		pageTitle: {
			type: String,
			default: null
		}
	}
}
</script>
