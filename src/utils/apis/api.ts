import axiosWithConfig from "../axiosWithConfig";
import { Pokemon, PokemonGender, PokemonSpecies } from "./types";

export const getDetailPokemon = async (id_pokemon: string) => {
  try {
    const response = await axiosWithConfig.get(`/pokemon/${id_pokemon}`);

    return response.data as Pokemon;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getGenderPokemon = async (id_pokemon: string) => {
  try {
    const response = await axiosWithConfig.get(`/gender/${id_pokemon}`);

    return response.data as PokemonGender;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getSpeciesPokemon = async (id_pokemon: string) => {
  try {
    const response = await axiosWithConfig.get(
      `/pokemon-species/${id_pokemon}`
    );

    return response.data as PokemonSpecies;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
