/* eslint-disable */

export default ({ app }) => {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-15632529-1', 'auto');
	app.router.afterEach((to, from) => {
		/*
		** We tell Google Analytics to add a `pageview`
		*/
		ga('set', 'page', to.fullPath)
		ga('send', 'pageview')
	})
}