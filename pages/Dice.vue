<template lang="html">
	<div>
		<Header>
			<template v-slot:title>Würfel eine Textart</template>
			<template v-slot:icon><DiceIcon /></template>
		</Header>
		<div class="root">
			<Dice class="dice" />
			<transition name="pop-in">
				<NuxtLink to="/Text" v-if="isTextSelected()" class="button elevation-1">Weiter</NuxtLink>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import Dice from '../components/Dice.vue'
import DiceIcon from '@/assets/DiceIcon.svg?inline'
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/storeObject/store'

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
		DiceIcon,
	},
})
</script>

<style lang="scss" scoped>
.dice {
	margin-top: 1rem;
}

.button {
	z-index: 1;
}
</style>
