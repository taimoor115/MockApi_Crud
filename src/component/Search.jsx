import { useDispatch } from "react-redux";
import Input from "./Input";
import { setSearch } from "../store/features/userSlice";

const Search = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
  };
  return (
    <form className="d-flex" role="search">
      <Input
        type="search"
        placeholder="Search User..."
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
