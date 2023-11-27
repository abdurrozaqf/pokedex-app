import axiosWithConfig from "../axiosWithConfig";

export const getDetailPokemon = async (pokemon: string) => {
  try {
    const response = await axiosWithConfig.get(`/pokemon/${pokemon}`);

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
