# Implement Debounced Local Filtering using a Debounced Value

- Fetch all data once during the initial component mount.
- Store the fetched data locally in component state.
- Instead of making API calls on every search input change, debounce the search input value and perform filtering on the already fetched local dataset.

## useDebounce Hook Arguments

- `searchTerm` → The search input/query that should be debounced.
- `delay` → The number of milliseconds to wait after the latest value change.

## Returns

- `(Debounced Value)` → Returns the debounced version of the provided value.

## Notes

- For this implementation, the custom hook internally manages a state value and updates it only after the specified delay has elapsed without further changes.

- The hook does **not** return a function. Instead, it returns a debounced version of the input value.

- The API call is executed only once when the component mounts.

- Whenever the user types, `query` updates immediately.

- `debouncedSearch` updates only after the user stops typing for the specified delay.

- Filtering is performed against the already available local dataset using the debounced value.

- No additional API calls are made after the initial data fetch.

## Why we do not store filtered results in state?

- `filteredResults` is a derived value that can be computed from:
  - The original dataset.
  - The debounced search term.

- Since it can be derived during rendering, there is no need to maintain a separate state variable for it.

- This avoids unnecessary state management and keeps a single source of truth for the fetched data.

## Mental Model

- Debounced API Call = "Delay fetching data."
- Debounced Local Filtering = "Fetch once, delay searching through the data."
