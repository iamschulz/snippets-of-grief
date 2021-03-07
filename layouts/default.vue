<template>
	<div>
		<Nuxt />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { store } from '@/store/store'

export default defineComponent({
	provide: {
		store,
	},
})
</script>

<style lang="scss">
@font-face {
	font-family: 'Accent';
	src: url('../assets/Pacifico-Regular.woff2') format('woff2');
}

:root {
	--background: #eee;
	--contrast: #222;
	--accent: #ff9900;
	--accentGradient: linear-gradient(135deg, #fc7a53 0%, #ff9900 47%, #eef11c 100%);
	--accentContrast: #222;
}

html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
}

body {
	min-height: 80vh;
	background: var(--background);
	color: var(--contrast);
	font-family: sans-serif;
	padding: 1em;
	max-width: 60em;
	margin: auto;
}

.centered {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
}

.cursive {
	font-family: 'Accent';
}

.button {
	@extend .cursive;
	background: var(--accentGradient);
	background-color: var(--accent);
	color: var(--accentContrast);
	padding: 0.5em 2ch;
	border-radius: 4px;
	text-decoration: none;
	font-size: 1.4em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	@extend .cursive;
}
</style>
