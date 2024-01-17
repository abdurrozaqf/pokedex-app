import { Link, useLocation } from "react-router-dom";

import { ModeToggle } from "@/components/ModeToggle";
import SearchBox from "@/components/SearchBox";

import Logo from "/images/pokeball-logo.png";

type Props = {
  title?: string;
};

const Navbar = (props: Props) => {
  const { title } = props;
  const { pathname } = useLocation();

  return (
    <div className="h-fit w-full flex items-center border-b dark:border-white/25 justify-between bg-gradient-to-tr from-indigo-700/50 to-indigo-500 dark:from-black/80 dark:to-black/30 px-6 py-4 transition-colors duration-300 relative">
      <Link to="/">
        <div>
          <img src={Logo} alt="Logo Pokeball" className="w-8 h-8" />
        </div>
      </Link>
      {(pathname === "/" || pathname === "/search") && <SearchBox />}
      {title !== undefined && (
        <p className="text-lg md:text-2xl mt-2 font-black text-white transition-colors">
          {title}
        </p>
      )}
      <ModeToggle />
    </div>
  );
};

export default Navbar;
