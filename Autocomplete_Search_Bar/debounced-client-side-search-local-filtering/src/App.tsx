import { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dogapi.dog/api/v2/breeds?page[size]=100",
      );
      const json = await response.json();
      const data = json.data;
      setResults(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedSearch = useDebounce(query, 300);

  useEffect(() => {
    loadData();
  }, []);

  const filteredResults = results.filter((item) =>
    item.attributes.name.toLowerCase().startsWith(debouncedSearch.toLowerCase()),
  );

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
        {!loading && !error && filteredResults.length === 0 && query && (
          <span>Result is empty...</span>
        )}
        {!loading &&
          query &&
          results &&
          open &&
          filteredResults.map((item, index) => (
            <div key={index}>{item.attributes.name}</div>
          ))}
      </div>
    </>
  );
};

export default App;
