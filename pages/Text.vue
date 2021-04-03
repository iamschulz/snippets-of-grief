<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title>Drauf losschreiben</template>
		</Header>
		<div class="centered">
			<h1>{{ text.callToAction }} über…</h1>
			<Card :cardId="card.id" :index="card.id" :open="true" />
			<details>
				<summary>Du weißt nicht, wie du anfangen sollst?</summary>
				<div v-html="helpText"></div>
			</details>
			<textarea ref="textAreaEl" @input="resize" v-model="userText" autofocus></textarea>

			<transition name="pop-in">
				<NuxtLink v-if="isReady" to="/Finish" class="button">Fertig?</NuxtLink>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from '@/components/Card.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const cards = store.getCards()
		const texts = store.getTexts()
		const isReady = ref(false)
		const userText = ref(store.getUserText())

		watch(userText, (input: String) => {
			store.setUserText(input)
			isReady.value = input.length > 0
		})

		if (store.getActiveCardId() === null) {
			store.setActiveCardId(1)
		}

		if (store.getActiveTextId() === null) {
			store.setActiveTextId(0)
		}

		const card = cards[store.getActiveCardId() - 1 || 0] // todo: use random item
		const text = texts[store.getActiveTextId() || 0] // todo: use random item

		const helpText = computed(() => '<p>' + text.help.replace(/(?:\r\n|\r|\n)/g, '</p><p>') + '</p>')

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
			helpText,
			userText,
			textAreaEl,
			resize,
			isReady,
		}
	},

	components: {
		Card,
	},
})
</script>

<style></style>
