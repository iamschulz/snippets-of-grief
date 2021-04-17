<template lang="html">
	<div>
		<Header>
			<template v-slot:title> Snippets of Grief </template>
			<template v-slot:icon><AppIcon /></template>
		</Header>
		<div class="root">
			<div class="content">
				<h2>So funktioniert's:</h2>
				<ol class="index__instructions">
					<li><CardsIcon :class="inert ? 'inert' : ''" /> Karte ziehen</li>
					<li><DiceIcon :class="inert ? 'inert' : ''" /> Textart würfeln</li>
					<li><PenIcon :class="inert ? 'inert' : ''" /> Drauf los schreiben</li>
				</ol>
			</div>
			<NuxtLink to="/Cards" class="button elevation-1">Schreibritual starten</NuxtLink>
			<details class="content">
				<summary>Mehr Infos?</summary>
				<div>
					<p>Der richtige Zeitpunkt für eine Auszeit mit Stift und Papier ist, wenn...</p>
					<ul>
						<li>sich die Gedanken im Kreis drehen.</li>
						<li>Trauer einen Ausdruck finden soll.</li>
						<li>man loslassen möchte.</li>
						<li>man über etwas mit niemandem reden möchte oder kann.</li>
						<li>man an einem Problem arbeiten möchte.</li>
						<li>man sich von etwas oder jemandem verabschieden möchte.</li>
						<li>man nicht alles sagen konnte, was man jetzt noch gerne sagen würde.</li>
						<li>man seinen Gefühlen und Gedanken auf den Grund gehen möchte.</li>
						<li>man seine Perspektive verändern möchte.</li>
					</ul>
					<p>
						Lass dich von dem Text auf der Karte inspirieren und los geht‘s. Schreib frei heraus, was dir
						dazu in den Kopf kommt.<br />
					</p>
					<p class="small">
						(Die Karten und der Würfel dienen als Inspiration. Wenn partout keine Worte fließen wollen,
						würfel einfach noch einmal, zieh eine neue Karte oder probier es später erneut.)
					</p>
				</div>
			</details>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'
import AppIcon from '@/assets/AppIcon.svg?inline'
import CardsIcon from '@/assets/CardsIcon.svg?inline'
import DiceIcon from '@/assets/DiceIcon.svg?inline'
import PenIcon from '@/assets/PenIcon.svg?inline'

export default defineComponent({
	setup() {
		const inert = ref(true)

		onMounted(() => {
			inert.value = false
		})

		return {
			inert,
		}
	},
	components: {
		Header,
		AppIcon,
		CardsIcon,
		DiceIcon,
		PenIcon,
	},
})
</script>

<style lang="scss" scoped>
.index {
	max-width: MIN(90vw, 60ch);
	margin: auto;

	> * {
		width: 100%;
	}

	&__instructions {
		max-width: 30ch;

		li {
			&:nth-of-type(1) {
				--delay: 0.4s;
			}
			&:nth-of-type(2) {
				--delay: 0.7s;
			}
			&:nth-of-type(3) {
				--delay: 1s;
			}
		}

		svg {
			width: 5.5ch;
			vertical-align: middle;
			margin: 1rem 0.5ch 1rem 0;

			* {
				transition-delay: var(--delay);
			}
		}
	}
}

.cardsIcon {
	* {
		transition: transform 0.35s cubic-bezier(0.25, 0.47, 0.3, 2), fill 0.25s ease-out;
	}

	.animated-card {
		transform: translateY(10px);
	}

	&.inert {
		.animated-card {
			fill: white;
			transform: translateY(40px);
		}
	}
}

.diceIcon {
	perspective: 800px;

	* {
		transition: transform 0.3s cubic-bezier(0.25, 0.47, 0.3, 2.5), fill 0.2s ease-out;
	}

	.animated-dice {
		transform-origin: center 40px;
		transform: scale(0.91);
	}

	&.inert {
		.animated-dice {
			transform: translateY(20px) rotateX(-21deg) rotateY(10deg) scale(0.8);
		}

		.animated-face {
			transform: translateY(-20px) scaleY(1.4);

			+ rect {
				fill: white;
			}
		}
	}
}

.penIcon {
	* {
		transition: transform 0.4s ease-out, clip-path 0.4s ease-out;
	}

	.animated-pen {
		transform-origin: top right;
	}

	.animated-line {
		clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
	}

	&.inert {
		.animated-pen {
			transform: translate(-41px, 4px) rotate(7deg);
		}

		.animated-line {
			clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
		}
	}
}
</style>
