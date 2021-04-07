<template>
	<div>
		<Header>
			<template v-slot:title>Weiter machen</template>
		</Header>
		<div class="root">
			<section class="user-text" ref="userTextEl">
				<div class="user-text__card">
					<Card v-if="cardId" :cardId="cardId" :open="true" :simple="true" />
				</div>
				<article class="user-text__text">{{ userText }}</article>
			</section>
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
					<li>Die Persoektive wechseln und eine Reaktion oder eine Antwort darauf verfassen</li>
					<li>Das Schriftstück in einer Collage weiter verarbeiten</li>
				</ul>
			</div>
			<button class="button elevation-1" @click.prevent="handleShareClick">Deinen Text speichern</button>
			<NuxtLink to="/" class="button elevation-1">Von vorne anfangen?</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from '@/components/Card.vue'
import * as domToImage from 'dom-to-image'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const userText = store.getUserText()
		const cardId = store.getActiveCardId()
		const userTextEl = ref<HTMLElement | null>(null)

		const shareImage = ref<File | null>(null)

		const convertToImage = (imageString: string): File => {
			return new File([imageString], 'file_name', { type: 'image/jpeg', lastModified: Date.now() })
		}

		const generateImage = (): File | null => {
			if (!userTextEl.value) {
				return null
			}

			// image does not work in safari
			domToImage
				.toJpeg(userTextEl.value, {
					quality: 0.8,
					background: '#ebf2ff',
				})
				.then(function (dataUrl: string) {
					console.log('generated2')
					shareImage.value = convertToImage(dataUrl)
				})
				.catch(function (error: string) {
					console.error('oops, something went wrong!', error)
					return null
				})
			return null
		}

		onMounted(() => {
			generateImage()
		})

		const handleShareClick = (e: Event): void => {
			console.log(e.type, e.isTrusted)
			if (!shareImage.value) {
				console.log('no share image', shareImage)
				return
			}
			if (navigator.canShare && navigator.canShare({ files: [shareImage.value] })) {
				navigator
					.share({
						files: [shareImage.value],
						title: 'test title 2',
						text: 'test text 2',
					})
					.then(() => console.log('Share was successful.'))
					.catch((error) => console.log('Sharing failed', error))
			} else {
				console.log(`Your system doesn't support sharing files.`)
			}
		}

		return {
			userText,
			cardId,
			userTextEl,
			shareImage,
			handleShareClick,
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
	place-items: top center;
	grid-gap: 1rem;
	gap: 1rem;
	padding: 1rem;
	font-size: 1rem;
	background: var(--background);

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
		padding: 1rem 5rem 2rem;
		gap: 3rem;

		.card {
			position: sticky;
			top: 4.375rem;
		}
	}
}
</style>
