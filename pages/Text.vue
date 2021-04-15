<template lang="html">
	<div>
		<Header>
			<template v-slot:title>Drauf losschreiben</template>
			<template v-slot:icon><PenIcon /></template>
		</Header>
		<div class="root">
			<h2>{{ text.callToAction }} über…</h2>

			<Card class="text__card" :cardId="card.id" :index="card.id" :open="true" :simple="true" />

			<form>
				<label for="userText" class="small">Schreib deinen Text:</label>
				<textarea class="content" id="userText" ref="textAreaEl" @input="resize" v-model="userText"></textarea>
			</form>

			<transition name="pop-in">
				<NuxtLink v-if="isReady" to="/Finish" class="button elevation-1">Fertig?</NuxtLink>
			</transition>

			<details class="content">
				<summary>Du weißt nicht, wie du anfangen sollst?</summary>
				<div v-html="helpText"></div>
			</details>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/storeObject/store'
import Card from '@/components/Card.vue'
import PenIcon from '@/assets/PenIcon.svg?inline'

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
			const randomCardId = Math.ceil(Math.random() * store.getCards().length)
			store.setActiveCardId(randomCardId)
		}

		if (store.getActiveTextId() === null) {
			const randomTextId = Math.floor(Math.random() * store.getTexts().length)
			store.setActiveTextId(randomTextId)
		}

		const card = cards[store.getActiveCardId() - 1]
		const text = texts[store.getActiveTextId()]

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
		PenIcon,
	},
})
</script>

<style lang="scss">
.text {
	&__card {
		margin-bottom: 1rem;
	}
}
</style>
