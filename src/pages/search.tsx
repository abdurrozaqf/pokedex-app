import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { searchPokemon } from "@/utils/apis/api";
import { Pokemon } from "@/utils/apis";

import Layout from "@/components/Layout";

const Search = () => {
  const [seacrhParam, setSearchParam] = useSearchParams();
  const query = seacrhParam.get("q");

  const [datas, setDatas] = useState<Pokemon>();

  async function fetchData() {
    try {
      const response = await searchPokemon(query!);
      setDatas(response);
    } catch (error: any) {
      console.log(error.toString());
    }
  }

  useEffect(() => {
    fetchData();
  }, [query, seacrhParam]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full">
        {query && (
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
