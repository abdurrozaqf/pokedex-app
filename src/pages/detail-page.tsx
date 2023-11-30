import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Pokemon,
  PokemonSpecies,
  getDetailPokemon,
  getSpeciesPokemon,
} from "@/utils/apis";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

import { Loader2 } from "lucide-react";

const DetailPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon>();
  const [species, setSpecies] = useState<PokemonSpecies>();

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  async function fetchDetailPokemon() {
    try {
      const Response = await getDetailPokemon(params.id_pokemon!);
      setPokemons(Response);
    } catch (error: any) {
      console.log(error.toString());
    }
  }

  async function fetchSpeciesPokemon() {
    setIsLoading(true);
    try {
      const Response = await getSpeciesPokemon(params.id_pokemon!);
      setSpecies(Response);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.toString());
    }
  }

  useEffect(() => {
    fetchDetailPokemon();
    fetchSpeciesPokemon();
  }, []);

  return (
    <Layout title={pokemons?.name.toUpperCase()}>
      {isLoading ? (
        <div className="h-full flex grow items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 px-6 py-6 transition-all">
            <div className="h-fit flex flex-col items-center justify-center relative">
              <p className="font-extrabold text-2xl absolute z-[1] top-1 italic">
                ({species?.names[0].name})
              </p>
              <div className="mt-8">
                <figure>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons?.id!}.png`}
                    alt={pokemons?.name}
                    className="w-full h-auto"
                  />
                </figure>
              </div>
              <div className="w-full flex justify-center gap-4">
                {pokemons?.types.map((datas, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className={`${datas.type.name} px-4 py-2`}
                  >
                    <p className=" text-white text-sm md:text-[1.4rem] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {datas.type.name}
                    </p>
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-[1.6rem] italic border-b border-black dark:border-white  ">
                STATS
              </p>
              <div className="mt-1">
                {pokemons?.stats.map((datas, index) => (
                  <div key={index}>
                    <div className="w-full flex items-end justify-between mb-0 md:mb-1">
                      <p className="mt-2 text-base italic capitalize">
                        {datas.stat.name}
                      </p>
                      <p className="mt-2 text-lg md:text-xl font-bold">
                        {datas.base_stat}
                      </p>
                    </div>
                    <Progress value={datas.base_stat} className="h-[0.5rem]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col bg-none dark:bg-black/25 p-4 rounded-lg border border-black/50 dark:border-white/50">
              <p className="font-bold text-2xl mb-2 leading-5">Information</p>
              <hr className="pt-2 pb-1 dark:border-white border-black" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4">
                <p className="font-medium text-xl leading-5">
                  Height <br />{" "}
                  <span className="font-normal text-base md:text-lg dark:text-neutral-300">
                    {pokemons?.height! / 10} m{" "}
                  </span>
                </p>
                <p className="font-medium text-xl leading-5">
                  Weight
                  <br />
                  <span className="font-normal text-base md:text-lg dark:text-neutral-300">
                    {pokemons?.weight! / 10} kg
                  </span>
                </p>
                <p className="font-medium text-xl leading-5">
                  Habitat <br />
                  <span className="font-normal text-base md:text-lg dark:text-neutral-300">
                    {species?.habitat.name || "—"}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col bg-none dark:bg-black/25 p-4 rounded-lg border border-black/50 dark:border-white/50">
              <p className="font-bold text-2xl mb-2 leading-5">Ability</p>
              <hr className="pt-2 pb-1 dark:border-white border-black" />
              {pokemons?.abilities.map((datas, index) => (
                <p
                  key={index}
                  className="font-medium text-base md:text-xl dark:text-neutral-300 capitalize"
                >
                  › {datas.ability.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mx-6 mb-6 p-4 rounded-lg border bg-none dark:bg-black/25  border-black/50 dark:border-white/50">
            <p className="font-bold text-[1.6rem] italic">MOVES</p>
            <hr className="pt-2 pb-1 dark:border-white border-black" />
            <div className="grid grid-cols-2 md:grid-cols-3 justify-items-start ">
              {pokemons?.moves
                .map((datas, index) =>
                  index < 9 ? (
                    <p
                      key={index}
                      className="font-medium text-base md:text-xl dark:text-neutral-300 capitalize"
                    >
                      › {datas.move.name}
                    </p>
                  ) : undefined
                )
                .filter((datas) => datas !== undefined)}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <Link to={`/catch-pokemon/${pokemons?.name}`}>
              <Button className="px-4 py-2 h-auto">CATCH</Button>
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DetailPage;
