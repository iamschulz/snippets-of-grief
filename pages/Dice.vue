<template lang="html">
	<div>
		<p>Würfel eine Textart</p>
		<Dice :content="content" />
		<NuxtLink to="/Text" v-if="isTextSelected()">Weiter</NuxtLink>
	</div>
</template>

<script lang="ts">
import content from '../data/texts.json'
import Dice from '../components/Dice.vue'
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const isTextSelected = () => store.getActiveTextId() !== null

		if (store.getActiveCardId === null) {
			store.setActiveCardId(0)
		}

		return {
			content,
			isTextSelected,
		}
	},
	components: {
		Dice,
	},
})
</script>

<style></style>
