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
			fontSize="xs"
			lineHeight={1}
			w="full"
			px={2}
			py={"3px"}
			bg={`types.${pokemonType}.background`}
			borderTop="1px"
			borderBottom="1px"
			borderTopColor={`types.${pokemonType}.borderTop`}
			borderBottomColor={`types.${pokemonType}.borderBottom`}
			borderRadius="3px"
		>
			{pokemonType}
		</Box>
	)
}

export default PokemonTypeDisplay
