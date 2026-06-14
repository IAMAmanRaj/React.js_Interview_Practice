import { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const filterData = (data, searchTerm) => {
    const filteredData = data.filter((item) =>
      item.attributes.name.toLowerCase().startsWith(searchTerm),
    );
    setResults(filteredData);
  };

  const loadData = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dogapi.dog/api/v2/breeds?page[size]=100",
      );
      const json = await response.json();
      const data = json.data;
      filterData(data, searchTerm);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedSearch = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedSearch) {
      setLoading(false);
      setResults([]);
      setError(false);
      return;
    }

    loadData(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "4px",
        }}
      >
        <div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="type your query here..."
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
        </div>
        {!loading && error && <span>Error...</span>}
        {loading && !error && <span>Loading...</span>}
        {!loading && !error && results.length === 0 && (
          <span>Result is empty...</span>
        )}
        {!loading &&
          results &&
          open &&
          results.map((item, index) => (
            <div key={index}>{item.attributes.name}</div>
          ))}
      </div>
    </>
  );
};

export default App;
