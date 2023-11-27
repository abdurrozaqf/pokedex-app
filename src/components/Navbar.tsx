import { ModeToggle } from "@/components/ModeToggle";
import Logo from "../assets/pokeball-logo.png";

type Props = {
  title?: string;
};

const Navbar = (props: Props) => {
  const { title } = props;

  return (
    <div className="h-fit w-full flex items-center border-b dark:border-white/25 justify-between bg-gradient-to-tr from-indigo-700/50 to-indigo-500 dark:from-black/80 dark:to-black/30 px-6 py-4 sticky top-0">
      <img src={Logo} className="h-8" />
      <p className="text-2xl font-black text-white">{title}</p>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
