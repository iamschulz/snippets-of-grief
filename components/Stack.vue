<template>
	<ul class="stack">
		<li
			v-for="card in content"
			:key="card.id"
			class="stack__item"
			:data-is-active="card.id === activeId"
			@click="() => onActivate(card.id)"
		>
			<Card :card="card" />
		</li>
	</ul>
</template>

<script lang="ts">
import { ref } from '@nuxtjs/composition-api'
import Card from './Card.vue'

export default {
	props: {
		content: {
			type: Array,
			required: true,
		},
	},

	setup(props) {
		const cardCount = props.content.length
		const activeId = ref(cardCount - 1)
		const onActivate = (id: number) => {
			activeId.value = id
			console.log(id)
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
}
</script>

<style lang="scss" scoped>
.stack {
	position: relative;
	display: flex;
	list-style: none;
	margin-top: 0;

	&__item {
		--active: 0;
		--width: 1em;
		--translateY: 0;
		--rotate: 0deg;
		//--rotate: #{($cardsAmount * -0.5deg) - ($i * -1deg)};

		&:hover {
			--translateY: -1em;

			&:not(:last-of-type) {
				--width: 2em;
			}
		}

		[data-is-active='true'] {
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
