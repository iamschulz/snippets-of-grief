<template>
	<footer class="footer">
		<div class="content footer__inner">
			<div class="footer__content">
				<a href="/">Snippets of Grief</a>
				&copy; {{ new Date().getFullYear() }}
				<a href="http://fräulein-schwarz.de" target="_blank" rel="noopener">Wiebke Jahns</a>
				<!-- todo: &bull; <a href="">App installieren</a> -->
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	position: absolute;
	bottom: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 0.5rem 1rem 1rem;
	color: var(--grey);

	&__content {
		font-size: 0.7em;
		text-align: center;
	}

	a {
		color: inherit;
	}
}
</style>
