<template>
	<header class="site__header">
		<div class="wrap">
			<div>
				<Logo />
				<p class="tagline">
					<span class="inline-block">{{ siteTagLine }}</span>
				</p>
			</div>
			<div>
				<button class="site__menu-button">
					<span class="site__menu-line"></span>
					<span class="site__menu-line"></span>
				</button>
			</div>
		</div>
	</header>
</template>

<script>
import Logo from '../components/Logo'
import { mapGetters } from 'vuex'
export default {
	name: 'Header',
	components: {
		Logo
	},
	computed: {
		...mapGetters({ siteData: 'getSiteData' }),
		siteTagLine: function() {
			const tagLine = this.siteData.data[0].tagline
			return tagLine
		}
	}
}
</script>
