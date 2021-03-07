<template lang="html">
	<div>
		<Stack :content="cont" />
		<Dice />
	</div>
</template>

<script>
import * as content from '../data/cardsContent.json'
import Stack from '../components/Stack.vue'
import Dice from '../components/Dice.vue'

export default {
	setup() {
		const cont = content.default
		return { cont }
	},
	components: {
		Stack,
		Dice,
	},
}
</script>

<style></style>
