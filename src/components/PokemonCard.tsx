import { Pokemon } from "@/utils/apis";
import { Link } from "react-router-dom";

type Props = {
  data: Pokemon;
};

const PokemonCard = (props: Props) => {
  const { data } = props;

  return (
    <Link to={`/detail-pokemon/${data.name}`}>
      <div className="w-[10rem] h-[14rem] md:w-[16rem] md:h-[16rem] bg-white dark:bg-slate-800/50 border-collapse border-4 dark:border-white/25 shadow-lg dark:shadow-neutral-300/20 rounded-lg flex flex-col justify-between items-center pt-4 border-black overflow-auto">
        <img
          // src={data.sprites.other.dream_world.front_default}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
          className="w-auto h-[8rem] mb-2"
        />
        <div className="w-full bg-black dark:bg-white  text-white dark:text-black py-2">
          <p className="text-center text-lg md:text-3xl font-black tracking-wide">
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
