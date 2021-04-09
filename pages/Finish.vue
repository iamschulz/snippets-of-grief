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
			<button class="button elevation-1" @click.prevent="handleShareClick">Deinen Text teilen</button>
			<NuxtLink to="/" class="button elevation-1">Von vorne anfangen?</NuxtLink>
			<img id="foo" :src="shareImageSrc" alt="foo" width="500" height="500" style="border: 2px solid black" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'
import Card from '@/components/Card.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const userText = store.getUserText()
		const cardId = store.getActiveCardId()
		const card = store.getCardById(cardId)
		const userTextEl = ref<HTMLElement | null>(null)
		const shareImage = ref<File | null>(null)
		const shareImageSrc = ref('')

		const convertToImage = (base64Data: string) => {
			console.log(base64Data)
			const contentType = 'image/jpeg'
			const sliceSize = 1024
			const byteCharacters = atob(base64Data.split(',')[1])
			const bytesLength = byteCharacters.length
			const slicesCount = Math.ceil(bytesLength / sliceSize)
			const byteArrays = new Array(slicesCount)

			for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
				const begin = sliceIndex * sliceSize
				const end = Math.min(begin + sliceSize, bytesLength)

				const bytes = new Array(end - begin)
				for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
					bytes[i] = byteCharacters[offset].charCodeAt(0)
				}
				byteArrays[sliceIndex] = new Uint8Array(bytes)
			}
			const blob = new Blob(byteArrays, { type: contentType })
			return new File([blob], 'snippet-of-grief.jpeg', { type: contentType, lastModified: Date.now() })
		}

		const generateImageFile = async (): Promise<File | null> => {
			const c = document.createElement('canvas')
			c.width = 1920
			c.height = 1920
			const ctx = c.getContext('2d')
			if (!ctx) {
				return null
			}

			ctx.fillStyle = '#ebf2ff'
			ctx.fillRect(0, 0, c.width, c.height)

			ctx.font = '100px Accent'
			ctx.fillStyle = '#000'
			ctx.fillText('Snippets of Grief', 585, 140)

			// create image from card selector
			const image = Array.from(document.images).find((x) => x.className.includes('card__content'))
			if (!image) {
				return null
			}

			image.onload = () => {
				ctx.save()
				if (card.landscape) {
					ctx.rotate(5.3 / Math.PI)
					ctx.translate(100, -1500)
				} else {
					ctx.rotate(-0.25 / Math.PI)
					ctx.translate(0, 240)
				}
				ctx.drawImage(image, 0, 0, 1920, 1920, 20, 20, 1000, 1000)
				ctx.restore()

				// todo: remove shareImageSrc
				shareImageSrc.value = c.toDataURL('image/jpeg')
			}

			// todo: only trigger this when onload is solved
			//return convertToImage(c.toDataURL('image/jpeg'))
			return null
		}

		onMounted(() => {
			generateImageFile()
		})

		const handleShareClick = (): void => {
			if (!shareImage.value) {
				console.log('no share image', shareImage)
				return
			}
			if (navigator.canShare && navigator.canShare({ files: [shareImage.value] })) {
				navigator
					.share({
						files: [shareImage.value],
						title: 'Snippets of Grief',
						text: `${userText.title} zum Thema ${card.alt}`,
						url: `${location.protocol}//${location.host}`,
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
			shareImageSrc,
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
