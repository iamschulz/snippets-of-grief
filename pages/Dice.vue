<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title>Würfel eine Textart</template>
		</Header>
		<div class="root">
			<Dice />
			<transition name="pop-in">
				<NuxtLink to="/Text" v-if="isTextSelected()" class="button">Weiter</NuxtLink>
			</transition>
		</div>
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
})
</script>

<style></style>
