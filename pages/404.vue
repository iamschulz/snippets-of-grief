<template>
	<div>
		<Header>
			<template v-slot:title> Snippets of Grief </template>
		</Header>
		<div class="root">
			<h2>404</h2>
			Diese Seite wurde nicht gefunden.
			<a href="/" class="button" @click.prevent="onBackClick">Hier gehts zurück</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'

export default defineComponent({
	setup() {
		const router = useRouter()
		const onBackClick = () => {
			if (window.history) router.go(-1)
		}

		return {
			onBackClick,
		}
	},

	components: {
		Header,
	},
})
</script>
