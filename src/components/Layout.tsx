import { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";
import BottomBar from "@/components/BottomBar";
import Navbar from "@/components/Navbar";

interface Props {
  children: ReactNode;
  title?: string | any;
}

const Layout = (props: Readonly<Props>) => {
  const { children, title } = props;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-300 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900/20 transition-all duration-200 flex justify-center overflow-auto p-0 md:p-2">
      <div className="w-auto md:w-[640px] flex flex-col border dark:border-white/20 rounded-lg overflow-auto shadow ">
        <Navbar title={title} />
        <div className="grow overflow-auto bg-[#F3F3F7]/50 dark:bg-black/10 py-4">
          {children}
        </div>
        <BottomBar />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
