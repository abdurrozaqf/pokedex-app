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
    <div className="w-full h-screen bg-gradient-to-br from-indigo-300 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900/20 flex justify-center overflow-auto p-0 md:p-2 font-josefin">
      <div className="w-full md:w-[640px] flex flex-col border dark:border-white/20 rounded-lg overflow-auto shadow">
        <Navbar title={title} />
        <div className="grow overflow-auto bg-gradient-to-br from-indigo-200 to-indigo-50 dark:from-indigo-400/10 dark:to-indigo-950/5">
          {children}
        </div>
        <BottomBar />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
