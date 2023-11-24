import { Link } from "react-router-dom";

type Props = {
  data: any;
};

const PokemonCard = (props: Props) => {
  const { data } = props;

  return (
    <Link to={`/detail-pokemon/${data.name}`}>
      <div className="w-[10rem] h-[14rem] md:w-[16rem]  md:h-[16rem] bg-white dark:bg-slate-800/50 border dark:border-white/20 shadow-lg dark:shadow-neutral-300/20 rounded-lg flex flex-col items-center py-4">
        <img
          src={data.sprites.other.dream_world.front_default}
          className="w-auto h-[8rem] mb-2"
        />
        <p className="text-center text-lg md:text-3xl font-black tracking-wide">
          {data.name.toUpperCase()}
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;
