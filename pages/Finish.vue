<template lang="html">
	<div>
		<Header>
			<template v-slot:title>Weiter machen</template>
		</Header>
		<div class="root">
			<section class="user-text elevation-4">
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
			<NuxtLink to="/" class="button elevation-1">Von vorne anfangen?</NuxtLink>
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
.user-text {
	display: grid;
	place-items: center;
	grid-gap: 1rem;
	gap: 1rem;
	padding: 1rem;
	background: #d0d8e8;
	border-radius: 0.3125rem;

	&__card {
		margin-top: 2rem;
	}
	&__text {
		margin-top: 1rem;
		white-space: pre-wrap;
	}
}

@media (min-width: 50rem) {
	.user-text {
		grid-template-columns: 15.75rem 1fr;
		padding: 1rem 5rem;
		gap: 3rem;
	}
}
</style>
