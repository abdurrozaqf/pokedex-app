import { Link } from "react-router-dom";

import { Pokemon } from "@/utils/apis";

type Props = {
  data: Pokemon;
  nickname: string;
};

const PokemonCard = (props: Props) => {
  const { data, nickname } = props;

  return (
    <Link to={`/detail-pokemon/${data.name}`}>
      <div className="w-[10rem] h-[14rem] md:w-[16rem]  md:h-[16rem] bg-white dark:bg-slate-800/50 border dark:border-white/20 shadow-lg dark:shadow-neutral-300/20 rounded-lg flex flex-col items-center justify-between py-4">
        <figure>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt={data.name}
            className="w-auto h-[8rem]"
          />
        </figure>
        <div className="">
          <p className="text-center text-lg md:text-3xl font-black tracking-wide capitalize">
            {data.name}
          </p>
          <p className="text-center text-lg md:text-xl font-black tracking-wide">
            ({nickname})
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
