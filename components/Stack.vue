<template>
	<ul class="stack" :style="`--card-count: ${cardCount}`">
		<li
			class="stack__item"
			v-for="(card, index) in content"
			:key="card.id"
			:data-is-active="card.id === getActiveId()"
			:style="`--card-index: ${index}`"
			@click="() => onActivate(card.id)"
		>
			<Card :cardId="card.id" :key="`${card.id}-${index}`" />
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from './Card.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const content = store.getRandomCards()
		const cardCount = content.length

		const getActiveId = () => store.getActiveCardId()
		const onActivate = (id: null | number) => {
			store.setActiveCardId(id)
		}

		return {
			cardCount,
			content,
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
	--activeTransform: translate(0%, 115%);
	--stackWidth: 200px;
	--stackHeight: 650px;
	position: relative;
	display: flex;
	list-style: none;
	margin-top: 0;
	padding-bottom: 20em;
	width: var(--stackWidth);
	height: var(--stackHeight);

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
			transform: var(--activeTransform);
			cursor: initial;
		}
	}
}

@media (min-aspect-ratio: 1/1) {
	.stack {
		--stackWidth: 520px;
		--stackHeight: 380px;
		--activeTransform: translate(160%, -1ch);
	}
}
</style>
