import { extendTheme } from "@chakra-ui/react"
import { types } from "./typeColors"

export { default as Fonts } from "./fonts"

const theme = extendTheme({
	styles: {
		global: {
			html: {
				scrollBehavior: "smooth",
			},
			body: {
				scrollBehavior: "smooth",
			},
		},
	},
	colors: {
		types,
		brand: "rgb(52, 146, 110)",
	},
	fonts: {
		heading: "Kissinger JP",
		body: "Kissinger JP",
	},
})

export default theme
