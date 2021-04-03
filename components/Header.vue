<template>
	<div class="header" :style="`--header-bg: var(--accent-${color})`">
		<slot name="icon"></slot>
		<h1 class="header__title"><slot name="title"></slot></h1>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'red',
		},
	},
}
</script>

<style lang="scss" scoped>
.header {
	background-color: var(--header-bg);
	display: grid;
	place-items: center;
	width: 100%;
	margin-bottom: 1rem;

	&__title {
		font-size: 1.5rem;
		margin: 0.1em;
		color: white;
	}
}
</style>
