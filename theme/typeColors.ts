import { PokemonType } from "@constants";

export type TypeColor = {
  background: string;
  borderTop: string;
  borderBottom: string;
};

export const types: { [key in PokemonType]: TypeColor } = {
  normal: {
    background: "#A8A878",
    borderTop: "#D8D8D0",
    borderBottom: "#705848",
  },
  fire: {
    background: "#F08030",
    borderTop: "#F8D030",
    borderBottom: "#C03028",
  },
  water: {
    background: "#6890F0",
    borderTop: "#98D8D8",
    borderBottom: "#807870",
  },
  grass: {
    background: "#78C850",
    borderTop: "#C0F860",
    borderBottom: "#588040",
  },
  electric: {
    background: "#F8D030",
    borderTop: "#F8F878",
    borderBottom: "#B8A038",
  },
  ice: {
    background: "#98D8D8",
    borderTop: "#D0F8E8",
    borderBottom: "#9090A0",
  },
  fighting: {
    background: "#C03028",
    borderTop: "#F08030",
    borderBottom: "#484038",
  },
  poison: {
    background: "#A040A0",
    borderTop: "#D880B8",
    borderBottom: "#483850",
  },
  ground: {
    background: "#E0C068",
    borderTop: "#F8F878",
    borderBottom: "#886830",
  },
  flying: {
    background: "#A890F0",
    borderTop: "#C8C0F8",
    borderBottom: "#705898",
  },
  psychic: {
    background: "#F85888",
    borderTop: "#F8C0B0",
    borderBottom: "#789010",
  },
  bug: {
    background: "#A8B820",
    borderTop: "#D8E030",
    borderBottom: "#A8B820",
  },
  rock: {
    background: "#B8A038",
    borderTop: "#E0C068",
    borderBottom: "#886830",
  },
  ghost: {
    background: "#705898",
    borderTop: "#A890F0",
    borderBottom: "#483850",
  },
  dark: {
    background: "#705848",
    borderTop: "#A8A878",
    borderBottom: "#484038",
  },
  dragon: {
    background: "#7038F8",
    borderTop: "#B8A0F8",
    borderBottom: "#483890",
  },

  steel: {
    background: "#B8B8D0",
    borderTop: "#D8D8C0",
    borderBottom: "#807870",
  },
  fairy: {
    background: "#F0B6BC",
    borderTop: "#F5CAD1",
    borderBottom: "#905F63",
  },
  // "???": {
  // 	background: "#6AA596",
  // 	borderTop: "#A4D8CB",
  // 	borderBottom: "#40685E",
  // },
};
