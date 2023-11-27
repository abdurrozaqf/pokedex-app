import { Pokemon } from "@/utils/apis";
import { Link } from "react-router-dom";

type Props = {
  data: Pokemon;
  nickname: string;
};

const PokemonCard = (props: Props) => {
  const { data, nickname } = props;

  return (
    <Link to={`/detail-pokemon/${data.name}`}>
      <div className="w-[10rem] h-[14rem] md:w-[16rem]  md:h-[16rem] bg-white dark:bg-slate-800/50 border dark:border-white/20 shadow-lg dark:shadow-neutral-300/20 rounded-lg flex flex-col items-center justify-between py-4">
        <img
          // src={data.sprites.other.dream_world.front_default}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
          className="w-auto h-[8rem]"
        />
        <div className="">
          <p className="text-center text-lg md:text-3xl font-black tracking-wide">
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          </p>
          <p className="text-center text-lg md:text-xl font-black tracking-wide">
            ( {nickname.charAt(0).toUpperCase() + nickname.slice(1)} )
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
