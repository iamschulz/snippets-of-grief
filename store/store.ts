/**
 * Store modeled after https://github.com/Mario-Brendel/Vue3-Tests/tree/store
 */

import { reactive } from '@nuxtjs/composition-api'
import cards from '@/data/cardsContent.json'
import texts from '@/data/texts.json'

export interface Card {
	id: number
	alt: string
	landscape: boolean
}

export interface Text {
	title: string
	callToAction: string
	help: string
}

export interface StoreData {
	cards: Card[]
	texts: Text[]
	activeCardId: null | number
	activeTextId: null | number
	randomIds: number[]
}

export interface StoreInterface {
	getCards: Function
	getCardById: Function
	getRandomIds: Function
	getRandomCards: Function
	getActiveCardId: Function
	setActiveCardId: Function
	getTexts: Function
	getActiveTextId: Function
	setActiveTextId: Function
}

// eslint-disable-next-line @typescript-eslint/ban-types
export class Store {
	protected state: StoreData

	constructor(readonly storeName: string) {
		const data = this.data()
		this.state = reactive(data)
		this.state.randomIds = this.shuffle(this.state.cards.map((x) => x.id))
	}

	//protected abstract data(): T;
	protected data(): StoreData {
		return {
			cards,
			texts,
			activeCardId: null,
			activeTextId: null,
			randomIds: [],
		}
	}

	protected shuffle = (a: any[]) => {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
		}
		return a
	}

	public getCards(): Card[] {
		return this.state.cards
	}

	public getRandomIds(): number[] {
		return this.state.randomIds
	}

	public getRandomCards(): Card[] {
		return this.getRandomIds().map((x) => this.getCardById(x))
	}

	public getCardById(id: number): Card {
		return this.state.cards.filter((x) => x.id === id)[0]
	}

	public getActiveCardId(): null | number {
		return this.state.activeCardId
	}

	public setActiveCardId(id: number): void {
		this.state.activeCardId = id
	}

	public getTexts(): Text[] {
		return this.state.texts
	}

	public getActiveTextId(): null | number {
		return this.state.activeTextId
	}

	public setActiveTextId(id: number): void {
		this.state.activeTextId = id
	}
}

export const store: StoreInterface = new Store('Store')
