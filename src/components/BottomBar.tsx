import { Link } from "react-router-dom";

import { Home } from "lucide-react";

import Logo from "../assets/pokeball-logo.png";

const BottomBar = () => {
  return (
    <div className="h-fit w-full grid grid-cols-2 justify-items-center border-b dark:border-white/25 bg-gradient-to-bl from-indigo-700/50 to-indigo-500 dark:from-black/80 dark:to-neutral-500/5 px-6 py-4">
      <Link to="/" className="w-[15rem] flex flex-col items-center ">
        <Home size={"2rem"} className="text-white" />
        <p className="font-bold mt-1 text-white tracking-wider">HOME</p>
      </Link>
      <Link to="/my-pokemon" className="w-[15rem] flex flex-col items-center ">
        <img src={Logo} className="h-[2rem]" />
        <p className="font-bold mt-1 text-white tracking-wide">MY POKEMON</p>
      </Link>
    </div>
  );
};

export default BottomBar;
