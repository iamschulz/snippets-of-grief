<template lang="html">
	<div class="centered">
		<h1>Würfel eine Textart</h1>
		<Dice />
		<transition name="pop-in">
			<NuxtLink to="/Text" v-if="isTextSelected()" class="button">Weiter</NuxtLink>
		</transition>
	</div>
</template>

<script lang="ts">
import Dice from '../components/Dice.vue'
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		store.setUserText(null)
		const isTextSelected = () => store.getActiveTextId() !== null

		if (store.getActiveCardId === null) {
			store.setActiveCardId(0)
		}

		return {
			isTextSelected,
		}
	},
	components: {
		Dice,
	},

	transition: {
		name: 'page-fade',
		mode: 'in-out',
	},
})
</script>

<style></style>
