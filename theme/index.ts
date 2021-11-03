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
})

export default theme
