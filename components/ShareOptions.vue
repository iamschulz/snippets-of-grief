<template>
	<div class="share-options">
		<button v-if="canFileShare" class="button elevation-1" @click.prevent="handleShareFileClick">
			Deinen Text teilen
		</button>
		<button v-else-if="canShare" class="button elevation-1">Deinen Text teilen</button>
		<button v-if="!canFileShare" download class="button elevation-1" @click.prevent="handleDownloadClick">
			Text Herunterladen
		</button>
		<ShareImage />
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import { StoreInterface } from '@/store/store'
import ShareImage from '@/components/ShareImage.vue'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const texts = store.getTexts()
		const text = texts[store.getActiveTextId() || 0]
		const userText = store.getUserText()
		const cardId = store.getActiveCardId()
		const card = store.getCardById(cardId)
		const shareTitle = 'Snippets of Grief'
		const shareText = `${card.alt} - ${text.title}:\n#SnippetsOfGrief\n\n${userText}`

		const canShare = navigator.canShare
		const canFileShare =
			navigator.canShare &&
			navigator.canShare({
				files: [new File([], 'image.jpeg', { type: 'image/jpeg' })],
			})

		const handleShareFileClick = (): void => {
			const shareImage = store.getShareImage()
			if (!shareImage) {
				console.warn('no share image', shareImage)
				handleShareClick()
				return
			}

			navigator
				.share({
					files: [shareImage],
					title: shareTitle,
					text: shareText,
					url: `${location.protocol}//${location.host}`,
				})
				.catch((error) => console.error('Sharing File failed', error))
		}

		const handleShareClick = (): void => {
			navigator
				.share({
					title: shareTitle,
					text: shareText,
					url: `${location.protocol}//${location.host}`,
				})
				.catch((error) => console.error('Sharing failed', error))
		}

		const handleDownloadClick = (): void => {
			const shareImage = store.getShareImage()
			const a = document.createElement('a')
			const url = URL.createObjectURL(shareImage)

			a.href = url
			a.download = 'Snippets of Grief.jpg'
			document.body.appendChild(a)
			a.click()

			setTimeout(function () {
				document.body.removeChild(a)
				window.URL.revokeObjectURL(url)
			}, 0)
		}

		return {
			canShare,
			canFileShare,
			handleShareFileClick,
			handleShareClick,
			handleDownloadClick,
		}
	},
	components: {
		ShareImage,
	},
})
</script>

<style lang="scss" scoped>
.share-options {
	width: 100%;
	text-align: center;

	> * {
		display: inline-block;

		+ * {
			margin-left: 1rem;
		}
	}
}
</style>
