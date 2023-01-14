<template>
	<footer class="footer">
		<div class="content footer__inner">
			<div class="footer__content">
				<a href="/">Snippets of Grief</a>
				&copy; {{ new Date().getFullYear() }} Wiebke Jahns & <a href="https://iamschulz.com">Daniel Schulz</a>
				<template v-if="showInstallPromotion">
					&bull; <button class="link" @click="onInstallClick">App installieren</button>
				</template>
			</div>
		</div>
	</footer>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'

export default defineComponent({
	setup() {
		/*
		custom a2hs via https://web.dev/customize-install/#how-to-provide-your-own-in-app-install-experience
		*/

		const showInstallPromotion = ref(false)
		let deferredPrompt

		const onInstallClick = async () => {
			// Hide the app provided install promotion
			showInstallPromotion.value = false
			// Show the install prompt
			deferredPrompt.prompt()
			// Wait for the user to respond to the prompt
			await deferredPrompt.userChoice
			// We've used the prompt, and can't use it again, throw it away
			deferredPrompt = null
		}

		onMounted(() => {
			window.addEventListener('beforeinstallprompt', (e) => {
				// Prevent the mini-infobar from appearing on mobile
				e.preventDefault()
				// Stash the event so it can be triggered later.
				deferredPrompt = e
				// Update UI notify the user they can install the PWA
				showInstallPromotion.value = true
			})
		})

		return {
			onInstallClick,
			showInstallPromotion,
		}
	},
})
</script>

<style lang="scss" scoped>
.footer {
	position: absolute;
	bottom: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 0.5rem 1rem 1rem;
	color: var(--grey);

	&__content {
		font-size: 0.7em;
		text-align: center;
	}

	a {
		color: inherit;
	}
}
</style>
