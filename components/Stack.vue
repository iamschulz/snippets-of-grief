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
			<Card :cardId="card.id" :index="index" />
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
	--activeTransform: translate(0%, 140%);
	--stackWidth: 320px;
	--stackHeight: 490px;
	position: relative;
	display: flex;
	list-style: none;
	width: var(--stackWidth);
	height: var(--stackHeight);

	&__item {
		cursor: pointer;
		position: absolute;
		top: calc(var(--card-index) * 0.25px);
		left: calc(var(--card-index) * 0.5px);
		transition: transform 0.4s ease-out;
		height: 11.25rem;
		width: 18.125rem;

		&:not([data-is-active='true']):hover {
			transform: translate(-0.5ch, -3ch);
		}

		&[data-is-active='true'] {
			transform: var(--activeTransform);
			cursor: initial;
			z-index: 999;
		}

		> * {
			top: -55px;
			left: 55px;
		}
	}
}

@media (min-aspect-ratio: 10/7) {
	.stack {
		--stackWidth: 520px;
		--stackHeight: 220px;
		--activeTransform: translate(110%, 1em);
	}
}
</style>
