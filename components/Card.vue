<template>
	<article class="card" :data-id="card.id" :data-is-active="isActive()" :data-landscape="card.landscape">
		<img
			class="card__content"
			:src="isActive() ? `/cards/1920/card${card.id}.jpg` : ''"
			:data-src="`/cards/1920/card${card.id}.jpg`"
			alt="card.alt"
		/>
	</article>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	props: {
		cardId: {
			type: Number,
			required: true,
		},
		open: {
			type: Boolean,
			default: false,
		},
	},

	setup(props) {
		const store = inject('store') as StoreInterface
		const card = store.getCardById(props.cardId)
		const isActive = (): boolean => {
			return props.open || store.getActiveCardId() === card.id
		}

		return {
			card,
			isActive,
		}
	},
})
</script>

<style lang="scss" scoped>
.card {
	--active: 0;
	--border-radius: 5px;
	--landscape: 0deg;
	position: relative;
	display: grid;
	place-items: center;
	width: 11.25rem;
	height: 18.125rem;
	border-radius: var(--border-radius);
	background-color: #eee;
	transform-style: preserve-3d;
	backface-visibility: hidden;
	transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;

	transform: rotateY(calc(180deg + var(--active) * 180deg)) rotateZ(calc(var(--active) * 4deg))
		rotate(calc(var(--active) * var(--landscape)));

	box-shadow: 0 calc(var(--active) * 0.3em) calc((var(--active) + 0.2) * 1em) 0 rgba(0, 0, 0, 0.5);

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border: 2px solid #888;
		border-radius: var(--border-radius);
		background-color: #ddd;
		background-image: url('/cardCover-1920.jpg');
		background-size: cover;
		background-position: center center;
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
		font-family: sans-serif;
		color: #333;
		pointer-events: all;
		backface-visibility: hidden;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&[data-landscape='true'] {
		--landscape: 90deg;
	}

	&[data-is-active='true'] {
		--active: 1;
	}
}
</style>
