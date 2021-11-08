import {
	Box,
	Container,
	Flex,
	Grid,
	GridItem,
	Text,
	VStack,
} from "@chakra-ui/react"
import { PokemonTypeDisplay } from "@components/PokemonTypeDisplay"
import { Pokemon, SITE_NAME } from "@constants"
import db, { COLLECTION_NAME } from "@firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { NextSeo } from "next-seo"
import NextImage from "next/image"
import NextLink from "next/link"

export const getStaticPaths: GetStaticPaths = async () => {
	const pokemonsCollection = collection(db, COLLECTION_NAME)
	const pokemonsSnapshot = await getDocs(pokemonsCollection)
	const pokemons = pokemonsSnapshot.docs.map((doc) => doc.data())

	const paths = (pokemons as Pokemon[]).map((pokemon) => {
		return {
			params: {
				slug: pokemon.id,
			},
		}
	})

	return {
		paths,
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const docRef = doc(db, COLLECTION_NAME, params?.slug as string)
	const docSnap = await getDoc(docRef)

	if (!docSnap.exists()) {
		return {
			notFound: true,
		}
	}

	const pokemon = docSnap.data()
	const evolutions = []
	for (const evolution of pokemon.evolutions) {
		const evolutionDocRef = doc(db, COLLECTION_NAME, evolution)
		const evolutionDocSnap = await getDoc(evolutionDocRef)

		if (evolutionDocSnap.exists()) {
			evolutions.push(evolutionDocSnap.data())
		}
	}
	pokemon.evolutions = evolutions

	return {
		props: {
			pokemon,
		},
		revalidate: 100,
	}
}

type PokemonPageProps = {
	pokemon: Pokemon
}

const PokemonPage: NextPage<PokemonPageProps> = ({
	pokemon: {
		name,
		id,
		images,
		types,
		jaName,
		abilities,
		description,
		height,
		weight,
		evolutions,
	},
}) => {
	return (
		<>
			<NextSeo title={name} titleTemplate={`%s — ${SITE_NAME}`} />
			<Container maxW="container.md">
				<VStack spacing={6} align="flex-start">
					<Box
						bg="gray.50"
						p={4}
						mb={-6}
						borderRadius="lg"
						display={{ sm: "none" }}
					>
						<Box w="full" position="relative">
							<NextImage
								src={images.thumbnail.src}
								width={images.thumbnail.width}
								height={images.thumbnail.height}
								objectFit="contain"
								alt={name}
							/>
						</Box>
					</Box>
					<Box w="full">
						<Text
							as="h1"
							fontSize={{ base: "4xl", md: "5xl" }}
							fontWeight="bold"
							lineHeight={1}
							mt={3}
						>
							{name}
							<Box as="span" ml={4} fontStyle="italic" opacity={0.3}>
								{id}
							</Box>
							<Box
								float="right"
								ml={4}
								mb={4}
								bg="gray.50"
								p={4}
								borderRadius="lg"
								display={{ base: "none", sm: "block" }}
							>
								<Box h="200px" minW="225px" position="relative">
									<NextImage
										src={images.thumbnail.src}
										layout="fill"
										objectFit="contain"
										alt={name}
									/>
								</Box>
							</Box>
						</Text>
						<Text
							as="h2"
							fontSize={{ base: "2xl", md: "3xl" }}
							fontWeight="bold"
							lineHeight={1}
						>
							{jaName}
						</Text>
						<Text mt={{ base: 6, md: 12 }}>{description}</Text>
					</Box>
					<Grid
						gap={6}
						templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }}
						w="full"
					>
						<Box w="full">
							<Text as="h3" fontSize="2xl">
								Weight
							</Text>
							<Text>{weight}</Text>
						</Box>
						<Box w="full">
							<Text as="h3" fontSize="2xl">
								Height
							</Text>
							<Text>{height}</Text>
						</Box>
						<Box w="full">
							<Text as="h3" fontSize="2xl">
								{abilities.length > 1 ? "Abilities" : "Ability"}
							</Text>
							{abilities.map((ability) => (
								<Text key={`${id}-${ability}-ability`}>{ability}</Text>
							))}
						</Box>
						<Box w="full">
							<Text as="h3" fontSize="2xl">
								{types.length > 1 ? "Types" : "Type"}
							</Text>
							{types.map((type) => (
								<Box w="64px" mb={1} key={`${id}-${type}-ability`}>
									<PokemonTypeDisplay pokemonType={type} />
								</Box>
							))}
						</Box>
						<GridItem colSpan={2}>
							<Box w="full">
								<Text as="h3" fontSize="2xl">
									Evolutions
								</Text>
								{evolutions?.length ? (
									//
									<Flex wrap="wrap">
										{evolutions?.map((evolution) => (
											<NextLink
												href={`/pokemon/${evolution.id}`}
												passHref
												key={`${id}-${evolution.id}-evolution`}
											>
												<Box
													as="a"
													title={`${evolution.id} ${evolution.name}`}
													cursor="pointer"
													h="32px"
													minW="32px"
													mr={2}
													position="relative"
												>
													<NextImage
														src={evolution.images.sprite.src}
														layout="fill"
														objectFit="contain"
														quality={30}
													/>
												</Box>
											</NextLink>
										))}
									</Flex>
								) : (
									<Text>No evolutions.</Text>
								)}
							</Box>
						</GridItem>
					</Grid>
				</VStack>
			</Container>
		</>
	)
}

export default PokemonPage
