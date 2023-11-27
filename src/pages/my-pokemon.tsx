import { useEffect, useState } from "react";

import MyPokemonCard from "@/components/MyPokemonCard";
import Layout from "@/components/Layout";

import { Loader2, Trash2 } from "lucide-react";

const getDatafromLS = () => {
  const data = localStorage.getItem("myPokemon");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const MyPokemon = () => {
  const [pokemons, setPokemons] = useState(getDatafromLS());
  const [isLoading, setLoading] = useState(false);

  // delete book from LS
  const deletePokemon = (nickname: number) => {
    setLoading(true);
    const filteredBooks = pokemons.filter((element: any) => {
      return element.nickname !== nickname;
    });
    setPokemons(filteredBooks);
    setLoading(false);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("myPokemon", JSON.stringify(pokemons));
  }, [pokemons]);

  return (
    <Layout title="Pokemon Collection">
      {isLoading ? (
        <div className="h-full flex grow items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ) : (
        <>
          {pokemons < 1 ? (
            <div className="h-full flex grow items-center justify-center">
              No pokemon catch
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-y-10 justify-items-center py-10 px-5">
                {pokemons.map((item: any, index: any) => {
                  return (
                    <div key={index} className="relative">
                      <div className="absolute right-0 p-2 hover:text-red-500 cursor-pointer border dark:border-white/20 rounded-tr-lg rounded-bl-lg">
                        <Trash2 onClick={() => deletePokemon(item.nickname)} />
                      </div>
                      <MyPokemonCard
                        nickname={item.nickname}
                        data={item.data_pokemon}
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
