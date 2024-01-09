import { useNavigate, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearch(value: string) {
    if (value !== "") {
      searchParams.set("name", value);
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
    <div className="flex">
      <input
        type="text"
        placeholder="Seacrh pokemon here"
        className="bg-transparent shadow px-4 py-2 outline-none rounded-md placeholder:italic placeholder:text-black placeholder:dark:text-white dark:shadow-white"
        onChange={(e) => debounceHandle(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
