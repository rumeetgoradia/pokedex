import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react"
import { PokemonPreview } from "@components/Home"
import { PokemonTypeDisplay } from "@components/PokemonTypeDisplay"
import { Pokemon, PokemonType, POKEMON_TYPES, SITE_NAME } from "@constants"
import db, { COLLECTION_NAME } from "@firebase"
import { createTransition } from "@utils"
import { collection, getDocs } from "firebase/firestore/lite"
import type { GetStaticProps, NextPage } from "next"
import { NextSeo } from "next-seo"
import React, { useEffect, useState } from "react"
import { GoSearch } from "react-icons/go"
import { MdOutlineClear } from "react-icons/md"

export const getStaticProps: GetStaticProps = async () => {
	const pokemonsCollection = collection(db, COLLECTION_NAME)
	const pokemonsSnapshot = await getDocs(pokemonsCollection)
	const pokemons = pokemonsSnapshot.docs.map((doc) => doc.data())

	return {
		props: {
			pokemons,
		},
	}
}

type HomePageProps = {
	pokemons: Pokemon[]
}

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
	const [displayedPokemons, setDisplayedPokemons] =
		useState<Pokemon[]>(pokemons)
	const [textFilter, setTextFilter] = useState<string>("")
	const [typesFilter, setTypesFilter] = useState<PokemonType[]>([])

	useEffect(() => {
		if (!textFilter?.length && !typesFilter?.length) {
			setDisplayedPokemons([...pokemons])
		} else if (textFilter.length && typesFilter.length) {
			setDisplayedPokemons(
				pokemons.filter(
					(pokemon) =>
						(pokemon.id.toLowerCase().includes(textFilter.toLowerCase()) ||
							pokemon.name.toLowerCase().startsWith(textFilter.toLowerCase()) ||
							pokemon.jaName
								.toLowerCase()
								.startsWith(textFilter.toLowerCase())) &&
						typesFilter.every((type) =>
							pokemon.types.map((_type) => _type.toLowerCase()).includes(type)
						)
				)
			)
		} else if (textFilter.length) {
			setDisplayedPokemons(
				pokemons.filter(
					(pokemon) =>
						pokemon.id.toLowerCase().includes(textFilter.toLowerCase()) ||
						pokemon.name.toLowerCase().startsWith(textFilter.toLowerCase()) ||
						pokemon.jaName.toLowerCase().startsWith(textFilter.toLowerCase())
				)
			)
		} else if (typesFilter.length) {
			setDisplayedPokemons(
				pokemons.filter((pokemon) =>
					typesFilter.every((type) =>
						pokemon.types.map((_type) => _type.toLowerCase()).includes(type)
					)
				)
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textFilter, typesFilter])

	const handleTextFilterChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTextFilter(event.target.value)
	}

	const handleTypesFilterChange = (pokemonType: PokemonType) => {
		const newTypesFilter = [...typesFilter]
		const index = newTypesFilter.indexOf(pokemonType)
		if (index > -1) {
			newTypesFilter.splice(index, 1)
		} else {
			newTypesFilter.push(pokemonType)
		}

		setTypesFilter(newTypesFilter)
	}

	const clearFilters = () => {
		setTextFilter("")
		setTypesFilter([])
	}

	return (
		<>
			<NextSeo title={SITE_NAME} titleTemplate="%s" />
			<Flex flexDirection="column" align="center">
				<InputGroup>
					<Input
						placeholder="Search Pokémon ..."
						size="md"
						variant="flushed"
						focusBorderColor="black"
						value={textFilter}
						onChange={handleTextFilterChange}
						_placeholder={{
							fontStyle: "italic",
						}}
					/>
					<InputRightElement>
						<IconButton
							aria-label="Search Pokémon"
							icon={<GoSearch />}
							bg="transparent"
							borderRadius="50%"
							color="black"
							opacity={0.75}
							_hover={{
								bg: "transparent",
								transform: "scale(1.05)",
								opacity: 1,
							}}
							_focus={{
								bg: "transparent",
								transform: "scale(1.05)",
								opacity: 1,
							}}
							_active={{
								transform: "scale(0.95)",
							}}
						/>
					</InputRightElement>
				</InputGroup>
				<Flex mt={4} w="full" justify={{ base: "center", md: "flex-start" }}>
					<Flex justify="center" mr={-1} mb={-1} wrap="wrap" maxW="612px">
						{POKEMON_TYPES.map((pokemonType) => (
							<Box
								as="button"
								aria-label={`${pokemonType} type filter`}
								w="64px"
								mr={1}
								mb={1}
								cursor="pointer"
								opacity={typesFilter.includes(pokemonType) ? 1 : 0.5}
								transition={createTransition("opacity", "fast")}
								_hover={{
									opacity: 0.75,
								}}
								onClick={() => handleTypesFilterChange(pokemonType)}
								key={`${pokemonType}-filter-item`}
							>
								<PokemonTypeDisplay pokemonType={pokemonType} />
							</Box>
						))}
					</Flex>
					<IconButton
						aria-label="Clear filters"
						title="Clear filters"
						icon={<MdOutlineClear />}
						onClick={clearFilters}
						ml={4}
						flex="1"
						h="48px"
						colorScheme="red"
						display={{ base: "none", md: "flex" }}
						disabled={!textFilter?.length && !typesFilter?.length}
					/>
				</Flex>
				<Button
					onClick={clearFilters}
					disabled={!textFilter?.length && !typesFilter?.length}
					aria-label="Clear filters"
					title="Clear filters"
					w="full"
					textTransform="uppercase"
					letterSpacing={2}
					mt={4}
					colorScheme="red"
					display={{ md: "none" }}
				>
					Clear filters
				</Button>
			</Flex>

			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
				}}
				gap={4}
				mt={8}
			>
				{displayedPokemons.map((pokemon) => {
					const { id } = pokemon
					return (
						<GridItem colSpan={1} key={id}>
							<PokemonPreview {...pokemon} />
						</GridItem>
					)
				})}
			</Grid>
		</>
	)
}

export default HomePage
