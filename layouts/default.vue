<template>
	<div class="wrapper">
		<Nuxt />
		<Footer />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { store } from '@/store/store'
import Footer from '@/components/Footer.vue'

export default defineComponent({
	provide: {
		store,
	},
	components: {
		Footer,
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

$shadowColor: #000;

@mixin elevation($level) {
	box-shadow: 0px ($level * $level * 1px) ($level * $level * 2px) ($level * 1px - 1px) fade-out($shadowColor, 0.86),
		0px 3px (($level - 1) * 5px) (($level - 2) * 2px) fade-out($shadowColor, 0.88),
		0px (($level - 1) * 1.5px) ($level * 2px) (($level - 1) * 1.5px) fade-out($shadowColor, 0.8);
}

@for $i from 1 through 4 {
	.elevation-#{$i} {
		@include elevation($i);
	}
}

:root {
	--background: rgb(235, 242, 255);
	--contrast: rgb(48, 48, 48);
	--accent-red: #cc9aa2;
	--accent-blue: #93a5d1;
	--accent-blend: rgba(174, 165, 206, 1);
	--accent-gradient: linear-gradient(33deg, var(--accent-blue) 0%, var(--accent-blend) 66%, var(--accent-red) 100%);
	--accent-redContrast: #fff;
	--font: sans-serif;
	--accent-redFont: 'Accent', cursive;

	--cardWidth: 11.25rem;
	--cardHeight: 18.125rem;
}

html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif;
	font-size: clamp(1rem, 1.5vw, 1.8rem);
	word-spacing: 0.0625rem;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
	background: var(--accent-blue);
	height: 100%;
	margin: 0;
	padding: 0;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

body {
	position: relative;
	min-height: 100%;
	background: var(--background);
	color: var(--contrast);
	font-family: var(--font);
	margin: 0;
	font-size: 1.2rem;
}

.root {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
	padding: 0 1rem 5rem;
	background: var(--background);

	> * + * {
		margin: 0;
	}
}

.content {
	display: block;
	width: clamp(300px, 80vw, 50ch);
	margin: auto;
	font-size: 1rem;
}

.cursive {
	font-family: var(--accent-redFont);
}

.button {
	@extend .cursive;
	background-color: var(--accent-red);
	background-image: var(--accent-gradient);
	background-position: 100% 100%;
	background-size: 150%;
	color: var(--contrast);
	padding: 0.5em 2ch;
	border: none;
	border-radius: 4px;
	text-align: center;
	text-decoration: none;
	font-size: 1.4rem;
	transition: background-position 0.2s ease-out;
	cursor: pointer;

	&:hover {
		background-position: 0% 0%;
	}
}

textarea {
	background: none;
	min-height: 8em;
	border: 2px solid var(--accent-red);
	border-image-slice: 1;
	font-size: 1.2rem;
	color: var(--contrast);
	padding: 1ch 0.4em;
	font-family: sans-serif;
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

	.root > & {
		line-height: 1.2;
	}
}

hr {
	width: 100%;
	height: 0.3125rem;
	background: var(--accent-gradient);
}

summary {
	cursor: pointer;
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
.pop-in-enter,
.pop-in-leave-to {
	transform: scale(0) rotate(8deg);
	opacity: 0;
	transition: transform 0.2s ease-out, opacity 0.1s ease-out;
}
</style>
