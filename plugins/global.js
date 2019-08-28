import onScroll from './onScroll'
if (process.browser) {
	window.onNuxtReady(app => {
		onScroll()
	})
}
