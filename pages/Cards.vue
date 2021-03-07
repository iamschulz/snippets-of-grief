<template lang="html">
	<div class="centered">
		<h1>Zieh eine Karte</h1>
		<Stack :content="content" />
		<NuxtLink to="/dice" v-if="isCardSelected()" class="button">Weiter</NuxtLink>
	</div>
</template>

<script lang="ts">
import content from '../data/cardsContent.json'
import Stack from '../components/Stack.vue'
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const isCardSelected = () => store.getActiveCardId() !== null
		return {
			content,
			isCardSelected,
		}
	},
	components: {
		Stack,
	},
})
</script>

<style></style>
