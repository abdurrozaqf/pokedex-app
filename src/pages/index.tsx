import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import PokemonCard from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { getPokemon } from "@/utils/apis/api";
import { Pokemon } from "@/utils/apis";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemon] = useState<Pokemon[]>();

  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDataPokemon();
  }, [searchParams]);

  const fetchDataPokemon = async () => {
    setLoading(true);
    try {
      const query = Object.fromEntries([...searchParams]);
      const Response = await getPokemon({ ...query });

      const promises = Response.results.map(async (data) => {
        const res = await axios.get(data.url);
        const dataPokemon = res.data;
        return dataPokemon;
      });
      const results: Pokemon[] = await Promise.all(promises);
      setPokemon(results);

      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  function handlePrevPage() {
    const query = searchParams.get("offset");
    const oldOffset = query ? parseInt(query, 10) : 0;
    if (oldOffset >= 20) {
      const newOffset = oldOffset - 20;
      searchParams.set("offset", String(newOffset));
    }
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    const query = searchParams.get("offset");
    const oldOffset = query ? parseInt(query, 10) : 0;
    if (oldOffset <= 1300) {
      const newOffset = oldOffset + 20;
      searchParams.set("offset", String(newOffset));
    }
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="h-full flex grow items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-y-6 justify-items-center overflow-auto px-0 py-6 md:px-6">
            {pokemons?.map((pokemon: any, index) => (
              <PokemonCard key={index} data={pokemon} />
            ))}
          </div>
          <div className="flex items-center justify-around p-6">
            <Button
              onClick={() => {
                handlePrevPage();
              }}
              className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
            >
              <ChevronLeftIcon size={"2rem"} />
            </Button>
            <Button
              onClick={() => {
                handleNextPage();
              }}
              className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
            >
              <ChevronRightIcon size={"2rem"} />
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Home;
