import { extendTheme } from "@chakra-ui/react"
import { types } from "./typeColors"

export type TypeColor = {
	background: string
	borderTop: string
	borderBottom: string
}

const theme = extendTheme({
	colors: {
		types,
	},
	fonts: {
		heading: "Kissinger JP",
		body: "Kissinger JP",
	},
})

export default theme

export { default as Fonts } from "./fonts"
