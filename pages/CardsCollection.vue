<template>
	<div>
		<!-- nuxt img doesn't generate images from sub components yet -->
		<!-- building index manually -->
		<!-- this needs to be the same image as in <Card> -->
		<nuxt-picture
			v-for="(card, index) in cards"
			:key="index"
			format="webp"
			:src="`/cards/card${index + 1}.jpg`"
			sizes="s:190px l:240px"
			:id="`img-${index + 1}`"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import { StoreInterface } from '~/storeObject/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const cards = store.getCards()

		return { cards }
	},
})
</script>
