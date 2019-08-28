if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import getRoutes from './utils/getRoutes'
export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
	env: {
		url: (process.env.NODE_ENV !== 'production') ? process.env.STAGING_URL : 'https://ellcreative.com/'
	},
    head: {
        title: process.env.npm_package_name || '',
	    titleTemplate: '%s - Ell Creative',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
        	    { rel: 'icon', type: 'image/x-icon', href: 'https://assets.ellcdn.com/ell-site/ell-favicon.ico' },
	            { rel: 'stylesheet', href: 'https://use.typekit.net/hfx6aca.css' }
        	]
    },
	sitemap: {
    	routes() {
    	    return getRoutes()
	    },
		exclude: [
			'/work'
		],
		path: '/sitemap.xml',
		gzip: true,
		generate: false
	},
	router: {
		scrollBehavior: function (to, from, savedPosition) {
			return { x: 0, y: 0 }
		}
	},
    /*
     ** Customize the progress-bar color
     */
    loading: false,
    /*
     ** Global CSS
     */
    css: [
        'plyr/dist/plyr.css',
        '~/assets/css/tailwind.css',
        '~/assets/site/scss/site.scss'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
	    { src: '~/plugins/flickity.js', mode: 'client' },
	    { src: '~/plugins/imagesLoaded.js', mode: 'client' },
	    { src: '~/plugins/global.js', mode: 'client' },
	    { src: '~/utils/getRoutes.js', mode: 'client' },
	    { src: '~/plugins/vee-validate.js' },
	    { src: '~plugins/ga.js', ssr: false },
	    { src: '~plugins/scrollOut.js', ssr: false },
	    { src: '~plugins/lottie.js', ssr: false },
	    { src: '~plugins/splitting.js', ssr: false },
	    { src: '~plugins/siteCurtain.js', ssr: false }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
	    '@nuxtjs/sitemap',
	    '@nuxtjs/dotenv'
    ],

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: (process.env.NODE_ENV !== 'production') ? process.env.STAGING_API : 'https://control.ellcreative.com/api/v1/'
    },
	serverMiddleware: ['~/api/index.js'],
    /*
     ** Build configuration
     */
    build: {
    	vendor: ['vee-validate'],
        postcss: {
            plugins: {
                tailwindcss: './tailwind.config.js'
            }
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
	    transpile: ['TweenMax', 'TimelineMax']
    }
}
