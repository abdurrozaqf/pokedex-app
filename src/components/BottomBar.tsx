import { Link } from "react-router-dom";

import { Home } from "lucide-react";

import Logo from "../assets/pokeball-logo.png";

const BottomBar = () => {
  return (
    <div className="h-fit w-full grid grid-cols-2 justify-items-center border-b dark:border-white/25 bg-gradient-to-bl from-indigo-700/50 to-indigo-500 dark:from-black/80 dark:to-black/30 px-6 py-4 transition-colors duration-300">
      <Link to="/" className="w-[15rem] flex flex-col items-center">
        <Home size={"2rem"} className="text-white" />
        <p className="font-bold mt-2 text-white tracking-wider transition-colors">
          Home
        </p>
      </Link>
      <Link to="/my-pokemon" className="w-[15rem] flex flex-col items-center ">
        <img src={Logo} alt="Logo Pokeball" className="w-8 h-8" />
        <p className="font-bold mt-2 text-white tracking-wide transition-colors">
          My Pokemon
        </p>
      </Link>
    </div>
  );
};

export default BottomBar;
