<template>
	<footer>
		<div class="wrap">
			<div>
				<Logo />
				<article class="copyright">
					<div>
						<small>&copy; 2019 ELL CREATIVE.</small>
					</div>
					<div>
						<small>
							<nuxt-link
								:to="{
									name: 'privacy-policy',
									params: {
										linkType: 'button',
										to: '/privacy-policy'
									}
								}"
							>
								Privacy Policy
							</nuxt-link>
						</small>
					</div>
				</article>
			</div>
			<div>
				<SocialMedia />
			</div>
		</div>
	</footer>
</template>

<script>
import Logo from '../components/Logo'
import SocialMedia from '../components/SocialMedia'
export default {
	name: 'SiteFooter',
	components: {
		Logo,
		SocialMedia
	}
}
</script>
