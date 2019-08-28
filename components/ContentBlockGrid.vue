<template>
	<section
		:class="[
			'content__block content__block-grid',
			`grid-item__count-${content.items.length}`
		]"
	>
		<main>
			<div
				v-for="(item, index) in content.items"
				:key="index"
				:data-id="index"
			>
				<figure>
					<img
						:src="item.imageAsset[0].url"
						:alt="
							item.imageAsset[0].alt ? item.imageAsset[0].alt : ''
						"
					/>
				</figure>
			</div>
		</main>
	</section>
</template>

<script>
export default {
	name: 'grid',
	props: {
		content: {
			type: Object,
			default: null
		}
	}
}
</script>
