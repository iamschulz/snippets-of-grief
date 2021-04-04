<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title> So funktioniert's </template>
		</Header>
		<div class="root">
			<NuxtLink to="/Cards" class="button">Schreibritual starten</NuxtLink>
			<details class="content">
				<summary>Mehr Infos?</summary>
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
					Lass dich von dem Text auf der Karte inspirieren und los geht‘s. Schreib frei heraus, was dir dazu
					in den Kopf kommt.<br />
				</p>
				<p class="small">
					(Die Karten und der Würfel dienen als Inspiration. Wenn partout keine Worte fließen wollen, würfel
					einfach noch einmal, zieh eine neue Karte oder probier es später erneut.)
				</p>
			</details>
		</div>
	</div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
	components: {
		Header,
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
}
</style>
