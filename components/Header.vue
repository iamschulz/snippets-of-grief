<template>
	<div class="header elevation-2">
		<div class="header__icon">
			<slot name="icon"></slot>
		</div>
		<h1 class="header__title">
			<slot name="title"></slot>
		</h1>
	</div>
</template>

<style lang="scss" scoped>
.header {
	position: sticky;
	top: 0;
	z-index: 100;
	background-color: var(--accent-blue);
	background-image: var(--accent-gradient);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 1rem;

	&__icon {
		width: 2em;
		height: 2em;
		display: grid;
		place-items: center;

		&:empty {
			display: none;
		}

		svg {
			width: 100%;
			height: 100%;
		}
	}

	&__title {
		font-size: 1.5rem;
		margin: 0.1em;
		color: var(--contrast);

		&:empty {
			display: none;
		}
	}
}
</style>
