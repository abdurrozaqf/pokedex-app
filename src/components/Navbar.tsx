import { ModeToggle } from "@/components/ModeToggle";
import Logo from "../assets/pokeball-logo.png";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
};

const Navbar = (props: Props) => {
  const { title } = props;

  return (
    <div className="h-fit w-full flex items-center border-b dark:border-white/25 justify-between bg-gradient-to-tr from-indigo-700/50 to-indigo-500 dark:from-black/80 dark:to-black/30 px-6 py-4 sticky top-0 transition-colors duration-300">
      <Link to="/">
        <img src={Logo} alt="Logo Pokeball" className="w-8 h-8" />
      </Link>
      <p className="text-lg md:text-2xl mt-2 font-black text-white transition-colors">
        {title}
      </p>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
