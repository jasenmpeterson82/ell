<template>
	<section class="page-banner">
		<div class="wrap">
			<div>
				<main>
					<h4 v-if="content[0].header.subHeader">
						{{ content[0].header.subHeader }}
					</h4>
					<h1 v-if="content[0].header.mainHeader">
						{{ content[0].header.mainHeader }}
					</h1>
				</main>
				<Button
					v-if="content[0].hasOwnProperty('button')"
					:button="content[0].button"
				/>
			</div>
			<div></div>
		</div>
	</section>
</template>

<script>
import Button from '../components/Button'
export default {
	name: 'PageBanner',
	components: {
		Button
	},
	props: {
		content: {
			type: Array,
			default: null
		}
	}
}
</script>
