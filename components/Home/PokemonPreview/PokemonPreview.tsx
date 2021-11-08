/* eslint-disable react/display-name */
import { Box, Flex, Text } from "@chakra-ui/react"
import { PokemonTypeDisplay } from "@components/PokemonTypeDisplay"
import { Pokemon, PokemonType } from "@constants"
import { createTransition } from "@utils"
import NextImage from "next/image"
import NextLink from "next/link"
import React from "react"

const PokemonPreview: React.FC<Pokemon> = ({
	id,
	name,
	jaName,
	types,
	images: { thumbnail },
}) => {
	return (
		<NextLink href={`/pokemon/${id}`} passHref>
			<Flex
				as="a"
				justify="space-between"
				flexDirection={{ sm: "column", md: "row" }}
				w="full"
				bg="gray.50"
				borderRadius="lg"
				p={4}
				cursor="pointer"
				transition={createTransition(["background"])}
				_hover={{
					bg: "gray.100",
				}}
			>
				<Box
					minW="125px"
					h="100px"
					position="relative"
					mr={{ base: 3, sm: 0, md: 3 }}
					mb={{ sm: 3, md: 0 }}
				>
					<NextImage
						src={thumbnail.src}
						alt={name}
						layout="fill"
						objectFit="contain"
						quality={30}
					/>
				</Box>
				<Box w="full" position="relative" px={{ sm: 3, md: 0 }}>
					<Box position="absolute" top={0} right={{ base: 0, sm: 3, md: 0 }}>
						<Text
							as="h6"
							textAlign="right"
							fontSize="3xl"
							lineHeight={1}
							fontStyle="italic"
							fontWeight="bold"
							opacity={0.3}
						>
							{id}
						</Text>
					</Box>
					<Flex h="full" justify="space-between" flexDir="column">
						<Box>
							<Text as="h3" fontSize="2xl" lineHeight={1} mt={1}>
								{name}
							</Text>
							<Text as="h5">{jaName}</Text>
						</Box>
						<Flex mr={-1} w="full" mb={1}>
							{types.map((type) => (
								<Box w="64px" mr={1} key={`${name}-${type}-type-display`}>
									<PokemonTypeDisplay
										pokemonType={type.toLowerCase() as PokemonType}
									/>
								</Box>
							))}
						</Flex>
					</Flex>
				</Box>
			</Flex>
		</NextLink>
	)
}

export default PokemonPreview
