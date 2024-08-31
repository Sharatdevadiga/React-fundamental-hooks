# React Fundamental Hooks

A collection of essential React hooks that can be used in any React project. These hooks simplify various tasks such as data fetching, form handling, debouncing, and throttling.

## Installation

You can install this package via npm:

```bash
npm i react-fundamental-hooks
```

Or with yarn:

```bash
yarn add react-fundamental-hooks
```

## Usage

Import the hooks you need:

```javascript
import { useCustomHook } from "react-essential-hooks";

function MyComponent() {
  const value = useCustomHook(initialValue);

  return <div>{value}</div>;
}
```

## Available Hooks

- `useCustomFetcher`: A hook for fetching data.
  Description: This hook simplifies the process of fetching data from an API, handling the request, and returning the response.

- `useFetcherWithRetry`: A hook for fetching data with retries.
  Description: This hook extends the basic data-fetching capabilities by allowing you to specify a retry mechanism in case of request failures.

- `useForm`: A hook for managing form state and validation.
  Description: This hook handles form inputs, validation, and state management, making it easier to work with complex forms in your React applications.

- `useDebouncedValue`: A hook for debouncing a value.
  Description: This hook delays the update of a value until a specified time has passed since the last change, useful for performance optimization in scenarios like search inputs.

- `useDebouncedFunction`: A hook for debouncing a function.
  Description: This hook ensures that a function is not called until after a specified delay, preventing excessive execution in rapid-fire situations such as window resizing or button clicks.

- `useThrottledValue`: A hook for throttling a value update.
  Description: This hook ensures that a value is updated at most once within a specified time frame, useful for controlling the frequency of updates in performance-critical situations.

- `useThrottledFunction`: A hook for throttling a function.
  Description: This hook limits the execution of a function to at most once in a specified interval, preventing it from being called too frequently in scenarios like scrolling or resizing events.

## useCustomFetcher

The `useCustomFetcher` hook is a custom React hook designed to simplify the process of fetching data from a given URL. It handles the request, manages loading and error states, and returns the fetched data.

```javascript
import React from "react";
import { useCustomFetcher } from "react-essential-hooks";

function FetcherExample() {
  const url = "https://example.com";
  const { isLoading, data, isError, error } = useCustomFetcher(url);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error}</p>}
      <ul>
        {data?.map((entry) => (
          <li key={entry.id}>{entry.title}</li>
        ))}
      </ul>
      s
    </div>
  );
}
```

### Parameters

- **`url`**: `string` (required)  
  The URL from which to fetch data.

### Return Values

The hook returns an object containing the following properties:

- **`isLoading`**: `boolean`  
  Indicates whether the data is currently being fetched.

- **`data`**: `any`  
  The data returned from the API. Initially `null`.

- **`isError`**: `boolean`  
  Indicates whether an error occurred during the fetch operation.

- **`error`**: `string`  
  The error message if an error occurred. Initially an empty string.

## useFetcherWithRetry

The `useFetcherWithRetry` hook is a custom React hook that fetches data from a specified URL, with an added feature to retry the request a set number of times in case of failure. It manages loading, error states, and provides the fetched data.

```javascript
import React from "react";
import { useFetcherWithRetry } from "react-essential-hooks";

function FetcherRetryExample() {
  const url = "https://example.com";
  const retryAttempts = 3;
  const { isLoading, isError, errorMessage, data } = useFetcherWithRetry(
    url,
    retryAttempts
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {errorMessage}</p>}
      <ul>
        {data?.map((entry) => (
          <li key={entry.id}>{entry.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Parameters

- **`url`**: `string` (required)  
  The URL from which to fetch data.

- **`retry`**: `number` (optional)  
  The number of retry attempts if the fetch operation fails. Default is `2`.

### Return Values

The hook returns an object containing the following properties:

- **`isLoading`**: `boolean`  
  Indicates whether the data is currently being fetched.

- **`isError`**: `boolean`  
  Indicates whether an error occurred during the fetch operation.

- **`errorMessage`**: `string`  
  The error message if an error occurred. Initially an empty string.

- **`data`**: `any`  
  The data returned from the API. Initially `null`.

## useForm

The `useForm` hook is a custom React hook designed to simplify form management in React applications. It handles form state, validation, error handling, and form submission.

```javascript
import React from "react";
import { useForm } from "react-essential-hooks";

