<template>
	<div>
		<Header>
			<template v-slot:title>Weiter machen</template>
		</Header>
		<div class="root">
			<ClientOnly>
				<section class="user-text" ref="userTextEl">
					<div class="user-text__card">
						<Card v-if="cardId" :cardId="cardId" :open="true" :simple="true" />
					</div>
					<article class="user-text__text">{{ userText }}</article>
				</section>
			</ClientOnly>
			<hr />
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
					<li>Die Perspektive wechseln und eine Reaktion oder eine Antwort darauf verfassen</li>
					<li>Das Schriftstück in einer Collage weiter verarbeiten</li>
				</ul>
			</div>

			<ClientOnly>
				<ShareOptions />
			</ClientOnly>
			<NuxtLink to="/" class="small user-text__retry">Von vorne anfangen?</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, nextTick } from '@nuxtjs/composition-api'
import { StoreInterface } from '~/storeObject/store'
import Card from '@/components/Card.vue'
import ShareOptions from '@/components/ShareOptions.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const userText = store.getUserText()
		const cardId = store.getActiveCardId()
		const texts = store.getTexts()
		const text = texts[store.getActiveTextId() || 0]

		nextTick(() => {
			if (process.browser && (!cardId || !store.getActiveTextId() || !userText)) {
				window.location.href = '/'
			}
		})

		const userTextEl = ref<HTMLElement | null>(null)

		return {
			userText,
			cardId,
			userTextEl,
			text,
		}
	},

	components: {
		Card,
		ShareOptions,
	},
})
</script>

<style lang="scss" scoped>
.user-text {
	display: grid;
	place-items: top center;
	grid-gap: 1rem;
	padding: 1rem;
	font-size: 1rem;
	background: var(--background);

	&__card {
		margin-top: 2rem;
	}

	&__text {
		margin-top: 1rem;
		display: grid;
		align-items: center;
		white-space: pre-wrap;
	}

	&__retry {
		display: inline-block;
		width: 10rem;
		text-align: center;
	}
}

@media (min-width: 50rem) {
	.user-text {
		grid-template-columns: 15.75rem 1fr;
		padding: 1rem 5rem 2rem;
		grid-gap: 3rem;

		&__card {
			position: sticky;
			top: 4.375rem;
		}
	}
}
</style>
