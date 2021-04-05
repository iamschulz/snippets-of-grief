<template>
	<footer class="footer elevation-2">
		<div class="content footer__inner">
			<div class="footer__content">
				<a href="/">Snippets of Grief</a>
				&copy; {{ new Date().getFullYear() }}
				<a href="http://fräulein-schwarz.de" target="_blank" rel="noopener">Wiebke Jahns</a>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	position: absolute;
	bottom: 0;
	z-index: 100;
	background-color: var(--accent-blue);
	background-image: var(--accent-gradient);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 0.5rem;

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(0deg, var(--accent-blue) 0%, rgba(0, 0, 0, 0) 100%);
		z-index: -1;
	}

	&__content {
		font-size: 0.7em;
		text-align: center;
	}

	a {
		color: var(--contrast);
	}
}
</style>
