<template>
	<section class="content__blocks tabbed-content__blocks">
		<section class="tabbed__navigation">
			<nav>
				<button
					v-for="(button, index) in tabButtons"
					:key="button.id"
					:class="[index === currTabIndex ? 'active' : '']"
					:data-id="index"
					:data-label="button.label"
					v-on:click="switchTabs"
				>
					{{ button.label }}
				</button>
			</nav>
		</section>
		<transition-group
			mode="out-in"
			name="expand"
			tag="section"
			class="tab-container"
			v-on:before-enter="beforeEnter"
			v-on:after-enter="afterEnter"
			v-on:before-leave="beforeLeave"
			v-on:after-leave="afterLeave"
		>
			<div
				v-for="(tabContent, index) in content.tabData"
				v-show="index === currTabIndex"
				:key="tabContent.label"
				:data-label="tabContent.label"
				:data-id="index"
				:class="[
					index === currTabIndex ? 'active' : '',
					'tabbed-section__wrap'
				]"
			>
				<component
					v-for="(tab, tabIndex) in tabContent.content"
					:is="tab.type"
					:key="tabIndex"
					:content="tab"
					:component="index"
					:data-row="index"
				></component>
			</div>
		</transition-group>
	</section>
</template>

<script>
import videoBlock from './ContentBlockVideo'
import headline from './ContentBlockHeader'
import imageBlock from './ContentBlockImage'
import contentBlock from './ContentBlockContent'
import contentSplit from './ContentBlockContentSplit'
import columnedContent from './ContentBlockColumnedContent'
import fullWidthContent from './ContentBlockFullWidthContent'
export default {
	name: 'WorkTabs',
	components: {
		videoBlock,
		headline,
		imageBlock,
		contentBlock,
		contentSplit,
		columnedContent,
		fullWidthContent
	},
	props: {
		content: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			tabButtons: [],
			currTabIndex: 0
		}
	},
	mounted() {
		this.tabNavigation()
	},
	methods: {
		tabNavigation: function() {
			for (let tab of this.content.tabData) {
				this.tabButtons.push({
					id: tab.id,
					label: tab.label
				})
			}
		},
		switchTabs: function(e) {
			let tabID = e.target.dataset.id
			this.currTabIndex = parseInt(tabID)
		},
		beforeEnter: function(el) {
			// clone
			let clone = el.cloneNode(true)
			let h = null
			clone.style.width = el.style.width
			clone.style.visibility = 'hidden'
			clone.style.removeProperty('display')

			let desc = clone.querySelectorAll('*')
			for (let node of desc) {
				node.style.removeProperty('display')
			}
			// get clone height
			el.parentNode.appendChild(clone)
			h = clone.clientHeight
			clone.remove()

			el.style.height = '0px'
			setTimeout(function() {
				el.style.height = h + 'px'
			}, 1)
		},
		afterEnter: function(el) {
			el.style.removeProperty('height')
		},
		beforeLeave: function(el) {
			el.style.height = el.clientHeight + 'px'
			setTimeout(function() {
				el.style.height = '0px'
			}, 1)
		},
		afterLeave: function(el) {
			el.style.removeProperty('height')
		}
	}
}
</script>
