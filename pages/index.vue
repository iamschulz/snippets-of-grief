<template lang="html">
	<div>
		<Header>
			<template v-slot:title> Snippets of Grief </template>
			<template v-slot:icon><AppIcon /></template>
		</Header>
		<div class="root">
			<h2>So funktioniert's:</h2>
			<ol class="content index__instructions">
				<li><CardsIcon /> Karte Ziehen</li>
				<li><DiceIcon /> Textart würfeln</li>
				<li><PenIcon /> Drauf los schreiben</li>
			</ol>
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
import Header from '@/components/Header.vue'
import AppIcon from '@/assets/AppIcon.svg?inline'
import CardsIcon from '@/assets/CardsIcon.svg?inline'
import DiceIcon from '@/assets/DiceIcon.svg?inline'
import PenIcon from '@/assets/PenIcon.svg?inline'
export default {
	components: {
		Header,
		AppIcon,
		CardsIcon,
		DiceIcon,
		PenIcon,
	},
}
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

		svg {
			width: 5.5ch;
			vertical-align: middle;
			margin: 1rem 0.5ch 1rem 0;
		}
	}
}
</style>
