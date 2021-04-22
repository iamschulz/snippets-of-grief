<template>
	<div>
		<a :href="`#card-${content.length - 1}`" class="skip-link small stack__skip">Zur letzten Karte springen</a>
		<ul class="stack" :style="`--card-count: ${cardCount}`">
			<div class="stack__shadow elevation-2"></div>
			<li
				class="stack__item"
				v-for="(card, index) in content"
				:key="card.id"
				:id="`card-${index}`"
				:data-is-active="card.id === getActiveId()"
				:style="`--card-index: ${index}`"
				@click="(e) => onActivate(e, card.id)"
				@keydown.enter="(e) => onActivate(e, card.id)"
				@keydown.space="(e) => onActivate(e, card.id)"
				:tabindex="card.id === getActiveId() ? -1 : 0"
			>
				<Card :cardId="card.id" :index="index" :lazyLoad="index !== content.length - 1" />
			</li>
		</ul>
		<span aria-live="polite" class="visually-hidden">
			<span v-if="activeCard && activeCard.alt"> Aktive Karte: {{ activeCard.alt }} </span>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import { StoreInterface, Card as CardType } from '~/storeObject/store'
import Card from './Card.vue'
// todo: focus next button on stack draw

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const content = store.getRandomCards()
		const cardCount = content.length

		const getActiveId = () => store.getActiveCardId()
		const onActivate = (e: Event, id: null | number) => {
			;(e.target as HTMLElement).blur()
			store.setActiveCardId(id)
		}

		const activeCard = ref<CardType>(store.getCardById(getActiveId()))

		return {
			cardCount,
			content,
			getActiveId,
			activeCard,
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
	--stackWidth: 20rem;
	--stackHeight: 30.625rem;
	position: relative;
	display: flex;
	list-style: none;
	width: var(--stackWidth);
	height: var(--stackHeight);

	&__skip {
		position: absolute;
		margin-top: -1rem;
	}

	&__shadow {
		position: absolute;
		width: var(--cardWidth);
		height: var(--cardHeight);
		transform: rotate(90deg);
		top: -3.4375rem;
		left: 3.4375rem;
		border-radius: 5px;
	}

	&__item {
		cursor: pointer;
		position: absolute;
		top: calc(var(--card-index) * 0.25px);
		left: calc(var(--card-index) * 0.5px);
		transition: transform 0.4s ease-out;
		height: 11.25rem;
		width: 18.125rem;
		transform: translate(0, 0);

		&:focus {
			outline: none;
		}
		&:focus-visible {
			outline: 1px dotted #212121;
			outline: 5px auto -webkit-focus-ring-color;
		}

		&:not([data-is-active='true']):hover {
			transform: translate(-0.5ch, -3ch);
		}

		&[data-is-active='true'] {
			transform: var(--activeTransform);
			cursor: initial;
			z-index: 999;
		}

		> * {
			top: -3.4375rem;
			left: 3.4375rem;
		}
	}
}

@media (min-aspect-ratio: 10/7) {
	.stack {
		--stackWidth: 32.5rem;
		--stackHeight: 13.75rem;
		--activeTransform: translate(110%, 1em);
	}
}
</style>
