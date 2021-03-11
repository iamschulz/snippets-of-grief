<template lang="html">
	<div class="centered">
		<h1>Zieh eine Karte</h1>
		<Stack />
		<transition name="pop-in">
			<NuxtLink to="/dice" v-if="isCardSelected()" class="button">Weiter</NuxtLink>
		</transition>
	</div>
</template>

<script lang="ts">
import Stack from '@/components/Stack.vue'
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		store.shuffleCards()
		store.setActiveCardId(null)
		store.setActiveTextId(null)
		store.setUserText(null)
		const isCardSelected = () => store.getActiveCardId() !== null
		return {
			isCardSelected,
		}
	},
	components: {
		Stack,
	},
	transition: {
		name: 'page-fade',
		mode: 'in-out',
	},
})
</script>

<style></style>
