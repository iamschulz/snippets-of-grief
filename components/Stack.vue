<template>
	<ul class="stack" :style="`--card-count: ${cardCount}`">
		<li
			class="stack__item"
			v-for="(card, index) in content"
			:key="card.id"
			:data-is-active="card.id === activeId"
			:style="`--card-index: ${index}`"
			@click="() => onActivate(card.id)"
		>
			<Card :card="card" />
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { store } from '@/store/store'
import Card from './Card.vue'
import { CardType } from '../types/types'

export default defineComponent({
	props: {
		content: {
			type: Array as PropType<CardType[]>,
			required: true,
		},
	},

	provide: {
		store,
	},

	setup(props) {
		const cardCount = props.content.length
		const activeId = store.getActiveCardId()
		const onActivate = (id: null | number) => {
			store.setActiveCardId(id)
		}

		return {
			cardCount,
			activeId,
			onActivate,
		}
	},

	components: {
		Card,
	},
})
</script>

<style lang="scss" scoped>
.stack {
	position: relative;
	display: flex;
	list-style: none;
	margin-top: 0;
	padding-bottom: 20em;

	&__item {
		--active: 0;
		--width: 1em;
		--translateY: 0;
		--rotate: 0deg;
		--rotate: calc(var(--card-count) * -0.5deg - var(--card-index) * -1deg);

		&:not([data-is-active='true']):hover {
			--translateY: -1em;

			&:not(:last-of-type) {
				--width: 2em;
			}
		}

		&[data-is-active='true'] {
			--active: 1;
			--rotate: 0;
			pointer-events: none;
			cursor: initial;
		}

		width: var(--width);
		perspective: 800px;
		transition: transform 0.2s ease-out, width 0.2s ease-out;
		cursor: pointer;
		transform: rotate(var(--rotate)) translateY(var(--translateY));
	}
}
</style>
