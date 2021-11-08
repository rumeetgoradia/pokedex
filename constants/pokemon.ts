export const POKEMON_TYPES = [
	"normal",
	"fire",
	"water",
	"grass",
	"electric",
	"ice",
	"fighting",
	"poison",
	"ground",
	"flying",
	"psychic",
	"bug",
	"rock",
	"ghost",
	"dark",
	"dragon",
	"steel",
	"fairy",
] as const

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

export type PokemonType = typeof POKEMON_TYPES[number]

export type PokemonImage = {
	src: string
	width: number
	height: number
}
