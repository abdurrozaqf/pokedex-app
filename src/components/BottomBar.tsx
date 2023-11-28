import { Link } from "react-router-dom";

import { Home } from "lucide-react";

import Logo from "../assets/pokeball-logo.png";

const BottomBar = () => {
  return (
    <div className="h-fit w-full grid grid-cols-2 justify-items-center border-b dark:border-white/25 bg-gradient-to-bl from-indigo-700/50 to-indigo-500 dark:from-black/80 dark:to-black/30 px-6 py-4">
      <Link to="/" className="w-[15rem] flex flex-col items-center">
        <Home size={"2rem"} className="text-white" />
        <p className="font-bold mt-2 text-white tracking-wider">Home</p>
      </Link>
      <Link to="/my-pokemon" className="w-[15rem] flex flex-col items-center ">
        <img src={Logo} className="w-8 h-8" />
        <p className="font-bold mt-2 text-white tracking-wide">My Pokemon</p>
      </Link>
    </div>
  );
};

export default BottomBar;