function FormExample() {
  const initialValues = { username: "", email: "" };

  const validations = {
    username: (value) => ({
      isValid: value.length > 0,
      errorMessage: "Username is required",
    }),
    email: (value) => ({
      isValid: /\S+@\S+\.\S+/.test(value),
      errorMessage: "Email is invalid",
    }),
  };

  const onSubmit = async (values, resetFields) => {
    // Handle form submission
    console.log(values);
    resetFields();
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
  } = useForm(initialValues, validations, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
```

### This hook can be best used with the components like below

```javascript
function InputField({
  name,
  placeholder,
  error,
  onFocus,
  onChange,
  onBlur,
  value,
}) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default InputField;
```

### Parameters

- **`initialValues`**: `object` (required)  
  An object representing the initial values of the form fields.

- **`validations`**: `object` (optional)  
  An object containing validation functions for each form field. Each function should return an object with `isValid` (a boolean indicating if the field is valid) and `errorMessage` (a string containing the error message).

- **`onSubmit`**: `function` (required)  
  A function to be called when the form is submitted. It receives the form values and a `resetFields` function as arguments.

### Return Values

The hook returns an object containing the following properties and functions:

- **`values`**: `object`  
  The current values of the form fields.

- **`errors`**: `object`  
  An object containing error messages for each form field.

- **`isSubmitting`**: `boolean`  
  Indicates whether the form is currently being submitted.

- **`handleChange`**: `function`  
  A function to handle the change event of form fields.

- **`handleBlur`**: `function`  
  A function to handle the blur event of form fields, triggering validation.

- **`handleFocus`**: `function`  
  A function to handle the focus event of form fields, clearing any existing error messages.

- **`handleSubmit`**: `function`  
  A function to handle the form submission event.

- **`resetFields`**: `function`  
  A function to reset the form fields to their initial values and clear errors.

## useDebouncedValue

The `useDebouncedValue` hook is a custom React hook that delays updating a state value until after a specified delay. This is useful for scenarios where you want to limit the rate at which a value is updated, such as handling input changes or search queries.

```javascript
import React, { useState } from "react";
import { useDebouncedValue } from "react-essential-hooks";

function DebouncedInputExample() {
  import React, { useState, useEffect } from "react";
  import { useDebouncedValue } from "react-essential-hooks";

  function SearchInput() {
    const [searchQuery, setSearchQuery] = useState("");
    const { debouncedValue } = useDebouncedValue(searchQuery, 500);
    const [results, setResults] = useState([]);

    useEffect(() => {
      if (debouncedValue) {
        // Simulate an API call
        const fetchResults = async () => {
          const response = await fetch(
            `https://api.example.com/search?query=${debouncedValue}`
          );
          const data = await response.json();
          setResults(data);
        };

        fetchResults();
      } else {
        setResults([]);
      }
    }, [debouncedValue]);

    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default SearchInput;
}
```

### Parameters

- **`value`**: `any` (required)  
  The value to be debounced.

- **`delay`**: `number` (optional)  
  The debounce delay in milliseconds. Default is `500ms`.

### Return Values

The hook returns an object containing the following property:

- **`debouncedValue`**: `any`  
  The debounced value that is updated only after the specified delay.

## useDebouncedFunction

The `useDebouncedFunction` hook is a custom React hook that creates a debounced version of a function. This debounced function delays its execution until after a specified delay has passed since the last time it was invoked. This is useful for scenarios where you want to limit the frequency of function calls, such as handling user input or window resizing events.

```javascript
import React, { useState } from "react";
import { useDebouncedFunction } from "react-essential-hooks";

function SearchComponent() {
  const [query, setQuery] = useState("");

  // Define the debounced function that performs the search
  const performSearch = (searchQuery) => {
    // Simulate an API call or search operation
    console.log("Searching for:", searchQuery);
  };

  // Create a debounced version of the search function
  const { debouncedFunction: debouncedSearch } = useDebouncedFunction(
    performSearch,
    300
  );

  // Handle input changes
  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Call the debounced function
    debouncedSearch(newQuery);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchComponent;
```

### Parameters

- **`fn`**: `function` (required)  
  The function to be debounced.

- **`delay`**: `number` (optional)  
  The debounce delay in milliseconds. Default is `500ms`.

### Return Values

The hook returns an object containing the following property:

- **`debouncedFunction`**: `function`  
  A debounced version of the provided function `fn`. It delays the execution of `fn` until after the specified delay has passed since the last time it was called.

### Parameters

- **`fn`**: `function` (required)  
  The function to be debounced.

- **`delay`**: `number` (optional)  
  The debounce delay in milliseconds. Default is `500ms`.

### Return Values

The hook returns an object containing the following property:

- **`debouncedFunction`**: `function`  
  A debounced version of the provided function `fn`. It delays the execution of `fn` until after the specified delay has passed since the last time it was called.

## useThrottledValue

The `useThrottledValue` hook is a custom React hook that throttles the updates of a value. It ensures that the value is updated at most once per specified time interval, regardless of how often the input value changes. This is useful for scenarios where you want to limit the frequency of value updates, such as handling user input or other frequent changes.

```javascript
import React, { useState } from "react";
import { useThrottledValue } from "react-essential-hooks";

function ThrottledInput() {
  const [inputValue, setInputValue] = useState("");
  const throttledValue = useThrottledValue(inputValue, 300);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Throttled Value: {throttledValue}</p>
    </div>
  );
}

export default ThrottledInput;
```

### Parameters

- **`value`**: `any` (required)  
  The value to be throttled.

- **`delay`**: `number` (optional)  
  The throttle delay in milliseconds. Default is `500ms`.

### Return Values

The hook returns the throttled value. The value is updated at most once per the specified delay period, regardless of how many times the input value changes within that interval.

## useThrottledFunction

The `useThrottledFunction` hook is a custom React hook that creates a throttled version of a function. This throttled function limits the rate at which the original function can be called, ensuring it executes only once within a specified time interval. This is useful for scenarios where you want to control the frequency of function calls, such as handling scroll or resize events.

```javascript
import React, { useState } from "react";
import { useThrottledFunction } from "react-essential-hooks";

function ThrottledFunctionExample() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  async function fetchResults(searchTerm) {
    if (!searchTerm) {
      setData([]);
      return;
    }

    try {
      const res = await fetch(`https://example.com?query=${}`);
      const resData = await res.json()
      setData(resData);
    } catch (err) {
      console.error(err);
    }
  }

  const throttledFetcher = useThrottledFunction(fetchResults, 300);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    throttledFetcher(val);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type anything"
      />
      <div>
        <h3>Search results for: {query}</h3>
        {data.length > 0 ? (
          data.map((entry) => <p key={entry}>{entry}</p>)
        ) : (
          <p>No data to show! Search for something.</p>
        )}
      </div>
    </div>
  );
}

export default ThrottledFunctionExample;

```

### Parameters

- **`fn`**: `function` (required)  
  The function to be throttled.

- **`delay`**: `number` (required)  
  The throttle delay in milliseconds. This defines the minimum time interval between successive calls to the function.

### Return Values

The hook returns an object containing the following property:

- **`throttledFunction`**: `function`
  The hook returns a throttled version of the provided function `fn`. The throttled function will only execute once per the specified delay period, regardless of how many times it is called within that interval.

## Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1. **Fork the repository**: Click the "Fork" button on the top right of this page to create a personal copy of the repository.
2. **Clone your fork**: Clone your forked repository to your local machine using `git clone https://github.com/your-username/React-fundamental-hooks.git`.
3. **Create a branch**: Create a new branch for your changes with `git checkout -b my-feature-branch`.
4. **Make changes**: Implement your changes or add a new feature.
5. **Commit your changes**: Commit your changes with `git commit -m "Add a new feature"`.
6. **Push to GitHub**: Push your changes to your forked repository using `git push origin my-feature-branch`.
7. **Submit a Pull Request**: Go to the original repository and submit a pull request with your changes. Provide a clear description of your changes.

## Issues

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/Sharatdevadiga/React-fundamental-hooks/issues) on GitHub.

Thank you 🤝
