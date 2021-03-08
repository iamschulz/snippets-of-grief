<template>
	<ul class="stack" :style="`--card-count: ${cardCount}`">
		<li
			class="stack__item"
			v-for="(card, index) in allCards"
			:key="card.id"
			:data-is-active="card.id === getActiveId()"
			:style="`--card-index: ${index}`"
			@click="() => onActivate(card.id)"
		>
			<Card :card="card" />
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from './Card.vue'
import { CardType } from '../types/types'

function shuffle(a: any[]) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

export default defineComponent({
	props: {
		content: {
			type: Array as PropType<CardType[]>,
			required: true,
		},
	},

	setup(props) {
		const store = inject('store') as StoreInterface
		const cardCount = props.content.length

		const allCards = shuffle(props.content)
		const getActiveId = () => store.getActiveCardId()
		const onActivate = (id: null | number) => {
			store.setActiveCardId(id)
		}

		return {
			cardCount,
			allCards,
			getActiveId,
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
	width: 520px;

	&__item {
		cursor: pointer;
		position: absolute;
		top: calc(var(--card-index) * 0.25px);
		left: calc(var(--card-index) * 0.5px);
		transition: transform 0.4s ease-out;

		&:not([data-is-active='true']):hover {
			transform: translate(-0.5ch, -3ch);
		}

		&[data-is-active='true'] {
			transform: translate(140%, -1ch);
			cursor: initial;
		}
	}
}
</style>
