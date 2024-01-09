import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import PokemonCard from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { Response, ResponseResults } from "@/utils/types/api";
import { Pokemon, getAllPokemons } from "@/utils/apis";

function App() {
  const [url, setURL] = useState<string>();
  const [nextPage, setNextPage] = useState<string>();
  const [prevPage, setPrevPage] = useState<string>();

  // const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemon] = useState<Pokemon[]>();

  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDataPokemon();
  }, [url]);

  const fetchDataPokemon = async () => {
    setLoading(true);
    try {
      const Response = await getAllPokemons(url!);
      const dataResponse = Response as Response<ResponseResults[]>;

      setPrevPage(Response.previous);
      setNextPage(Response.next);

      const promises = dataResponse.results.map(async (data) => {
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

  // function handlePrevNextPage(page: string | number) {
  //   searchParams.delete("url");
  //   searchParams.set("url", String(page));
  //   setSearchParams(searchParams);
  // }

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
              disabled={prevPage === null}
              onClick={() => {
                setPokemon([]);
                setURL(prevPage!);
              }}
              className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
            >
              <ChevronLeftIcon size={"2rem"} />
            </Button>
            <Button
              disabled={nextPage === null}
              onClick={() => {
                setPokemon([]);
                setURL(nextPage!);
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

export default App;
