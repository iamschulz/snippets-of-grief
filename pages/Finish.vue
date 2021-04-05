<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title>Finish</template>
		</Header>
		<div class="root">
			{{ userText }}
			<NuxtLink to="/Cards" class="button elevation-1">Von vorne anfangen?</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const userText = store.getUserText()

		return {
			userText,
		}
	},
})
</script>

<style></style>
