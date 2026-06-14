## Implement Debounced callback upon search input change

- make the api calls in a debounced fashion, by utilizing custom useDebounce.

## useDebounce hook arguments

- cb → we pass the callback function to the custom debounce hook function.
- delay → The number of milliseconds to wait after the latest call.

## Returns

- - (Function): Returns the debounced function.

## Notes

- For the custom hook here, we are just implementing the higher order function `useDebounce` which returns a new function that wraps the original passed callback. We can call this returned function as the wrapper.
- This wrapper function controls when `cb` gets executed.
- So, while using this implementation we store the returned wrapper function like this :

`const debouncedLoadData = useDebounce(loadData, 300);`

- To get the debouncing behavior, call the returned debounced function stored in (`debouncedLoadData`) instead of invoking the original function (`loadData`) directly.

### Why we used ref ?

- The debounce function needs a persistent place to remember the previous `timerID` so it can cancel it when a new call comes in. In React, `useRef` provides persistence across renders without causing re-renders.
