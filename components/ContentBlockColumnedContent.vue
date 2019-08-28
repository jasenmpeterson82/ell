<template>
	<section class="content__block content__block-columned-content">
		<div>
			<h3>
				{{ content.headline }}
			</h3>
		</div>

		<div>
			<article v-html="content.copy"></article>
		</div>
		<div
			v-if="content.imageAsset.length"
			class="content__block-content-split__image"
		>
			<figure v-for="(image, index) in content.imageAsset" :key="index">
				<img :src="image.url" :alt="image.alt ? image.alt : ''" />
			</figure>
		</div>
		<div
			v-if="Object.entries(content.animation).length !== 0"
			:class="[
				content.animation.id +
					'-lottie__animation lottie__animation-container'
			]"
		>
			<LottieAnimation :animation="content.animation" />
		</div>
	</section>
</template>

<script>
import LottieAnimation from './LottieAnimation'
export default {
	name: 'columnedContent',
	components: {
		LottieAnimation
	},
	props: {
		content: {
			type: Object,
			default: null
		}
	}
}
</script>

<style lang="scss" scoped>
.content__block-columned-content {
	@apply .flex-col;
}

.content__block-columned-content div:not(:last-child) {
	@apply .mb-6;
}

article >>> ul li:not(:last-child) {
	@apply .mb-1;
}

.content__block.content__block-columned-content figure img {
	@apply .w-64;
	@apply .h-auto;
	@apply .mx-auto;
}

@media screen and (min-width: 767px) {
	.content__block-columned-content div:not(:last-child) {
		@apply .mb-0;
	}

	.content__block-columned-content {
		@apply .w-full;
		@apply .flex-row;
	}

	.content__block.content__block-columned-content figure img {
		width: 24rem;
	}

	.content__block-columned-content figure {
		@apply .h-full;
		@apply .flex;
		@apply .items-center;
		@apply .justify-center;
		@apply .mx-auto;
	}
}
</style>
