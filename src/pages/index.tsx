import axios from "axios";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import PokemonCard from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPage, setNextPage] = useState<string>();
  const [prevPage, setPrevPage] = useState<string>();

  const [pokemons, setPokemon] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDataPokemon = async () => {
    setLoading(true);
    try {
      const Response = await axios.get(url);
      const dataResponse = Response.data;

      setPrevPage(Response.data.previous);
      setNextPage(Response.data.next);

      const promises = dataResponse.results.map(async (data: any) => {
        const res = await axios.get(data.url);
        const dataPokemon = res.data;

        return dataPokemon;
      });
      const results: any = await Promise.all(promises);
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

  useEffect(() => {
    fetchDataPokemon();
  }, [url]);

  return (
    <>
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
                  setUrl(prevPage!);
                }}
                className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
              >
                <ChevronLeftIcon size={"2rem"} />
              </Button>
              <Button
                disabled={nextPage === null}
                onClick={() => {
                  setPokemon([]);
                  setUrl(nextPage!);
                  +20;
                }}
                className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
              >
                <ChevronRightIcon size={"2rem"} />
              </Button>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}

export default App;
