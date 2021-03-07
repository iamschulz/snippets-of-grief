<template lang="html">
	<div>
		<p>{{ text.callToAction }} über</p>
		<p>{{ card.content }}</p>
		<textarea></textarea>
	</div>
</template>

<script lang="ts">
import cards from '../data/cardsContent.json'
import texts from '../data/texts.json'
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface

		if (store.getActiveCardId === null) {
			store.setActiveCardId(0)
		}

		if (store.getActiveTextId === null) {
			store.setActiveTextId(0)
		}

		const card = cards[store.getActiveCardId() || 0]
		const text = texts[store.getActiveTextId() || 0]

		return {
			card,
			text,
		}
	},
})
</script>

<style></style>
