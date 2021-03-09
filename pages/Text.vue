<template lang="html">
	<div class="centered">
		<h1>{{ text.callToAction }} über…</h1>
		<Card :cardId="card.id" :open="true" />
		<details>
			<summary>Du weißt nicht, wie du anfangen sollst?</summary>
			<p>{{ text.help }}</p>
		</details>
		<textarea ref="textAreaEl" @input="resize" autofocus></textarea>

		<NuxtLink to="/Finish" class="button">Fertig?</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from '@/components/Card.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const cards = store.getCards()
		const texts = store.getTexts()

		if (store.getActiveCardId() === null) {
			store.setActiveCardId(0)
		}

		if (store.getActiveTextId() === null) {
			store.setActiveTextId(0)
		}

		const card = cards[store.getActiveCardId() || 0] // todo: use random item
		const text = texts[store.getActiveTextId() || 0] // todo: use random item

		const textAreaEl = ref(null)
		const resize = () => {
			const textArea = (textAreaEl.value as unknown) as HTMLTextAreaElement

			textArea.style.height = 'auto'
			window.requestAnimationFrame(() => {
				textArea.style.height = `${textArea.scrollHeight + 4}px`
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
