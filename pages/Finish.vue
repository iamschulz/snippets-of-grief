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

			<button v-if="canFileShare" class="button elevation-1" @click.prevent="handleShareFileClick">
				Deinen Text teilen
			</button>
			<button v-else-if="canShare" class="button elevation-1">Deinen Text teilen</button>
			<a v-if="!canFileShare" href="" download class="button elevation-1">Text Herunterladen</a>

			<NuxtLink to="/" class="button elevation-1">Von vorne anfangen?</NuxtLink>
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
		const texts = store.getTexts()
		const text = texts[store.getActiveTextId() || 0]
		const userTextEl = ref<HTMLElement | null>(null)
		const shareImage = ref<File | null>(null)
		const canShare = navigator.canShare
		const canFileShare =
			navigator.canShare &&
			navigator.canShare({
				files: [new File([], 'image.jpeg', { type: 'image/jpeg' })],
			})

		console.log('foo', card)

		const wrapText = async (
			ctx: CanvasRenderingContext2D,
			text: string,
			x: number,
			y: number,
			width: number,
			lineHeight: number
		): Promise<{
			width: number
			maxWidth: number
			height: number
		}> => {
			ctx.font = '50px Arial'
			var lines = text.split('\n')
			let lineCount = lines.length
			let maxWidth = 0

			for (var i = 0; i < lines.length; i++) {
				var words = lines[i].split(' ')
				var line = ''

				for (var n = 0; n < words.length; n++) {
					var testLine = line + words[n] + ' '
					var metrics = ctx.measureText(testLine)
					var testWidth = metrics.width
					if (testWidth > width && n > 0) {
						ctx.fillText(line, x, y)
						line = words[n] + ' '
						y += lineHeight
						lineCount += 1
					} else {
						line = testLine
						maxWidth = testWidth > maxWidth ? testWidth : maxWidth
					}
				}

				ctx.fillText(line, x, y)
				y += lineHeight
			}

			return {
				width,
				maxWidth,
				height: lineHeight * lineCount,
			}
		}

		const convertToImage = (base64Data: string): File => {
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
			c.height = 1280
			const ctx = c.getContext('2d')
			if (!ctx) {
				return null
			}

			const textX = card.landscape ? 40 : 800
			const textY = card.landscape ? 1000 : 300
			const textWidth = card.landscape ? 1840 : 1080

			// set height
			const textMeasurements = await wrapText(ctx, userText, textX, textY, textWidth, 80)
			c.height = c.height < textMeasurements.height + textY ? textMeasurements.height + textY : c.height

			const textOffset = card.landscape ? c.width / 2 - textMeasurements.maxWidth / 2 : 800

			// add background
			ctx.fillStyle = '#ebf2ff'
			ctx.fillRect(0, 0, c.width, c.height)

			// add title
			ctx.font = '100px Accent'
			ctx.fillStyle = '#000'
			ctx.fillText('Snippets of Grief', 585, 140)

			// add image to canvas
			const loadImage = (url: string): Promise<void> => {
				return new Promise((resolve) => {
					const image = new Image()
					image.addEventListener('load', () => {
						drawCardImage(image)
						resolve()
					})
					image.src = url
				})
			}

			const drawCardImage = (image: HTMLImageElement) => {
				ctx.save()
				if (card.landscape) {
					ctx.rotate(5.3 / Math.PI)
					ctx.translate(120, -1500)
				} else {
					ctx.rotate(-0.25 / Math.PI)
					ctx.translate(0, 240)
				}

				// drop shadow
				ctx.shadowOffsetX = 5
				ctx.shadowOffsetY = 5
				ctx.shadowBlur = 15
				ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'

				// go for it
				ctx.drawImage(image, 0, 0, 1920, 1920, 20, 20, 1000, 1000)
				ctx.restore()
			}

			// add user text
			const onWrapText = wrapText(ctx, userText, textOffset, textY, textWidth, 80)
			const onImageLoad = loadImage(`/cards/1920/card${cardId}.jpg`)

			await Promise.all([onImageLoad, onWrapText]).then(() => {
				shareImage.value = convertToImage(c.toDataURL('image/jpeg'))
			})

			return null
		}

		onMounted(() => {
			generateImageFile()
		})

		const handleShareFileClick = (): void => {
			if (!shareImage.value) {
				console.warn('no share image', shareImage)
				handleShareClick()
				return
			}

			navigator
				.share({
					files: [shareImage.value],
					title: 'Snippets of Grief',
					text: `${text.title} zum Thema ${card.alt}`,
					url: `${location.protocol}//${location.host}`,
				})
				.catch((error) => console.error('Sharing File failed', error))
		}

		const handleShareClick = (): void => {
			navigator
				.share({
					title: 'Snippets of Grief',
					text: `${text.title} zum Thema ${card.alt}:\n\n${userText}`,
					url: `${location.protocol}//${location.host}`,
				})
				.catch((error) => console.error('Sharing failed', error))
		}

		const handleDownloadClick = (): void => {
			// todo: this
			// window.saveAs(blob, filename)
		}

		return {
			userText,
			cardId,
			userTextEl,
			canShare,
			canFileShare,
			shareImage,
			handleShareFileClick,
			handleShareClick,
			handleDownloadClick,
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
		display: grid;
		align-items: center;
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
