<template lang="html">
	<div class="centered">
		{{ userText }}
		<NuxtLink to="/Cards" class="button">Von vorne anfangen?</NuxtLink>
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
