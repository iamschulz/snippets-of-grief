<template lang="html">
	<div>
		<Header>
			<template v-slot:title>Zieh eine Karte</template>
			<template v-slot:icon><CardsIcon /></template>
		</Header>
		<div class="root">
			<Stack @skip="onSkip" />
			<transition name="pop-in">
				<NuxtLink ref="nextButtonEl" to="/dice" v-if="isCardSelected()" class="button elevation-1"
					>Weiter</NuxtLink
				>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import Stack from '@/components/Stack.vue'
import CardsIcon from '@/assets/CardsIcon.svg?inline'
import { defineComponent, inject, ref, nextTick } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/storeObject/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		store.shuffleCards()
		store.setActiveCardId(null)
		store.setActiveTextId(null)
		store.setUserText(null)
		const isCardSelected = () => store.getActiveCardId() !== null
		const nextButtonEl = ref<HTMLButtonElement | null>(null)

		const onSkip = () => {
			nextTick(() => {
				console.log(nextButtonEl.value)
				nextButtonEl.value?.$el.focus()
			})
		}

		return {
			isCardSelected,
			onSkip,
			nextButtonEl,
		}
	},
	components: {
		Stack,
		CardsIcon,
	},
})
</script>

<style lang="scss" scoped>
.root {
	padding-top: 1.5rem;
}
</style>
