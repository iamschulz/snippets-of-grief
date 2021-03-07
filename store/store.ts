/**
 * Store modeled after https://github.com/Mario-Brendel/Vue3-Tests/tree/store
 */

import { reactive } from '@nuxtjs/composition-api'

export interface StoreData {
	activeCardId: null | number
	activeTextId: null | number
}

export interface StoreInterface {
	getActiveCardId: Function
	setActiveCardId: Function
	getActiveTextId: Function
	setActiveTextId: Function
}

// eslint-disable-next-line @typescript-eslint/ban-types
export class Store {
	protected state: StoreData

	constructor(readonly storeName: string) {
		const data = this.data()
		this.state = reactive(data)
	}

	//protected abstract data(): T;
	protected data(): StoreData {
		return {
			activeCardId: null,
			activeTextId: null,
		}
	}

	public getActiveCardId(): null | number {
		return this.state.activeCardId
	}

	public setActiveCardId(id: null | number): void {
		this.state.activeCardId = id
	}

	public getActiveTextId(): null | number {
		return this.state.activeTextId
	}

	public setActiveTextId(id: null | number): void {
		this.state.activeTextId = id
	}
}

export const store: StoreInterface = new Store('Store')
