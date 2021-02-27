<template lang="html">
	<div>
		<Stack :content="cont" />
	</div>
</template>

<script>
import * as content from '../data/cardsContent.json'
import Stack from '../components/Stack.vue'

export default {
	setup() {
		const cont = content.default
		return { cont }
	},
	components: {
		Stack,
	},
}
</script>

<style></style>
