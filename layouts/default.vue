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
	--contrast: rgb(48, 48, 48);
	--accent-red: #cc9aa2;
	--accent-blue: #93a5d1;
	--accent-redContrast: #fff;
	--font: sans-serif;
	--accent-redFont: 'Accent', cursive;
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
}

body {
	min-height: 80vh;
	background: var(--background);
	color: var(--contrast);
	font-family: var(--font);
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

	> * + * {
		margin: 0;
	}
}

.cursive {
	font-family: var(--accent-redFont);
}

.button {
	@extend .cursive;
	background-color: var(--accent-red);
	background-position: 100% 100%;
	background-size: 150%;
	color: var(--accent-redContrast);
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
	border: 2px solid var(--accent-red);
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
	padding: 0 0.5ch;
}

.small {
	font-size: 0.8em;
}

.pop-in-enter-active,
.pop-in-leave-active {
	transform: scale(1) rotate(0);
	opacity: 1;
	transition: transform 0.2s cubic-bezier(0.25, 0.47, 0.6, 1.35), opacity 0.1s ease-out;
}
.pop-in-enter, .pop-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
	transform: scale(0) rotate(8deg);
	opacity: 0;
	transition: transform 0.2s ease-out, opacity 0.1s ease-out;
}
</style>
