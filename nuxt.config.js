export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Snippets of Grief',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Lorem Ipsum' },
			{ name: 'theme-color', content: '#93a5d1' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: 'AppIcon.svg' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxtjs/composition-api',
		'@nuxtjs/pwa',
		'@nuxtjs/svg',
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
			lang: 'de',
			background_color: '#93a5d1',
			theme_color: '#93a5d1',
			icon: {
				source: 'static/AppIcon-512.png',
			},
		},
		meta: {
			theme_color: '#93a5d1',
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
