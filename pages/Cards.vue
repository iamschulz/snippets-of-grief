<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title>Zieh eine Karte</template>
			<template v-slot:icon><CardsIcon /></template>
		</Header>
		<div class="root">
			<Stack />
			<transition name="pop-in">
				<NuxtLink to="/dice" v-if="isCardSelected()" class="button elevation-1">Weiter</NuxtLink>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import Stack from '@/components/Stack.vue'
import CardsIcon from '@/assets/CardsIcon.svg?inline'
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
		CardsIcon,
	},
})
</script>

<style></style>
