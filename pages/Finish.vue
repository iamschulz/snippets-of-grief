<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title>Weiter machen</template>
		</Header>
		<div class="root">
			<section class="user-text">
				<Card :cardId="cardId" class="user-text__card" />
				<article class="user-text__text">{{ userText }}</article>
			</section>
			<div class="content">
				<h2>Was passiert nach dem Schreiben?</h2>
				<ul>
					<li>Das Schriftstück aufheben</li>
					<li>Zerreißen</li>
					<li>Veröffentichen</li>
					<li>Weiterverarbeiten</li>
				</ul>

				Du könntest zum Beispiel...
				<ul>
					<li>Aus einzelnen Wörtern des Textes ein Gedicht schreiben</li>
					<li>Ein Bild dazu zeichnen</li>
					<li>Den Text auf vorlesen oder singen (Wie fühlt sich das an?)</li>
					<li>Die Persoektive wechseln und eine Reaktion oder eine Antwort darauf verfassen</li>
					<li>Das Schriftstück in einer Collage weiter verarbeiten</li>
				</ul>
			</div>
			<NuxtLink to="/Cards" class="button elevation-1">Von vorne anfangen?</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from '@/components/Card.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const userText = store.getUserText()
		const cardId = store.getActiveCardId()

		return {
			userText,
			cardId,
		}
	},

	components: {
		Card,
	},
})
</script>

<style lang="scss" scoped>
.user-text__text {
	white-space: pre;
}
</style>
