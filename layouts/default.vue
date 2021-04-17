<template>
	<div class="wrapper">
		<Nuxt />
		<Footer />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { store } from '~/storeObject/store'
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

@font-face {
	font-family: 'Inter';
	src: url('../assets/Inter-Regular.woff2') format('woff2');
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
	--contrast: rgb(60, 60, 60);
	--grey: rgb(109, 109, 109);
	--accent-red: #cc9aa2;
	--accent-blue: #98afe9;
	--accent-blend: rgb(196, 163, 180);
	--accent-gradient: radial-gradient(
		farthest-corner at 100% 100%,
		var(--accent-red) 5%,
		var(--accent-blend) 30%,
		var(--accent-blue) 70%
	);
	--accent-redContrast: #fff;
	--font: sans-serif;
	--accent-redFont: 'Accent', cursive;

	--cardWidth: 11.25rem;
	--cardHeight: 18.125rem;
}

html {
	font-family: 'Inter', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
		Arial, sans-serif;
	font-size: clamp(1rem, 1.5vw, 1.3rem);
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
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
	display: grid;
	justify-content: center;
	align-items: center;
	grid-gap: 1.5em;
	padding: 0 1rem 5rem;
	background: var(--background);

	> * {
		justify-self: center;
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
	background-color: var(--accent-blue);
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

.visually-hidden {
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}

.skip-link {
	&:not(:focus) {
		clip: rect(1px, 1px, 1px, 1px);
		pointer-events: none;
		position: absolute !important;
		height: 1px !important;
		width: 1px !important;
		overflow: hidden;
		padding: 0px !important;
		border-width: 0px !important;
		border-style: initial !important;
		border-color: initial !important;
		border-image: initial !important;
	}
}

textarea {
	background: none;
	min-height: 8em;
	border: 2px solid var(--accent-red);
	border-image-source: var(--accent-gradient);
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
	//@extend .cursive;
	font-weight: normal;
	padding: 0 0.5ch;
	margin-bottom: 0;

	.root > & {
		line-height: 1.2;
	}
}

p,
li,
details {
	letter-spacing: 0.01875rem;
	line-height: 1.4;
}

a,
.link {
	color: inherit;
	background: none;
	border: none;
	font-size: inherit;
	text-decoration: underline;
	cursor: pointer;
	padding: 0;
}

hr {
	width: 100%;
	height: 0.125rem;
	background: var(--accent-gradient);
	border: none;
}

ol {
	li {
		padding-left: 1ch;
		&::marker {
			@extend .cursive;
			font-size: 1.5rem;
			color: var(--accent-red);
		}
	}
}

summary {
	position: relative;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		right: 0;
		bottom: -0.375rem;
		width: calc(100% - 0.225rem);
		height: 0.125rem;
		background: var(--accent-gradient);
	}

	&::marker {
		color: var(--accent-blue);
	}

	+ * {
		position: relative;
		padding-left: 1rem;
		padding-bottom: 0.001rem;

		&::before {
			content: '';
			position: absolute;
			top: -0.625rem;
			left: 0.225rem;
			width: 0.125rem;
			height: calc(100% + 0.625rem);
			background: var(--accent-gradient);
		}
	}
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

// disable pull to refresh when in app mode
@media all and (display-mode: standalone) {
	body {
		overscroll-behavior-y: contain;
	}
}
</style>
