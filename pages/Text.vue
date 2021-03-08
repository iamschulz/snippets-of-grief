<template lang="html">
	<div class="centered">
		<h1>{{ text.callToAction }} über…</h1>
		<Card :card="card" :open="true" />
		<details>
			<summary>Du weißt nicht, wie du anfangen sollst?</summary>
			<p>{{ text.help }}</p>
		</details>
		<textarea ref="textAreaEl" @input="resize"></textarea>

		<NuxtLink to="/Cards" class="button">Von vorne anfangen?</NuxtLink>
	</div>
</template>

<script lang="ts">
import cards from '../data/cardsContent.json'
import texts from '../data/texts.json'
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from '@/components/Card.vue'

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

		const textAreaEl = ref(null)
		const resize = () => {
			const textArea = (textAreaEl.value as unknown) as HTMLTextAreaElement

			textArea.style.height = 'auto'
			window.requestAnimationFrame(() => {
				textArea.style.height = `${textArea.scrollHeight}px`
			})
		}

		return {
			card,
			text,
			textAreaEl,
			resize,
		}
	},

	components: {
		Card,
	},
})
</script>

<style></style>
