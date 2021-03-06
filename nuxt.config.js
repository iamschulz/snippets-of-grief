export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Snippets of Grief',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'theme-color', content: '#98afe9' },
			{ name: 'link', rel: 'preload', as: 'image', href: 'static/cardCover-290.jpg' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: 'AppIcon.svg' }],
	},

	router: {
		extendRoutes(routes, resolve) {
			routes.push({
				name: 'custom',
				path: '*',
				component: resolve(__dirname, 'pages/404.vue'),
			})
		},
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [{ src: '~/plugins/pwa-update.js', mode: 'client' }],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxtjs/composition-api',
		'@nuxtjs/pwa',
		'@nuxtjs/svg',
		'@nuxt/image',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
	],

	render: {
		bundleRenderer: {
			shouldPreload: (file, type) => {
				return ['script', 'style', 'font'].includes(type)
			},
		},
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			name: 'Snippets of Grief',
			short_name: 'Snippets of Grief',
			lang: 'de',
			background_color: '#98afe9',
			theme_color: '#98afe9',
			icon: {
				source: 'static/icon.png',
				fileName: 'icon.png',
			},
		},
		meta: {
			theme_color: '#98afe9',
		},
		workbox: {
			preCaching: ['/cardCover-290.jpg'],
		},
	},

	image: {
		screens: {
			s: 1060,
			l: 1400,
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
