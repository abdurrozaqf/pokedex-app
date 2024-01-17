import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "./ui/button";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handlePrevPage() {
    const query = searchParams.get("offset");
    const oldOffset = query ? parseInt(query, 10) : 0;
    if (oldOffset >= 20) {
      const newOffset = oldOffset - 20;
      searchParams.set("offset", String(newOffset));
    }
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    const query = searchParams.get("offset");
    const oldOffset = query ? parseInt(query, 10) : 0;
    if (oldOffset <= 1300) {
      const newOffset = oldOffset + 20;
      searchParams.set("offset", String(newOffset));
    }
    setSearchParams(searchParams);
  }
  return (
    <div className="flex items-center justify-around p-6">
      <Button
        onClick={() => {
          handlePrevPage();
        }}
        className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
      >
        <ChevronLeftIcon size={"2rem"} />
      </Button>
      <Button
        onClick={() => {
          handleNextPage();
        }}
        className="bg-white dark:bg-black/25 hover:bg-indigo-200 dark:hover:bg-slate-800 border border-white dark:border dark:border-white/20 shadow text-black hover:text-black dark:text-white rounded-xl h-fit w-fit"
      >
        <ChevronRightIcon size={"2rem"} />
      </Button>
    </div>
  );
};

export default Pagination;
