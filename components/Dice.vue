<template>
	<div class="dice" :data-value="diceValue" ref="diceEL" @click="rollDice" tabindex="0">
		<div class="dice__object">
			<span v-for="(side, index) in content" :key="index" class="dice__face" :data-side="`dice-${index + 1}`">
				{{ side.title }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import { StoreInterface } from '@/store/store'

export default defineComponent({
	setup() {
		const store = inject('store') as StoreInterface
		const content = store.getTexts()
		const diceValue = ref(0)
		const diceEL = ref<HTMLElement | null>(null)
		const rollDice = () => {
			diceValue.value = Math.ceil(Math.random() * 6)

			diceEL.value?.setAttribute('data-rolling', 'start')
			setTimeout(() => {
				diceEL.value?.setAttribute('data-rolling', 'rolling')
				setTimeout(() => {
					diceEL.value?.removeAttribute('data-rolling')
					store.setActiveTextId(diceValue.value - 1)
				}, 2000)
			}, 1000)
		}

		return {
			content,
			diceEL,
			diceValue,
			rollDice,
		}
	},
})
</script>

<style lang="scss" scoped>
.dice {
	--diceWidth: clamp(9.375rem, 50vw, 10rem);

	&::before {
		content: '';
		display: block;
		position: absolute;
		width: 0px;
		height: 0px;
		box-shadow: 0 0 10.9375rem 7rem rgba(0, 0, 0, 0.4);
		transform: translate3D(0.625rem, 6.25rem, 0) rotateX(90deg);
	}

	width: 0;
	padding: var(--diceWidth);
	padding-top: calc(var(--diceWidth) - 3rem);
	padding-left: calc(var(--diceWidth) + 2rem);
	perspective: 800px;
	perspective-origin: 0 0;

	&__input {
		display: none;
		transform: translateY(-10rem);
	}

	&__object {
		--rotateX: -25deg;
		--rotateY: 300deg;
		position: relative;
		width: var(--diceWidth);
		margin-left: calc(var(--diceWidth) / -8);
		transform-style: preserve-3d;
		transform: translateX(calc(var(--diceWidth) / 2)) rotateX(var(--rotateX)) rotateY(var(--rotateY));
		transform: translateX(calc(var(--diceWidth) / -2)) rotateX(var(--rotateX)) rotateY(var(--rotateY));

		.dice[data-rolling='start'] & {
			transition: transform 1s ease-in;
			--rotateX: 1080deg;
			--rotateY: 900deg;
		}

		.dice[data-rolling='rolling'] & {
			transition: transform 2s cubic-bezier(0.25, 0.47, 0.6, 1.15);
		}

		.dice:not([data-rolling]) & {
			transition: transform 1s cubic-bezier(0.8, 0.06, 0.63, 1.45);
		}

		.dice[data-value='1']:not([data-rolling='start']) & {
			--rotateX: 0deg;
			--rotateY: 180deg;
		}

		.dice[data-value='2']:not([data-rolling='start']) & {
			--rotateX: 90deg;
			--rotateY: 180deg;
		}

		.dice[data-value='3']:not([data-rolling='start']) & {
			--rotateX: 0deg;
			--rotateY: 90deg;
		}

		.dice[data-value='4']:not([data-rolling='start']) & {
			--rotateX: 0deg;
			--rotateY: -90deg;
		}

		.dice[data-value='5']:not([data-rolling='start']) & {
			--rotateX: -90deg;
			--rotateY: 180deg;
		}

		.dice[data-value='6']:not([data-rolling='start']) & {
			--rotateX: 0deg;
			--rotateY: 0deg;
		}
	}

	&__face {
		position: absolute;
		display: grid;
		place-items: center;
		width: var(--diceWidth);
		height: var(--diceWidth);
		border-radius: 0.3125rem;
		background: #fff;
		box-shadow: inset 0 0 1.875rem rgba(125, 125, 125, 0.8);
		font-size: 1.8rem;
		text-align: center;
		color: #000;
	}

	//back
	&__face[data-side='dice-1'] {
		transform: translateZ(calc(var(--diceWidth) / -2)) translateY(calc(var(--diceWidth) / -2)) rotateY(180deg);
	}
	//right
	&__face[data-side='dice-4'] {
		transform: rotateY(-270deg) translateX(calc(var(--diceWidth) / 2)) translateY(calc(var(--diceWidth) / -2));
		transform-origin: top right;
	}
	//left
	&__face[data-side='dice-3'] {
		transform: rotateY(270deg) translateX(calc(var(--diceWidth) / -2)) translateY(calc(var(--diceWidth) / -2));
		transform-origin: center left;
	}
	//top
	&__face[data-side='dice-5'] {
		transform: rotateX(-90deg) translateY(calc(var(--diceWidth) / -2)) translateZ(calc(var(--diceWidth) / -2))
			scaleX(-1);
		transform-origin: top center;
	}
	//bottom
	&__face[data-side='dice-2'] {
		transform: rotateX(90deg) translateY(calc(var(--diceWidth) / 2)) translateZ(calc(var(--diceWidth) / 2))
			scaleX(-1);
		transform-origin: bottom center;
	}
	//front
	&__face[data-side='dice-6'] {
		transform: translateZ(calc(var(--diceWidth) / 2)) translateY(calc(var(--diceWidth) / -2));
	}
}
</style>
