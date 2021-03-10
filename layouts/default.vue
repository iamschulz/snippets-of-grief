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
	unicode-range: U+0020 —007F;
	font-display: fallback;
}

:root {
	--background: rgb(235, 242, 255);
	--contrast: rgb(24, 24, 24);
	--accent: #4f6ba7;
	--accentGradient: linear-gradient(150deg, #4049bb 0%, #4f6ba7 47%, #3da3c2 100%);
	--accentContrast: #fff;
	--font: sans-serif;
	--accentFont: 'Accent', cursive;
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
	font-family: var(--font);
	padding: 1em;
	max-width: 60em;
	margin: auto;
	font-size: 1.2em;
}

.centered {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
}

.cursive {
	font-family: var(--accentFont);
}

.button {
	@extend .cursive;
	background: var(--accentGradient);
	background-color: var(--accent);
	background-position: 100% 100%;
	background-size: 150%;
	color: var(--accentContrast);
	padding: 0.5em 2ch;
	border-radius: 4px;
	text-align: center;
	text-decoration: none;
	font-size: 1.4em;
	transition: background-position 0.2s ease-out;

	&:hover {
		background-position: 0% 0%;
	}
}

textarea {
	background: none;
	width: clamp(300px, 80vw, 80ch);
	min-height: 8em;
	border: 2px solid var(--accent);
	border-image: var(--accentGradient);
	border-image-slice: 1;
	font-size: 1.2rem;
	color: var(--contrast);
	padding: 1ch 0.4em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	@extend .cursive;
	font-weight: normal;
	color: var(--accent);
	background: var(--accentGradient);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
