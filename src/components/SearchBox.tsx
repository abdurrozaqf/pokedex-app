import { useNavigate, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearch(value: string) {
    if (value !== "") {
      searchParams.set("name", value);
      searchParams.delete("offset");
      navigate("/search");
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  const debounceHandle = debounce(
    (search: string) => handleSearch(search),
    500
  );

  return (
    <input
      type="text"
      placeholder="Seacrh pokemon"
      className="bg-transparent shadow px-4 py-2 outline-none rounded-md placeholder:italic placeholder:text-black placeholder:dark:text-white dark:shadow-white w-1/2 truncate"
      onChange={(e) => debounceHandle(e.target.value)}
    />
  );
};

export default SearchBox;
