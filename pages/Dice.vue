<template lang="html">
	<div class="centered">
		<h1>Würfel eine Textart</h1>
		<Dice :content="content" />
		<NuxtLink to="/Text" v-if="isTextSelected()" class="button">Weiter</NuxtLink>
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
