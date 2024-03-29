import { Link } from "react-router-dom";

import { formatUrl } from "@/utils/formatter";
import { Results } from "@/utils/types/api";

type Props = {
  data: Results;
};

const PokemonCard = (props: Props) => {
  const { data } = props;

  return (
    <Link to={`/detail-pokemon/${formatUrl(data.url)}`}>
      <div className="w-[11rem] h-auto md:w-[16rem] md:h-[20rem] bg-white dark:bg-slate-800/50 border-collapse border-4 dark:border-white/25 shadow-lg dark:shadow-neutral-300/20 rounded-lg flex flex-col justify-between items-center pt-4 border-black overflow-auto transition-all scale-100 hover:scale-[1.03]">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${formatUrl(
            data.url
          )}.svg`}
          alt={data.name}
          className="w-full h-[10rem] md:w-full md:h-[12rem] mb-2"
        />
        <div className="w-full bg-black dark:bg-white  text-white dark:text-black py-2 transition-colors">
          <p className="text-center text-lg md:text-3xl font-black tracking-wide capitalize">
            {data.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
