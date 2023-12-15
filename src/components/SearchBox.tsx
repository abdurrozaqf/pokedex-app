import { useNavigate, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBox = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParam);

  const debounceRequest = debounce((search: string) => setSearch(search!), 500);

  function setSearch(value: string) {
    setSearchParam({ q: value });
  }

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Seacrh pokemon here"
        className="dark:bg-transparent"
        onChange={(e) => debounceRequest(e.target.value)}
        onClick={() => navigate("/search")}
      />
    </div>
  );
};

export default SearchBox;
