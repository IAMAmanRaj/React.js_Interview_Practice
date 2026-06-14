# Implement Debounced API Calls using a Debounced Value

- Make API calls in a debounced fashion by utilizing a custom `useDebounce` hook.
- Instead of debouncing the callback execution itself, debounce the search input value and trigger the API call whenever the debounced value changes.

## useDebounce Hook Arguments

- `searchTerm` → The search input/query that should be debounced.
- `delay` → The number of milliseconds to wait after the latest value change.

## Returns

- `(Debounced Value)` → Returns the debounced version of the provided value.

## Notes

- For this implementation, the custom hook internally manages a state value and updates it only after the specified delay has elapsed without further changes.
- The hook does **not** return a function. Instead, it returns a debounced version of the input value.

- Whenever the user types, `query` updates immediately.
- `debouncedSearch` updates only after the user stops typing for the specified delay.

`const debouncedSearch = useDebounce(query, 300);`

- The API call is then triggered whenever `debouncedSearch` changes.

### Why we did not use `useRef`?

- In this approach, we are debouncing a **value**, not a callback function.
- The debounce behavior is achieved through the `useEffect` cleanup mechanism.

- Whenever the input value changes:
  - React executes the cleanup function from the previous effect.
  - The previous timer is cleared.
  - A new timer is scheduled.

- Because React automatically manages the timer lifecycle through effect cleanup, there is no need to manually persist a timer ID using `useRef`.
