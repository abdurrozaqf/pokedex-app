import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";

import { searchPokemon } from "@/utils/apis/api";
import { Pokemon } from "@/utils/apis";

const Search = () => {
  const [datas, setDatas] = useState<Pokemon>();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  async function fetchData() {
    try {
      const query = Object.fromEntries([...searchParams]);
      const response = await searchPokemon(query.name);
      setDatas(response);
    } catch (error: any) {
      const query = Object.fromEntries([...searchParams]);
      toast({
        title: "Oops! Something went wrong.",
        description: `Pokemon ${query.name} not Found`,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full">
        {datas && (
          <>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${datas?.id}.svg`}
              alt=""
            />
            <p className="font-josefin text-xl mt-10 font-black">
              {datas?.name}
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Search;
