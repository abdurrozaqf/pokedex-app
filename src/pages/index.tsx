import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout";

import { getPokemon } from "@/utils/apis/api";
import { Results } from "@/utils/types/api";

function Home() {
  const [pokemons, setPokemon] = useState<Results[]>();
  const [searchParams] = useSearchParams();

  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDataPokemon();
  }, [searchParams]);

  const fetchDataPokemon = async () => {
    setLoading(true);
    try {
      const query = Object.fromEntries([...searchParams]);
      const response = await getPokemon({ ...query });

      setPokemon(response.results);

      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

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
          <Pagination />
        </>
      )}
    </Layout>
  );
}

export default Home;
