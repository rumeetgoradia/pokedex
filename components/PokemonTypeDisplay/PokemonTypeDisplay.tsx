import { Box } from "@chakra-ui/layout"
import { PokemonType } from "@constants"

type PokemonTypeDisplayProps = {
	pokemonType: PokemonType
}

const PokemonTypeDisplay: React.FC<PokemonTypeDisplayProps> = ({
	pokemonType,
}) => {
	return (
		<Box
			color="white"
			fontWeight="bold"
			textTransform="uppercase"
			textAlign="center"
			fontSize={{ base: "xx-small", sm: "xs" }}
			lineHeight={1}
			w="full"
			px={2}
			py={"3px"}
			bg={`types.${pokemonType.toLowerCase()}.background`}
			borderTop="1px"
			borderBottom="1px"
			borderTopColor={`types.${pokemonType.toLowerCase()}.borderTop`}
			borderBottomColor={`types.${pokemonType.toLowerCase()}.borderBottom`}
			borderRadius="3px"
		>
			{pokemonType}
		</Box>
	)
}

export default PokemonTypeDisplay
