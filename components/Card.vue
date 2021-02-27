<template>
	<article class="card" :data-is-active="isActive">
		<div class="card__content">
			<h2>{{ card.id }}</h2>
			<img :src="`https://picsum.photos/id/${card.id}/80/80`" alt="card.alt" />
		</div>
	</article>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { CardType } from '../types/types'

export default defineComponent({
	props: {
		card: {
			type: Object as PropType<CardType>,
			required: true,
		},
	},

	setup(props) {
		const isActive = ref(false)

		if (props.card.id === 4) {
			isActive.value = true
		}

		return {
			isActive,
		}
	},
})
</script>

<style lang="scss" scoped>
.card {
	--active: 0;
	--border-radius: 5px;
	position: relative;
	display: grid;
	place-items: center;
	width: 20ch;
	height: 15em;
	border-radius: var(--border-radius);
	background-color: #eee;
	transform-style: preserve-3d;
	backface-visibility: hidden;
	transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;

	transform: rotateY(calc(180deg + var(--active) * 180deg)) rotateZ(calc(var(--active) * 4deg))
		translate(calc(var(--active) * 8em), calc(var(--active) * 23em)) scale(calc(1 + var(--active) / 5));

	box-shadow: 0 calc(var(--active) * 0.3em) calc((var(--active) + 0.2) * 1em) 0 rgba(0, 0, 0, 0.5);

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border: 2px solid #888;
		border-radius: var(--border-radius);
		background-color: #ddd;
		background-image: url(https://picsum.photos/180/240);
		z-index: 2;
		backface-visibility: hidden;
		transform: rotateY(180deg);
	}

	&__content {
		position: absolute;
		display: grid;
		place-items: center;
		gap: 1em;
		text-align: center;
		padding: 1em 1ch;
		font-family: sans-serif;
		color: #333;
		pointer-events: all;
		backface-visibility: hidden;

		img {
			border-radius: 50%;
		}
	}

	&[data-is-active='true'] {
		--active: 1;
	}
}
</style>
