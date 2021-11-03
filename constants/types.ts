export type Pokemon = {
	id: string
	name: string
	jaName: string
	description: string
	images: {
		thumbnail: PokemonImage
		sprite: PokemonImage
	}
	types: PokemonType[]
	weight: number
	height: number
	abilities: string[]
	evolutions?: Pokemon[]
}

export type PokemonType =
	| "normal"
	| "fire"
	| "water"
	| "grass"
	| "electric"
	| "ice"
	| "fighting"
	| "poison"
	| "ground"
	| "flying"
	| "psychic"
	| "bug"
	| "rock"
	| "ghost"
	| "dark"
	| "dragon"
	| "steel"
	| "fairy"
	| "???"

export type PokemonImage = {
	src: string
	width: number
	height: number
	base64: string
}
