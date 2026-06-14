import { useEffect, useState } from "react";

const useDebounce = (searchTerm, delay) => {
  const [value, setValue] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => setValue(searchTerm), delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return value;
};

export default useDebounce;
