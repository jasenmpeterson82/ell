import axios from 'axios'
export default async function() {
	const pageRoutes = await axios.get(
		process.env.NODE_ENV !== 'production'
			? process.env.SITEMAP_CONTENT_FEED
			: 'https://control.ellcreative.com/api/v1/content.json'
	)
	const workRoutes = await axios.get(
		process.env.NODE_ENV !== 'production'
			? process.env.SITEMAP_WORK_FEED
			: 'https://control.ellcreative.com/api/v1/work.json'
	)

	const routes = []
	pageRoutes.data.data.forEach(item => routes.push(item.slug))
	workRoutes.data.data.forEach(item => routes.push(`/work/${item.slug}`))
	return routes
}
