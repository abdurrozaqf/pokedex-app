import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Pokemon, getDetailPokemon } from "@/utils/apis";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

import { Loader2 } from "lucide-react";

const DetailPage = () => {
  const params = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(false);
  console.log(pokemon);

  async function fetchDetailPokemon() {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const Response = await getDetailPokemon(params.name!);

        setPokemon(Response);
        setIsLoading(false);
      }, 300);
    } catch (error: any) {
      console.log(error.toString());
    }
  }

  useEffect(() => {
    fetchDetailPokemon();
  }, []);

  return (
    <Layout title={pokemon?.name.toUpperCase()}>
      {isLoading ? (
        <div className="h-full flex grow items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 px-6 py-6">
            <div className="h-fit flex flex-col items-center justify-center pb-5">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon?.id as number
                }.png`}
                className="w-full h-auto"
              />
              <div className="w-full flex justify-center gap-4">
                {pokemon?.types.map((data, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className={`${data.type.name} px-4 py-2`}
                  >
                    <p className=" text-white text-sm md:text-[1.4rem] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {data.type.name}
                    </p>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="">
              <p className="font-bold text-[1.6rem] italic">STATS</p>
              <hr className="pt-2 pb-1 dark:border-white border-black" />
              <div className="mt-[-1rem]">
                {pokemon?.stats.map((data, index) => (
                  <div key={index}>
                    <div className="w-full flex items-end justify-between">
                      <p className="mt-2 text-base italic">
                        {data.stat.name.charAt(0).toUpperCase() +
                          data.stat.name.slice(1)}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {data.base_stat}
                      </p>
                    </div>
                    <Progress value={data.base_stat} className="h-[0.5rem]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col p-4 rounded-lg border border-black/50 dark:border-white/50">
              <p className="font-bold text-2xl mb-2">Information:</p>
              <p className="font-bold text-xl">
                › Name:{" "}
                {pokemon?.name.charAt(0).toUpperCase()! +
                  pokemon?.name.slice(1)}
              </p>
              <p className="font-bold text-xl">› Weight: {pokemon?.weight}</p>
              <p className="font-bold text-xl">› Height: {pokemon?.height}</p>
            </div>
            <div className="w-full flex flex-col p-4 rounded-lg border border-black/50 dark:border-white/50">
              <p className="font-bold text-2xl mb-2">Ability</p>
              {pokemon?.abilities.map((data, index) => (
                <p key={index} className="font-bold text-xl">
                  › {data.ability.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link to={`/catch-pokemon/${pokemon?.name}`}>
              <Button className="px-4 py-1 h-auto">CATCH</Button>
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DetailPage;
