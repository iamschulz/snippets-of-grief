<template lang="html">
	<div>
		<Header color="blue">
			<template v-slot:title> So funktioniert's </template>
		</Header>
		<div class="centered">
			<h1>Snippets of Grief</h1>
			<div class="index">
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
			</div>
			<NuxtLink to="/Cards" class="button">Schreibritual starten</NuxtLink>
			<div class="index">
				<p>Beim Schreiben geht es nicht darum, ein perfektes Werk abzuliefern. Alles ist erlaubt:</p>

				<ul>
					<li>Experimente mit der Grammatik</li>
					<li>Schreiben am Computer oder auf Papier</li>
					<li>
						Verwenden verschiedener Farben und Formen, unterstreichen, einkreisen, Verbindungslinien, Chaos
					</li>
					<li>Eine Phantasiesprache verwenden</li>
					<li>Die Hand nutzen, welche normalerweise nicht die Schreibhand ist</li>
					<li>
						Kugelschreiber, Pinsel, Bleistift, Füller, Permanentmarker, auf Briefpapier, Notizzettel, einer
						Tafel, Holz
					</li>
					<li>Die Rechtschreibung ist unwichtig.</li>
				</ul>

				<p>Was passiert nach dem Schreiben?</p>

				<ul>
					<li>Das Schriftstück aufheben</li>
					<li>Verbrennen</li>
					<li>Zerreißen</li>
					<li>Veröffentlichen</li>
					<li>Weiterverarbeiten</li>
				</ul>

				<p>Kreativ weiterarbeiten:</p>

				<ul>
					<li>Aus einzelnen Wörtern des Textes ein Gedicht schreiben</li>
					<li>Ein Bild dazu zeichnen</li>
					<li>Den Text laut vorlesen oder singen (Wie fühlt sich das an?)</li>
					<li>Die Perspektive wechseln/eine Reaktion/ einen Antwortbrief formulieren</li>
					<li>Das Schriftstück in einer Collage weiter verarbeiten</li>
				</ul>
			</div>
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
