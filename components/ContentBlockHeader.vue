<template>
	<header class="content__block content__block-header">
		<h4 v-if="subHeader">
			{{ subHeader }}
		</h4>
		<h1 v-if="content" class="headline" v-html="constructHeader"></h1>
	</header>
</template>

<script>
export default {
	name: 'headline',
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
			for (let item of this.content.text) {
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
