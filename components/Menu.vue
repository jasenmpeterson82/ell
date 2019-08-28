<template>
	<section v-if="filteredMenuItems" class="site-menu">
		<simplebar class="ell__simple-bar" data-simplebar-auto-hide="false">
			<div class="wrap">
				<nav v-for="(n, index) in filteredMenuItems.length" :key="n.id">
					<div
						v-for="(item, item_count) in filteredMenuItems[index]"
						:key="item.id"
						class="menu-item"
					>
						<section
							v-if="!item.children.length"
							class="section-menu"
						>
							<header v-if="item_count === 0">
								<h4>
									menu
								</h4>
							</header>
							<nuxt-link
								v-if="item.linkTarget.value === 'internal'"
								:to="`/${item.slug}`"
								class="page-link"
							>
								{{ item.title }}
							</nuxt-link>
							<a
								v-else
								:href="item.externalUrl"
								target="_blank"
								class="page-link"
							>
								{{ item.title }}
							</a>
						</section>

						<section
							v-if="item.children.length"
							class="section-menu sub-menu"
						>
							<header>
								<h4>
									{{ item.title }}
								</h4>
							</header>
							<div
								v-for="(menuItem, menuItemIndex) of item.children"
								:key="menuItemIndex"
								class="menu-item"
							>
								<nuxt-link
									v-if="
										menuItem.internalOrExternal.value ===
											'internal'
									"
									:to="`/${menuItem.slug}`"
									class="page-link"
								>
									{{ menuItem.title }}
								</nuxt-link>
								<a
									v-else
									:href="menuItem.externalUrl"
									target="_blank"
									class="page-link"
								>
									{{ menuItem.title }}
								</a>
							</div>
						</section>
					</div>
				</nav>
				<section class="meta-info address">
					<address
						v-for="item in siteAddress.address"
						:key="item.id"
						class="meta-box address"
					>
						<header>
							<h4>{{ item.label }}</h4>
						</header>
						<p>{{ item.street }}</p>
						<p>{{ item.location }}</p>
					</address>
					<section
						v-for="item in siteAddress.phone"
						:key="item.id"
						class="meta-box phone"
					>
						<header>
							<h4>{{ item.label }}</h4>
						</header>
						<p>{{ item.phone }}</p>
					</section>
					<section class="meta-box social-media">
						<header>
							<h4>social</h4>
						</header>
						<SocialMedia />
					</section>
				</section>
			</div>
		</simplebar>
	</section>
</template>

<script>
import { TimelineMax, TweenMax, Power4 } from 'gsap'
import { mapGetters, mapActions } from 'vuex'
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
import SocialMedia from './SocialMedia'
let siteCurtainAnimation = null
let curtain = null
if (process.browser) {
	siteCurtainAnimation = require('~/plugins/siteCurtain')
}
export default {
	name: 'Menu',
	components: {
		SocialMedia,
		simplebar
	},
	computed: {
		...mapGetters({ siteMenu: 'getSiteMenu', siteData: 'getSiteData' }),
		filteredMenuItems: function() {
			let menuWithChildren = []
			let menuItems = []
			for (let item of this.siteMenu.data) {
				if (item.children.length) {
					menuWithChildren.push({
						id: item.id,
						slug: item.slug,
						title: item.title,
						children: item.children,
						linkTarget: item.internalOrExternal,
						externalURL: item.externalURL ? item.externalURL : null
					})
				} else {
					menuItems.push({
						id: item.id,
						slug: item.slug,
						title: item.title,
						children: [],
						linkTarget: item.internalOrExternal,
						externalUrl: item.externalUrl ? item.externalUrl : null
					})
				}
			}
			let menu = [menuItems, menuWithChildren]
			return menu
		},
		siteAddress: function() {
			const addressObject = {
				address: [
					{
						id: 0,
						label: 'address',
						street: this.siteData.data[0].addressline1,
						location: this.siteData.data[0].addressline2
					}
				],
				phone: [
					{
						id: 1,
						label: 'phone',
						phone: this.siteData.data[0].phone
					}
				]
			}
			return addressObject
		}
	},
	mounted() {
		curtain = siteCurtainAnimation.default
		this.initMenu()
	},
	methods: {
		...mapActions(['menuState']),
		initMenu: function() {
			const button = document.querySelector('.site__menu-button')
			const appWrap = document.getElementsByTagName('html')
			const links = document.querySelectorAll('.page-link')
			const menu = document.querySelector('.site-menu')
			const menuHeaders = document.querySelectorAll('.site-menu header')
			const menuLinks = document.querySelectorAll('.site-menu .page-link')
			const metaPhone = document.querySelectorAll(
				'.site-menu .meta-box.phone p'
			)
			const metaAddress = document.querySelectorAll(
				'.site-menu .meta-box.address p'
			)
			const meta = [metaPhone, metaAddress]
			const socialMedia = document.querySelectorAll(
				'.site-menu .meta-box.social-media a'
			)

			TweenMax.set(menu, { x: '100%', opacity: 1 })

			const setMenuStateFalse = () => {
				this.menuState(false)
			}

			const setMenuStateTrue = () => {
				this.menuState(true)
			}


			const timeline = new TimelineMax({
				paused: true,
				id: 'menuTimeline',
				onComplete: () => {
					setMenuStateTrue()
				},
				onReverseComplete: () => {
					curtain.timeline.progress(0).pause()
					curtain.animatedLogo.goToAndStop(0)
					curtain.animatedLogo.play()
					curtain.timeline.play()
					setMenuStateFalse()
				}
			})

			const menuTimeline = TweenMax.to(menu, 1, {
				x: '0%',
				ease: Power4.easeInOut,
				id: 'menu'
			})

			timeline.add(menuTimeline)

			const menuHeadersTimeline = TweenMax.staggerTo(menuHeaders, 1, {
				opacity: 1,
				y: 0,
				ease: Power4.easeInOut,
				stagger: 0.1,
				id: 'menuHeaders'
			})

			timeline.add(menuHeadersTimeline, 0.4)

			const menuLinksTimeline = TweenMax.staggerTo(
				menuLinks,
				0.8,
				{
					opacity: 1,
					x: 0,
					ease: Power4.easeOut,
					stagger: 0.1,
					id: 'menuLinks'
				},
				0.2
			)

			timeline.add(menuLinksTimeline, 0.5)

			const metaTimeline = TweenMax.to(meta, 0.5, {
				opacity: 1,
				x: 0,
				ease: Power4.easeOut,
				stagger: 0.1,
				id: 'meta'
			})

			timeline.add(metaTimeline, 1.05)

			const socialMediaAnimation = TweenMax.staggerTo(socialMedia, 0.3, {
				opacity: 1,
				y: 0,
				ease: Power4.easeOut,
				stagger: 0.1,
				id: 'socialMedia'
			})

			timeline.add(socialMediaAnimation, 1.15)

			button.addEventListener('click', () => {
				if (appWrap[0].classList.contains('menu-open')) {
					appWrap[0].classList.remove('menu-open')
					timeline.timeScale(1.5).reverse(0)
					setMenuStateFalse()
					return
				}
				appWrap[0].classList.add('menu-open')
				timeline.timeScale(1).play()
			})

			for (let link of links) {
				link.addEventListener('click', function(e) {
					if (appWrap[0].classList.contains('menu-open')) {
						appWrap[0].classList.remove('menu-open')
						timeline.timeScale(1.5).reverse(0)
					}
				})
			}
		}
	}
}
</script>
