<template>
	<article
		class="card"
		:data-id="card.id"
		:data-index="index"
		:data-is-active="isActive()"
		:data-landscape="card.landscape"
	>
		<img
			class="card__content"
			:src="isActive() ? `/cards/1920/card${card.id}.jpg` : '#'"
			:data-src="`/cards/1920/card${card.id}.jpg`"
			alt="card.alt"
		/>
	</article>
</template>

<script lang="ts">
import { defineComponent, inject, computed, onMounted, ref } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	props: {
		cardId: {
			type: Number,
			required: true,
		},
		index: {
			type: Number,
		},
		open: {
			type: Boolean,
			default: false,
		},
	},

	setup(props) {
		const store = inject('store') as StoreInterface
		const id = ref(1)
		let card = computed(() => store.getCardById(id.value))
		const isActive = (): boolean => {
			return props.open || store.getActiveCardId() === card.value.id
		}

		onMounted(() => {
			if (process.browser) {
				id.value = props.cardId
			}
		})

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
	box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.14), 0 3px 5px 0 rgba(0, 0, 0, 0.12), 0 1.5px 4px 1.5px rgba(0, 0, 0, 0.2);
	transform-style: preserve-3d;
	backface-visibility: hidden;
	transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;

	--rotateY: calc(180deg + var(--active) * 180deg);
	--rotateZ: calc(var(--active) * 4deg + (1 - var(--active)) * 90deg);
	--rotate: calc(var(--active) * var(--landscape));
	transform: rotateY(var(--rotateY)) rotateZ(var(--rotateZ)) rotate(var(--rotate));

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
		transition: opacity 0.5s ease-out;

		&[src=''],
		&[src='#'],
		&:not([src]) {
			opacity: 0;
		}
	}

	&[data-landscape='true'] {
		--landscape: 90deg;
	}

	&[data-is-active='true'] {
		--active: 1;
	}
}
</style>
