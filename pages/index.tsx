import { Box } from "@chakra-ui/react"
import { Pokemon } from "@constants"
import db, { COLLECTION_NAME } from "@firebase"
import { collection, getDocs } from "firebase/firestore/lite"
import type { GetStaticProps, NextPage } from "next"
import Image from "next/image"

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
	return (
		<Box>
			{pokemons.map((pokemon) => {
				const {
					name,
					jaName,
					id,
					images: { thumbnail },
				} = pokemon
				return (
					<Box key={id}>
						{`${id} ${name} ${jaName}`}
						<Box w="200px">
							<Image
								src={thumbnail.src}
								alt={name}
								height={thumbnail.height}
								width={thumbnail.width}
								quality={30}
							/>
						</Box>
					</Box>
				)
			})}
		</Box>
	)
}

export default HomePage
