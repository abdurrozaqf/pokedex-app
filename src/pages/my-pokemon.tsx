import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import MyPokemonCard from "@/components/MyPokemonCard";
import Layout from "@/components/Layout";

import { CatchPokemons } from "@/utils/apis/types";
import getDatafromLS from "@/utils/hooks/getLS";

const MyPokemon = () => {
  const [pokemons, setPokemons] = useState<CatchPokemons[]>(getDatafromLS());
  const [isLoading, setLoading] = useState(false);

  const deletePokemon = (nickname: string) => {
    setLoading(true);
    const filtered = pokemons.filter((element: any) => {
      return element.nickname !== nickname;
    });
    setPokemons(filtered);
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("myPokemon", JSON.stringify(pokemons));
  }, [pokemons]);

  return (
    <Layout title="Collections">
      {isLoading ? (
        <div className="h-full flex grow items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ) : (
        <>
          {pokemons.length === 0 ? (
            <div className="h-full flex grow items-center justify-center">
              No pokemon catch
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-y-10 justify-items-center py-10 px-5">
                {pokemons.map((pokemon, index) => {
                  return (
                    <div key={index} className="relative">
                      <div className="absolute right-0 p-2 hover:text-red-500 cursor-pointer border dark:border-white/20 rounded-tr-lg rounded-bl-lg">
                        <Trash2
                          onClick={() => deletePokemon(pokemon.nickname)}
                        />
                      </div>
                      <MyPokemonCard
                        nickname={pokemon.nickname}
                        data={pokemon.data_pokemon}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default MyPokemon;
