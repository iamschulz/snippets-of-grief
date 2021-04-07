declare module '*.svg?inline' {
	import Vue, { VueConstructor } from 'vue'
	const content: VueConstructor<Vue>
	export default content
}

declare module 'dom-to-image' {
	const x: any
	export = x
}

interface ShareData {
	title?: string
	text?: string
	url?: string
	files?: File[]
}

interface Navigator {
	canShare?: (data?: ShareData) => boolean
}
