# React for Beginners: Complete Guide to Hooks, Components, APIs, and React Router

If you're a beginner, the best way to learn React is **not to memorize every hook**. Instead, understand what problem each hook solves, when to use it, and how it works with the other parts of a React application.

We'll learn these concepts step by step, with simple explanations, practical examples, and code you can use in your own projects.

## 1. First, understand what React is

React is a JavaScript library for building user interfaces (UI), such as websites, dashboards, forms, and interactive applications.

Imagine you're building a shopping website. You might have:

- A navigation bar
- A product list
- A shopping cart
- A login form
- A product details page

React lets you build each part separately and combine them into a complete application.

### What is a component?

A **component is a reusable piece of UI**.

For example, a button can be a component:

```jsx
function MyButton() {
  return <button>Click Me</button>;
}

export default MyButton;
```

You can use it inside another component:

```jsx
function App() {
  return (
    <div>
      <h1>Welcome to React</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

export default App;
```

Both buttons are created using the same component.

### What is JSX?

JSX allows you to write HTML-like markup inside JavaScript.

```jsx
function Welcome() {
  const name = "Alex";

  return <h1>Hello, {name}!</h1>;
}
```

Output:

```text
Hello, Alex!
```

Notice `{name}`. In JSX, curly braces let you use JavaScript expressions.

For example:

```jsx
<p>{10 + 20}</p>
```

Output: `30`

**Important:** React components usually start with a capital letter, such as `Welcome`, `App`, or `ProductCard`.

---

# 2. Props, components, and conditional rendering

These are the foundations of React. Understand them before moving to hooks.

## A. What are props?

Props allow you to pass information from one component to another.

Think of a component as a machine and props as the information you give to that machine.

For example, a product card might receive a product name and price.

```jsx
function ProductCard({ name, price }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Price: ₹{price}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <ProductCard name="Laptop" price={50000} />
      <ProductCard name="Phone" price={20000} />
    </div>
  );
}

export default App;
```

The output displays two product cards:

```text
Laptop
Price: ₹50000

Phone
Price: ₹20000
```

### How does this work?

When you write:

```jsx
<ProductCard name="Laptop" price={50000} />
```

React passes the values to the `ProductCard` component.

The component receives them here:

```jsx
function ProductCard({ name, price }) {
```

This is JavaScript object destructuring. The equivalent, without destructuring, is:

```jsx
function ProductCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Price: ₹{props.price}</p>
    </div>
  );
}
```

Both approaches work.

### Important rules about props

- Props are passed from a parent component to a child component.
- Props are read-only. A child should not directly modify its props.
- Props make components reusable.
- Props can contain strings, numbers, arrays, objects, functions, and other React elements.

For example, a parent can pass a function to a child:

```jsx
function Child({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}

function App() {
  function sayHello() {
    alert("Hello!");
  }

  return <Child onClick={sayHello} />;
}
```

Here, the child receives a function and calls it when the button is clicked.

**Remember:** Props are for passing information into a component.

---

## B. What is conditional rendering?

Conditional rendering means displaying different UI depending on a condition.

For example:

- If a user is logged in, show a dashboard.
- If a user is not logged in, show a login message.
- If data is loading, show a loading indicator.
- If a shopping cart is empty, show an empty-cart message.

### Method 1: Using `if`

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }

  return <h1>Please log in.</h1>;
}
```

Usage:

```jsx
<Greeting isLoggedIn={true} />
```

Output:

```text
Welcome back!
```

### Method 2: Using the ternary operator

The ternary operator has this structure:

```javascript
condition ? valueIfTrue : valueIfFalse;
```

React example:

```jsx
function Greeting({ isLoggedIn }) {
  return <div>{isLoggedIn ? <h1>Welcome!</h1> : <h1>Please log in.</h1>}</div>;
}
```

### Method 3: Using `&&`

Use `&&` when you want to display something only if a condition is true.

```jsx
function Notification({ hasMessage }) {
  return <div>{hasMessage && <p>You have a new message!</p>}</div>;
}
```

If `hasMessage` is `true`, the message appears. If it's `false`, the message doesn't appear.

**One important detail:** Avoid writing `{count && <p>...</p>}` when `count` might be `0`. React can display the number `0`. Use `{count > 0 && <p>...</p>}` instead.

---

# 3. Understanding React Hooks

A **hook** is a special React function that lets a function component use React features such as state, effects, shared context, and references.

Your list contains several hooks, but they solve different problems.

| Hook            | Main purpose                                 | Simple example                      |
| --------------- | -------------------------------------------- | ----------------------------------- |
| `useState()`    | Store changing data                          | Counter, input field                |
| `useEffect()`   | Synchronize with external systems            | Fetch data, timers, event listeners |
| `useContext()`  | Read shared information                      | Theme, logged-in user               |
| `useRef()`      | Keep a reference without triggering a render | Focus an input                      |
| `useMemo()`     | Cache a calculated value                     | Expensive calculations              |
| `useCallback()` | Cache a function reference                   | Optimizing child components         |
| `useNavigate()` | Navigate to another page                     | Redirect after login                |
| `useParams()`   | Read URL parameters                          | Get a product ID                    |
| `useQuery()`    | Fetch and cache server data                  | Load products                       |
| `useMutation()` | Create, update, or delete server data        | Add a product                       |

A small distinction: `useNavigate()` and `useParams()` belong to React Router, while `useQuery()` and `useMutation()` are commonly used from TanStack Query. They are not built-in React hooks.

Let's understand each one.

---

# 4. `useState()` — Managing changing data

## What problem does it solve?

Suppose you want to build a counter.

When a user clicks a button, the displayed number should increase.

Without React state, you could change a variable in JavaScript, but React wouldn't automatically know that it needs to update the displayed UI.

This is where `useState()` comes in.

**`useState()` stores a value that React remembers between renders and provides a function to update it.**

### Basic example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
```

### Understand this line

```jsx
const [count, setCount] = useState(0);
```

It contains three parts:

- `count`: the current state value.
- `setCount`: the function used to update the state.
- `0`: the initial state value.

Initially:

```text
count = 0
```

When you click the button:

```jsx
setCount(count + 1);
```

React updates the state and renders the component again.

The displayed value becomes `1`.

If you click again, it becomes `2`.

### Why not just use a normal variable?

Consider:

```jsx
function Counter() {
  let count = 0;

  return <button onClick={() => count++}>Count: {count}</button>;
}
```

This won't work as expected. Changing `count` doesn't tell React to render the component again, and a new render would create a fresh local variable.

State is designed for data that changes and affects the UI.

### Updating state based on the previous value

A useful pattern is:

```jsx
setCount((previousCount) => previousCount + 1);
```

This tells React to calculate the next value from the previous state.

It is particularly useful when multiple updates may be queued.

### Example: Input field

```jsx
import { useState } from "react";

function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
      />

      <p>Hello, {name || "Guest"}!</p>
    </div>
  );
}
```

When you type into the input, React updates `name` and displays the new value.

Here:

- `value={name}` connects the input to React state.
- `onChange` runs when the input value changes.
- `event.target.value` contains the text entered by the user.
- `setName()` updates the state.

This is called a **controlled input**.

### When should you use `useState()`?

Use it for:

- Form inputs
- Counters
- Dropdown visibility
- Modal visibility
- Selected tabs
- Shopping cart information
- Loading and error states

**Remember:** If changing a value should update the UI, `useState()` is often the right starting point.

---

# 5. `useEffect()` — Performing side effects

## What problem does it solve?

Imagine you want your React application to:

- Fetch information from an API.
- Start a timer.
- Listen for browser events.
- Update the page title.
- Connect to an external service.

These operations involve something outside React's normal process of calculating and displaying the UI. They are commonly called **side effects**.

React's `useEffect()` hook lets you synchronize a component with external systems.

### Basic syntax

```jsx
useEffect(() => {
  // Code that performs the effect

  return () => {
    // Optional cleanup code
  };
}, [dependencies]);
```

Let's understand the three parts:

1. **Effect function:** The code React runs after rendering.
2. **Dependencies:** Values that determine when React should run the effect again.
3. **Cleanup function:** Optional code that cleans up the previous effect.

### Example 1: Run an effect when the component mounts

```jsx
import { useEffect } from "react";

function Welcome() {
  useEffect(() => {
    console.log("Component appeared!");
  }, []);

  return <h1>Welcome to React</h1>;
}

export default Welcome;
```

The empty dependency array `[]` means the effect doesn't need to rerun because of changes to component props or state.

In ordinary use, the effect runs when the component mounts. In React Strict Mode, development builds may run an additional setup-and-cleanup cycle to help detect bugs.

### Example 2: Run an effect when a value changes

```jsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

When the count changes, React runs the effect and updates the browser tab title.

The important line is:

```jsx
}, [count]);
```

This tells React that the effect depends on `count`.

### Example 3: Run an effect after every render

```jsx
useEffect(() => {
  console.log("Rendered");
});
```

Because there is no dependency array, React runs the effect after every committed render.

Be careful: If an effect updates state on every run, it can cause an infinite render loop.

### Understanding dependency arrays

| Code                           | When does the effect run?                                   |
| ------------------------------ | ----------------------------------------------------------- |
| `useEffect(() => {})`          | After every committed render                                |
| `useEffect(() => {}, [])`      | After mounting, subject to development Strict Mode behavior |
| `useEffect(() => {}, [count])` | After mounting and when `count` changes                     |

### Example 4: Cleanup with `useEffect()`

Suppose you start a timer when a component appears. You should stop the timer when the component disappears.

```jsx
import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("Timer is running");
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <h2>Timer started</h2>;
}
```

What happens?

1. The component appears.
2. React runs the effect.
3. A timer starts.
4. When the component is removed, React runs the cleanup function.
5. The timer stops.

Cleanup is important for timers, event listeners, subscriptions, and other resources that must be released.

### When should you use `useEffect()`?

Use it when synchronizing with something outside React, such as:

- Browser APIs
- Timers
- Event listeners
- Subscriptions
- External connections

You can also fetch data in an effect, but you need to handle loading, errors, cancellation, and stale responses carefully. For server data, TanStack Query is often a better solution.

**Beginner tip:** Don't use `useEffect()` for everything. If you can calculate a value directly from existing props or state, you usually don't need an effect.

For example, this is unnecessary:

```jsx
const [firstName, setFirstName] = useState("Alex");
const [lastName, setLastName] = useState("Smith");

const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Instead, calculate the value directly:

```jsx
const fullName = `${firstName} ${lastName}`;
```

This is simpler and avoids an unnecessary extra render.

---

# 6. `useContext()` — Sharing data across components

## What problem does it solve?

Imagine your application has the following structure:

```text
App
 ├── Navbar
 │    └── UserProfile
 └── Dashboard
      └── UserProfile
```

Both `Navbar` and `Dashboard` need the logged-in user's information.

One solution is to pass the user as props through every level of the component tree.

However, passing props through components that don't actually need the information can become inconvenient. This is called **prop drilling**.

`useContext()` allows components to read shared values from a React context without passing those values through every intermediate component.

## Example: Sharing a theme

### Step 1: Create a context

```jsx
import { createContext } from "react";

export const ThemeContext = createContext("light");
```

The argument `"light"` is the default value used when no matching provider supplies a value.

### Step 2: Provide a value

```jsx
import { ThemeContext } from "./ThemeContext";

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Navbar />
    </ThemeContext.Provider>
  );
}
```

The provider makes `"dark"` available to components inside it.

### Step 3: Read the value

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Navbar() {
  const theme = useContext(ThemeContext);

  return (
    <nav>
      <p>Current theme: {theme}</p>
    </nav>
  );
}

export default Navbar;
```

Output:

```text
Current theme: dark
```

### How does it work?

The data flows like this:

```text
ThemeContext
     |
     v
ThemeContext.Provider
     |
     v
     App
     |
     v
   Navbar
     |
     v
useContext(ThemeContext)
     |
     v
theme = "dark"
```

If the provider's value changes, components consuming that context can re-render.

### Practical example: Login information

You might share a logged-in user across your application.

```jsx
const AuthContext = createContext(null);
```

Your provider could supply:

```jsx
<AuthContext.Provider value={{ user, setUser }}>
  {children}
</AuthContext.Provider>
```

A component can then read the shared information:

```jsx
const { user, setUser } = useContext(AuthContext);
```

This is useful for authentication information, themes, language settings, and other values shared by many components.

**Remember:**

- Props pass data directly from parent to child.
- Context makes a value available to components within a provider.
- Context doesn't automatically replace every need for state management.

---

# 7. `useRef()` — Remembering a value without triggering a render

## What problem does it solve?

Sometimes you need to remember a value between renders without making that value part of the UI.

For example:

- You want to focus an input automatically.
- You need to store a timer ID.
- You want to remember a DOM element.
- You need to keep track of a value without triggering a render when it changes.

That's what `useRef()` is for.

## Example 1: Focus an input

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Search..." />

      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default SearchBox;
```

### How does this work?

First:

```jsx
const inputRef = useRef(null);
```

This creates a ref object with a `current` property.

Next:

```jsx
<input ref={inputRef} />
```

React assigns the actual input DOM element to `inputRef.current` when the input is mounted.

Finally:

```jsx
inputRef.current.focus();
```

This calls the browser's focus method on the input element.

When you click the button, the input receives focus.

## Example 2: Store a value without re-rendering

```jsx
import { useRef, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current += 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Render count: {renderCount.current}</p>

      <button onClick={() => setCount((c) => c + 1)}>Increase Count</button>
    </div>
  );
}
```

This illustrates that a ref can retain a value across renders. However, changing `renderCount.current` does not trigger a render by itself.

For learning purposes, this example is fine, but avoid using refs for values that directly determine visible UI. Also, reading or writing refs during rendering requires care; in production code, a ref used to track render counts is better updated in an effect.

### `useState()` vs `useRef()`

| Feature                              | `useState()`                                 | `useRef()`              |
| ------------------------------------ | -------------------------------------------- | ----------------------- |
| Remembers values between renders     | Yes                                          | Yes                     |
| Updating its value triggers a render | Yes, when the state update changes the value | No                      |
| Common use                           | Data displayed in the UI                     | DOM elements, timer IDs |
| Example                              | Current counter value                        | Input element reference |

**Remember:** Use state when a value should update the UI. Use a ref when you need to retain a value without triggering a render.

---

# 8. `useMemo()` — Caching a calculated value

## What problem does it solve?

Suppose you have a list of 10,000 products and want to filter products by price.

Filtering the list every time a component renders might be unnecessarily expensive.

`useMemo()` lets React cache the result of a calculation and reuse it until its dependencies change.

### Example

```jsx
import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Tablet", price: 15000 },
];

function ProductList() {
  const [maxPrice, setMaxPrice] = useState(30000);

  const filteredProducts = useMemo(() => {
    console.log("Filtering products");

    return products.filter((product) => product.price <= maxPrice);
  }, [maxPrice]);

  return (
    <div>
      <input
        type="number"
        value={maxPrice}
        onChange={(event) => setMaxPrice(Number(event.target.value))}
      />

      {filteredProducts.map((product) => (
        <p key={product.id}>
          {product.name}: ₹{product.price}
        </p>
      ))}
    </div>
  );
}

export default ProductList;
```

### How does it work?

This is the important part:

```jsx
const filteredProducts = useMemo(() => {
  return products.filter((product) => product.price <= maxPrice);
}, [maxPrice]);
```

React calculates the filtered list and caches the result.

When `maxPrice` changes, React recalculates the list.

When the component re-renders for an unrelated reason and `maxPrice` hasn't changed, React can reuse the cached result.

### When should you use `useMemo()`?

Use it when:

- A calculation is genuinely expensive.
- You need to preserve the identity of an object or array between renders.
- Profiling shows that recalculating a value is a performance problem.

Don't use it for every calculation.

For example, this doesn't need memoization:

```jsx
const total = price * quantity;
```

Just calculate it directly.

**Remember:** `useMemo()` caches a value, not a function.

---

# 9. `useCallback()` — Caching a function reference

## What problem does it solve?

In JavaScript, creating a function inside a component creates a function reference during rendering.

Sometimes, that new reference can cause unnecessary work in a child component that receives the function as a prop.

`useCallback()` lets React reuse a function reference until its dependencies change.

### Example

```jsx
import { useState, useCallback, memo } from "react";

const ChildButton = memo(function ChildButton({ onClick }) {
  console.log("ChildButton rendered");

  return <button onClick={onClick}>Click Child</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>

      <ChildButton onClick={handleClick} />

      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
      />
    </div>
  );
}

export default Parent;
```

### How does it work?

The key part is:

```jsx
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);
```

React can reuse the same function reference between renders because this function doesn't depend on any changing values from the component.

The `memo()` wrapper around `ChildButton` allows React to skip re-rendering the child when its props remain unchanged.

As a result, typing into the input doesn't need to cause `ChildButton` to re-render, assuming its other props remain unchanged.

### What if the function depends on a value?

Suppose the callback uses `count` directly:

```jsx
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

Now the function reference can change whenever `count` changes.

The dependency array must include the reactive values used by the callback.

### `useMemo()` vs `useCallback()`

| Hook            | What it caches       | Typical example                          |
| --------------- | -------------------- | ---------------------------------------- |
| `useMemo()`     | A calculated value   | Filtered product list                    |
| `useCallback()` | A function reference | Event handler passed to a memoized child |

A useful way to remember them:

```jsx
useMemo(() => calculateValue(), [dependency]);
```

```jsx
useCallback(() => doSomething(), [dependency]);
```

**Beginner tip:** You usually don't need `useCallback()` for every event handler. Start with simple functions and introduce memoization when there's a real performance reason.

---

# 10. React Router — Moving between pages

Before learning `useNavigate()` and `useParams()`, you need to understand React Router.

## What is React Router?

React Router is a library that lets users navigate between different pages or views in a React application.

Imagine an online shopping website:

```text
Home Page        /
Products Page    /products
About Page       /about
Product Details  /products/101
```

When a user clicks a link, React Router displays the appropriate component for the URL.

You generally don't want to reload the entire page every time the user navigates within a React application.

### Step 1: Install React Router

In your project terminal, run:

```bash
npm install react-router
```

For a new application using the current React Router library, you can use its declarative routing APIs as follows. Existing projects may use `react-router-dom`, especially projects created with older tutorials.

### Step 2: Create some page components

```jsx
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Products() {
  return <h1>Products Page</h1>;
}

export { Home, About, Products };
```

You can put these components in separate files as your application grows.

### Step 3: Configure the routes

In your application entry component:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router";

import { Home, About, Products } from "./Pages";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

If you're using a project configured with `react-router-dom`, you may see the same APIs imported from that package instead. Follow the package and version used by your project.

### How does it work?

Consider this route:

```jsx
<Route path="/about" element={<About />} />
```

It means:

"When the URL matches `/about`, display the `About` component."

The `Link` component:

```jsx
<Link to="/about">About</Link>
```

allows the user to navigate to that URL.

### Why use `Link` instead of an ordinary anchor?

You can use an HTML anchor:

```html
<a href="/about">About</a>
```

But it normally triggers a full-page navigation.

React Router's `Link` performs client-side navigation, allowing the router to update the displayed route without a normal full-page reload.

**Remember:** React Router manages navigation and maps URLs to components.

---

# 11. `useNavigate()` — Navigate programmatically

## What problem does it solve?

Sometimes, you want to move the user to another page after an action.

Examples:

- After a successful login, navigate to the dashboard.
- After saving a form, navigate to the profile page.
- After deleting an item, return to the product list.

You cannot always solve these situations with a simple `Link`.

`useNavigate()` gives you a function for navigating programmatically.

### Example: Navigate after login

```jsx
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    // Demonstration only: this is not real authentication.
    if (username.trim() !== "") {
      navigate("/dashboard");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username"
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
```

### Understand the important lines

First:

```jsx
const navigate = useNavigate();
```

This gives you a navigation function.

Then:

```jsx
navigate("/dashboard");
```

This navigates to the dashboard route.

For example, your router could contain:

```jsx
<Route path="/dashboard" element={<Dashboard />} />
```

When the login handler calls `navigate("/dashboard")`, React Router displays the dashboard component.

### Other useful examples

Navigate to the products page:

```jsx
navigate("/products");
```

Go back one entry in the browser history:

```jsx
navigate(-1);
```

Replace the current history entry:

```jsx
navigate("/dashboard", { replace: true });
```

Replacing the current entry can be useful when you don't want the user to return to the previous route using the Back button.

### When should you use `useNavigate()`?

Use it when navigation should happen as a result of an action or application logic.

Use `Link` for ordinary navigation links that users click.

**Important:** In a real application, successful navigation after login should depend on actual authentication, not just whether a username was entered.

---

# 12. `useParams()` — Reading values from the URL

## What problem does it solve?

Suppose your website displays product details.

You have many products, but you want to use the same component to display each product.

Your URLs might look like this:

```text
/products/101
/products/102
/products/103
```

Instead of creating a separate component for every product, you can extract the product ID from the URL.

That's what `useParams()` does.

### Step 1: Define a route with a parameter

```jsx
<Route path="/products/:productId" element={<ProductDetails />} />
```

Notice:

```text
:productId
```

The colon indicates a URL parameter.

The route matches URLs such as:

```text
/products/101
/products/102
/products/103
```

### Step 2: Read the parameter

```jsx
import { useParams } from "react-router";

function ProductDetails() {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
    </div>
  );
}

export default ProductDetails;
```

If the user visits:

```text
/products/101
```

The component receives:

```javascript
productId = "101";
```

Notice that URL parameters are strings. Convert them to numbers if your application requires numeric values.

### Example: Display the correct product

```jsx
import { useParams } from "react-router";

const products = [
  { id: 101, name: "Laptop", price: 50000 },
  { id: 102, name: "Phone", price: 20000 },
  { id: 103, name: "Tablet", price: 15000 },
];

function ProductDetails() {
  const { productId } = useParams();

  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.price}</p>
    </div>
  );
}
```

Now, visiting `/products/102` displays the phone.

This example uses local data. In a real application, you would usually fetch the product from an API.

### `useNavigate()` vs `useParams()`

| Hook            | Purpose                            | Example                          |
| --------------- | ---------------------------------- | -------------------------------- |
| `useNavigate()` | Change the current route           | `navigate("/products")`          |
| `useParams()`   | Read values from the current route | `productId` from `/products/101` |

**Remember:** `useNavigate()` changes where you go. `useParams()` tells you information contained in the current URL.

---

# 13. REST APIs — How React communicates with a server

Before learning `useQuery()` and `useMutation()`, you need to understand APIs.

## What is an API?

An API allows two software systems to communicate.

For example, imagine your React application displays products. The product information might be stored in a database on a server.

React needs to request that information from the server.

The communication looks like this:

```text
React Application
       |
       | HTTP request
       v
   Backend API
       |
       v
    Database
       |
       v
   Backend API
       |
       | HTTP response
       v
React displays products
```

React usually doesn't connect directly to the database. It communicates with a backend API, which handles the database operations.

## What is a REST API?

REST is an architectural style for designing networked APIs.

A REST-style API often uses HTTP methods such as these:

| HTTP method | Typical purpose           | Example                  |
| ----------- | ------------------------- | ------------------------ |
| `GET`       | Retrieve information      | Get all products         |
| `POST`      | Create a resource         | Add a product            |
| `PUT`       | Replace a resource        | Replace a product        |
| `PATCH`     | Update part of a resource | Change a product's price |
| `DELETE`    | Delete a resource         | Delete a product         |

Imagine an API that manages products:

```text
GET     /products
GET     /products/101
POST    /products
PATCH   /products/101
DELETE  /products/101
```

These endpoints represent common operations on product data.

### What is JSON?

APIs commonly send and receive JSON data.

For example:

```json
{
  "id": 101,
  "name": "Laptop",
  "price": 50000
}
```

React can use this data to display a product card.

### What is an HTTP status code?

The server returns a status code to indicate the result of a request.

Common examples:

| Status code | Meaning                           |
| ----------- | --------------------------------- |
| `200`       | Request succeeded                 |
| `201`       | Resource created                  |
| `400`       | Invalid request                   |
| `401`       | Authentication required or failed |
| `403`       | Access forbidden                  |
| `404`       | Resource not found                |
| `500`       | Internal server error             |

A successful HTTP response doesn't necessarily mean the server returned the exact data your application expected, so your application should still handle errors and validate important data.

---

# 14. Axios — Making HTTP requests from React

## What is Axios?

Axios is a JavaScript library for making HTTP requests.

You can use it to:

- Fetch products.
- Submit login credentials.
- Create new records.
- Update user information.
- Delete records.

Axios is not a React hook. It's a separate library that you can use inside React components, event handlers, or other JavaScript modules.

## Step 1: Install Axios

Run this command in your project terminal:

```bash
npm install axios
```

## Step 2: Fetch data with Axios

For practice, we'll use a public sample API.

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );

        setUsers(response.data);
      } catch (err) {
        setError("Unable to load users.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Users;
```

### Let's understand this code step by step

**Step 1: Create state**

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

We have three pieces of state:

- `users`: stores the returned user list.
- `loading`: indicates whether the request is in progress.
- `error`: stores an error message if the request fails.

**Step 2: Send the request**

```jsx
const response = await axios.get("https://jsonplaceholder.typicode.com/users");
```

Axios sends a GET request to the API.

The `await` keyword waits for the promise to settle before proceeding.

**Step 3: Read the returned data**

```jsx
setUsers(response.data);
```

Axios puts the response body in `response.data`.

For this endpoint, the data is an array of user objects.

**Step 4: Handle loading and errors**

```jsx
if (loading) {
  return <p>Loading users...</p>;
}

if (error) {
  return <p>{error}</p>;
}
```

The component displays different UI depending on the request state.

**Step 5: Render the list**

```jsx
{
  users.map((user) => <p key={user.id}>{user.name}</p>);
}
```

The `map()` method creates a paragraph for each user.

The `key` helps React identify list items between renders. A stable, unique identifier such as `user.id` is preferable to an array index when the list can change.

### What is `async/await`?

This code:

```jsx
const response = await axios.get("/api/users");
```

waits for the asynchronous operation to complete.

The surrounding function must be declared `async`:

```jsx
async function fetchUsers() {
  const response = await axios.get("/api/users");
}
```

In React, don't make the effect callback itself `async`, because an effect callback should return either nothing or a cleanup function—not a promise.

### Example: Sending a POST request

Suppose you want to create a user:

```jsx
async function createUser() {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      {
        name: "Alex",
        email: "alex@example.com",
      },
    );

    console.log(response.data);
  } catch (error) {
    console.error("Unable to create user", error);
  }
}
```

The second argument to `axios.post()` is the request body.

This public sample API simulates creating a user; it doesn't persist the new user as a real database record.

**Important:** In a real application, the backend URL, authentication requirements, validation, and error handling depend on your API.

---

# 15. TanStack Query — Managing API data

Now we reach one of the most useful topics in modern React development.

You already know how to fetch data using Axios and `useEffect()`. However, real applications often need much more than a simple API request.

For example:

- Fetch products from a server.
- Show a loading indicator.
- Display errors.
- Cache previously fetched data.
- Avoid unnecessary repeated requests.
- Refresh data after creating or updating a product.
- Refetch data when appropriate.

Managing all these tasks manually can become complicated.

**TanStack Query helps manage server data, including fetching, caching, loading states, errors, and updates.**

It is also called a server-state management library.

## First, understand client state vs server state

Imagine a product management application.

### Client state

Information primarily managed in your React application:

```javascript
const [isModalOpen, setIsModalOpen] = useState(false);
```

Examples:

- Is a modal open?
- Which tab is selected?
- What text is currently in a search input?

### Server state

Information that comes from a backend server:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 50000
  },
  {
    "id": 2,
    "name": "Phone",
    "price": 20000
  }
]
```

Examples:

- Product lists
- User profiles
- Orders
- Comments
- Notifications from a server

React's `useState()` can store server data, but you would have to manage caching, refetching, and synchronization yourself.

TanStack Query provides tools to manage these concerns.

---

# 16. `useQuery()` — Fetching and caching data

## What does `useQuery()` do?

`useQuery()` is a TanStack Query hook for reading data asynchronously, usually from an API.

It manages the state of a query and gives you information such as:

- `data`: the successfully returned data.
- `isPending`: whether a successful result is not yet available.
- `isFetching`: whether a request is currently running.
- `isError`: whether the query has an error.
- `error`: information about the error.
- `refetch`: a function that can manually trigger another request.

The exact status behavior depends on the query's state and options. For example, cached data may be available even while a background refetch is running.

## Step 1: Install the libraries

Run:

```bash
npm install @tanstack/react-query axios
```

## Step 2: Set up the Query Client

TanStack Query uses a `QueryClient` to manage query caching and related behavior.

In your application entry file, such as `main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
```

### What does this do?

```jsx
const queryClient = new QueryClient();
```

Creates the object responsible for managing query data and caching.

Then:

```jsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

Makes that query client available to descendant components.

**Important:** Create the `QueryClient` outside the component that renders your application, as shown above, so that ordinary renders don't create a new client and reset its cache.

## Step 3: Fetch data with `useQuery()`

Let's fetch users from the same sample API.

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  return response.data;
}

function Users() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Users</h1>

      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Users;
```

Let's understand the important parts.

### A. `queryKey`

```jsx
queryKey: ["users"];
```

The query key identifies the data being fetched.

Think of it as the name of the cached data.

For example:

```jsx
["users"];
```

represents the user list.

```jsx
["products"];
```

represents the product list.

```jsx
["product", 101];
```

represents the details for product 101.

Query keys should include the changing values that determine which data is requested.

For example:

```jsx
useQuery({
  queryKey: ["product", productId],
  queryFn: () => fetchProduct(productId),
});
```

When `productId` changes, the query key changes, so TanStack Query treats it as a different query.

### B. `queryFn`

```jsx
queryFn: fetchUsers;
```

This is the function responsible for fetching the data.

In our example:

```jsx
async function fetchUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  return response.data;
}
```

Notice that `queryFn` receives the function itself:

```jsx
queryFn: fetchUsers;
```

You are not calling it directly here.

TanStack Query controls when to execute it.

### C. `data`

```jsx
const { data } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
```

Once the query succeeds, `data` contains the returned user array.

You can then render it:

```jsx
data.map((user) => <p key={user.id}>{user.name}</p>);
```

Handle the loading or missing-data state before accessing `data`.

### D. `isPending` and `isError`

```jsx
if (isPending) {
  return <p>Loading...</p>;
}

if (isError) {
  return <p>Something went wrong.</p>;
}
```

These flags allow you to display different UI based on the request status.

### How is `useQuery()` different from `useEffect()`?

Consider the manual approach:

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

You must manage the state and write the request logic yourself.

With TanStack Query:

```jsx
const { data, isPending, isError } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
```

TanStack Query manages much of that server-state behavior for you.

| Feature                   | `useEffect()` + `useState()` | TanStack Query        |
| ------------------------- | ---------------------------- | --------------------- |
| Make an API request       | Yes                          | Yes                   |
| Manage loading state      | You implement it             | Provided by the query |
| Manage errors             | You implement it             | Provided by the query |
| Cache results             | You implement it             | Built in              |
| Coordinate refetching     | You implement it             | Built in              |
| Manage cache invalidation | You implement it             | Built in              |

TanStack Query is not a replacement for every use of `useEffect()`. The two tools solve different problems.

### What is caching?

Imagine you visit the users page and then navigate to the dashboard.

Later, you return to the users page.

TanStack Query can reuse the previously fetched data instead of always starting from scratch.

Depending on your configuration and the query's freshness, it may also refetch the data.

By default, successfully fetched queries become stale after a short period. Stale queries may be refetched when certain events occur, such as revisiting a page or returning focus to the window.

You can configure this behavior:

```jsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  staleTime: 60_000,
});
```

Here, `staleTime: 60_000` means the data is considered fresh for 60 seconds after it is successfully fetched.

**Remember:** `useQuery()` is mainly for fetching and reading server data.

---

# 17. `useMutation()` — Creating, updating, and deleting data

## What problem does it solve?

Imagine a product management dashboard.

You need to perform operations such as:

- Create a product.
- Update a product.
- Delete a product.
- Submit an order.
- Update a user's profile.

These operations change server data.

In TanStack Query, `useMutation()` is commonly used for these operations.

### `useQuery()` vs `useMutation()`

| `useQuery()`                                          | `useMutation()`                                          |
| ----------------------------------------------------- | -------------------------------------------------------- |
| Mainly reads server data                              | Performs server-side operations                          |
| Usually fetches data when the query becomes active    | Usually runs when you call `mutate()` or `mutateAsync()` |
| Uses `queryKey` to identify cached data               | Uses a `mutationFn` to perform the operation             |
| Can cache successful query results                    | Tracks mutation status and results                       |
| Can automatically refetch under configured conditions | Often followed by query invalidation or cache updates    |

An important detail: A mutation can perform any appropriate asynchronous operation, but it is typically used for operations that create, update, or delete data.

## Example: Creating a new user

We will use Axios to send the POST request and TanStack Query to manage the mutation.

```jsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function createUser(user) {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user,
  );

  return response.data;
}

function CreateUser() {
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: createUser,
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    mutation.mutate({
      name: name.trim(),
    });
  }

  return (
    <div>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter user name"
        />

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create User"}
        </button>
      </form>

      {mutation.isSuccess && <p>User created: {mutation.data.name}</p>}

      {mutation.isError && (
        <p>Failed to create user: {mutation.error.message}</p>
      )}
    </div>
  );
}

export default CreateUser;
```

This example demonstrates mutation handling. The sample API simulates the creation operation and doesn't persist the new user in a real database.

### Understand the code

**Step 1: Define the API function**

```jsx
async function createUser(user) {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user,
  );

  return response.data;
}
```

The function accepts user data and sends it to the server.

**Step 2: Create the mutation**

```jsx
const mutation = useMutation({
  mutationFn: createUser,
});
```

This tells TanStack Query which function to run when you trigger the mutation.

**Step 3: Trigger the mutation**

```jsx
mutation.mutate({
  name: name.trim(),
});
```

This calls the mutation function with the supplied data.

TanStack Query then tracks the mutation's status.

**Step 4: Show the loading state**

```jsx
disabled={mutation.isPending}
```

This prevents the button from being clicked while the mutation is pending.

**Step 5: Display the result**

```jsx
{
  mutation.isSuccess && <p>User created: {mutation.data.name}</p>;
}
```

When the operation succeeds, the success message appears.

If the request fails, the error message appears instead.

### Other useful mutation properties

```jsx
mutation.mutate(data);
```

Starts the mutation.

```jsx
mutation.isPending;
```

Indicates that the mutation is pending.

```jsx
mutation.isSuccess;
```

Indicates that the mutation succeeded.

```jsx
mutation.isError;
```

Indicates that the mutation failed.

```jsx
mutation.data;
```

Contains the successful result, when available.

```jsx
mutation.error;
```

Contains the error, when available.

You can also use:

```jsx
await mutation.mutateAsync(data);
```

`mutateAsync()` returns a promise, so it can be useful when you want to perform additional asynchronous steps after the mutation succeeds or handle its failure with `try/catch`.

---

## 18. An important TanStack Query concept: Invalidating cached data

Suppose your application displays a list of products.

You use `useQuery()` to fetch them:

```jsx
useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});
```

Then you use `useMutation()` to add a new product.

The server now contains the new product, but your cached product list may not yet include it.

How can you tell TanStack Query to refresh that list?

You can use `useQueryClient()` and `invalidateQueries()`.

### Example

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

async function createProduct(product) {
  const response = await axios.post("/api/products", product);

  return response.data;
}

function AddProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  function handleAddProduct() {
    mutation.mutate({
      name: "Laptop",
      price: 50000,
    });
  }

  return (
    <button onClick={handleAddProduct} disabled={mutation.isPending}>
      Add Product
    </button>
  );
}
```

Here, `/api/products` is an illustrative endpoint that your backend would need to provide.

### What happens?

1. The user clicks **Add Product**.
2. The mutation sends a POST request.
3. The server creates the product.
4. The mutation succeeds.
5. `onSuccess()` runs.
6. TanStack Query invalidates the cached product query.
7. An active, invalidated query will generally refetch its data.

This helps keep the UI synchronized with the server.

**Remember this pattern:**

- `useQuery()` reads server data.
- `useMutation()` changes server data.
- `invalidateQueries()` marks matching cached data as stale so it can be refreshed.

These three concepts work together in many real-world React applications.

---

# 19. How React Router, Axios, and TanStack Query work together

This is where the individual concepts start making sense as a complete application.

Imagine you are building an e-commerce website.

A user visits:

```text
/products/101
```

You want to display the details of product 101.

Several tools can work together to accomplish this.

### Step 1: React Router identifies the page

```jsx
<Route path="/products/:productId" element={<ProductDetails />} />
```

React Router displays the `ProductDetails` component.

### Step 2: `useParams()` reads the product ID

```jsx
const { productId } = useParams();
```

For `/products/101`, the value is `"101"`.

### Step 3: `useQuery()` fetches the product

```jsx
const { data, isPending, isError } = useQuery({
  queryKey: ["product", productId],
  queryFn: () => fetchProduct(productId),
});
```

The query key identifies the product being requested.

### Step 4: Axios communicates with the API

```jsx
async function fetchProduct(productId) {
  const response = await axios.get(`/api/products/${productId}`);

  return response.data;
}
```

Axios sends the GET request to your backend.

### Step 5: React displays the result

```jsx
if (isPending) {
  return <p>Loading product...</p>;
}

if (isError) {
  return <p>Unable to load the product.</p>;
}

return (
  <div>
    <h1>{data.name}</h1>
    <p>Price: ₹{data.price}</p>
  </div>
);
```

### Complete component

Here is how those concepts fit together:

```jsx
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(productId) {
  const response = await axios.get(`/api/products/${productId}`);

  return response.data;
}

function ProductDetails() {
  const { productId } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  if (isPending) {
    return <p>Loading product...</p>;
  }

  if (isError) {
    return <p>Failed to load product.</p>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Price: ₹{data.price}</p>
    </div>
  );
}

export default ProductDetails;
```

This example assumes your backend implements the `/api/products/:productId` endpoint.

### Understand the complete flow

```text
User visits /products/101
            |
            v
    React Router matches
            |
            v
     ProductDetails
            |
            v
     useParams()
            |
            v
     productId = "101"
            |
            v
       useQuery()
            |
            v
      Axios GET request
            |
            v
       Backend API
            |
            v
      Product information
            |
            v
       React displays UI
```

This is a common pattern in real-world React applications.

---

# 20. Quick revision: All the concepts compared

You have now learned the main concepts in your list. Let's bring them together.

| Concept               | What it does                                            | Example                                         |
| --------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| Components            | Divide the UI into reusable pieces                      | `ProductCard`                                   |
| Props                 | Pass information into components                        | `<ProductCard name="Laptop" />`                 |
| Conditional rendering | Display UI based on a condition                         | `isLoggedIn ? <Dashboard /> : <Login />`        |
| `useState()`          | Store changing UI data                                  | `setCount(count + 1)`                           |
| `useEffect()`         | Synchronize with external systems                       | Start or stop a timer                           |
| `useContext()`        | Read shared values from a context                       | `useContext(ThemeContext)`                      |
| `useRef()`            | Retain a value or reference without triggering a render | `inputRef.current.focus()`                      |
| `useMemo()`           | Cache a calculated value                                | Cache a filtered list                           |
| `useCallback()`       | Cache a function reference                              | Reuse a callback passed to a memoized child     |
| React Router          | Map URLs to components                                  | `/products` displays the products page          |
| `useNavigate()`       | Navigate programmatically                               | `navigate("/dashboard")`                        |
| `useParams()`         | Read route parameters                                   | Read `productId` from `/products/101`           |
| Axios                 | Send HTTP requests                                      | `axios.get("/api/products")`                    |
| `useQuery()`          | Fetch and cache server data                             | Retrieve products                               |
| `useMutation()`       | Perform server operations                               | Create a product                                |
| `invalidateQueries()` | Mark matching cached data stale                         | Refresh the product list after adding a product |

## Three distinctions you should remember

### 1. `useState()` vs `useRef()`

```jsx
const [count, setCount] = useState(0);
```

Use state when changing a value should update the UI.

```jsx
const inputRef = useRef(null);
```

Use a ref when you need to retain a value or reference without triggering a render when it changes.

### 2. `useEffect()` vs `useQuery()`

```jsx
useEffect(() => {
  // Synchronize with an external system
}, []);
```

Use effects for synchronization with external systems.

```jsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
```

Use queries to manage asynchronous server data, including caching and refetching.

### 3. `useQuery()` vs `useMutation()`

```jsx
useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});
```

Read products.

```jsx
useMutation({
  mutationFn: createProduct,
});
```

Create a product.

These are common patterns, not absolute restrictions. For example, a query function could perform a POST request if an API requires it, but mutations are generally the appropriate abstraction for operations that change server data.

---

# 21. Important React rules every beginner should know

Before you start building larger applications, understand these rules.

## Rule 1: Call hooks at the top level

Correct:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  if (count > 5) {
    return <p>Maximum reached</p>;
  }

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

Incorrect:

```jsx
function Counter() {
  if (someCondition) {
    const [count, setCount] = useState(0);
  }

  return <div>Counter</div>;
}
```

Hooks must not be called conditionally, inside loops, or inside nested functions that are not components or custom hooks.

React relies on the order of hook calls to associate state and other hook information with the correct component.

## Rule 2: Don't mutate state directly

Incorrect:

```jsx
count = count + 1;
```

Correct:

```jsx
setCount(count + 1);
```

For arrays, avoid modifying the existing state array:

```jsx
// Incorrect
items.push(newItem);
setItems(items);
```

Instead:

```jsx
// Correct
setItems((previousItems) => [...previousItems, newItem]);
```

React state should generally be treated as immutable. Create a new array or object when updating it.

## Rule 3: Use keys when rendering lists

Incorrect:

```jsx
{
  products.map((product) => <p>{product.name}</p>);
}
```

Correct:

```jsx
{
  products.map((product) => <p key={product.id}>{product.name}</p>);
}
```

A stable, unique key helps React track items when the list changes.

## Rule 4: Don't call hooks inside event handlers

Incorrect:

```jsx
function handleClick() {
  const [count, setCount] = useState(0);
}
```

Correct:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((c) => c + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

Declare hooks at the top level of your component, then use their returned values and functions inside event handlers.

---

# 22. Your learning roadmap: What to learn first

If you are starting from scratch, I recommend learning in this order.

| Stage                     | Topics                                       | Practice project             |
| ------------------------- | -------------------------------------------- | ---------------------------- |
| 1. Foundations            | JSX, components, props                       | Personal profile page        |
| 2. Interactivity          | `useState()`, event handlers                 | Counter and calculator       |
| 3. UI logic               | Conditional rendering, lists, forms          | Todo application             |
| 4. Effects and references | `useEffect()`, `useRef()`                    | Timer and searchable input   |
| 5. Shared data            | `useContext()`                               | Theme switcher               |
| 6. Navigation             | React Router, `useNavigate()`, `useParams()` | Multi-page product website   |
| 7. API communication      | REST APIs, HTTP, Axios                       | User directory               |
| 8. Server state           | TanStack Query, `useQuery()`                 | Product listing page         |
| 9. Data changes           | `useMutation()`, query invalidation          | Product management dashboard |
| 10. Performance           | `useMemo()`, `useCallback()`                 | Optimize a large list        |

You don't need to master every hook before starting a project. Learn a concept, build something with it, and then move on.

---

# 23. Practice exercises to test your understanding

Try these exercises without immediately looking for a solution.

### Exercise 1: `useState()`

Build a counter with three buttons:

- Increase
- Decrease
- Reset

Expected behavior:

```text
Count: 0

[Increase] [Decrease] [Reset]
```

Hint:

```jsx
const [count, setCount] = useState(0);
```

### Exercise 2: Props

Create a `StudentCard` component that receives:

```javascript
name;
age;
course;
```

Render three students using the same component.

### Exercise 3: Conditional rendering

Create a login page that displays:

```text
Welcome back!
```

when the user is logged in, and:

```text
Please log in.
```

when the user is logged out.

### Exercise 4: `useEffect()`

Create a component that updates the browser tab title whenever a counter changes.

Hint:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

### Exercise 5: `useContext()`

Build a theme switcher with Light Mode and Dark Mode.

Use context to share the theme with a child component.

### Exercise 6: React Router

Create three pages:

```text
/
/about
/contact
```

Add navigation links to move between them.

### Exercise 7: `useParams()`

Create a route:

```text
/products/:productId
```

Display the product ID from the URL.

### Exercise 8: Axios and `useQuery()`

Fetch users from the sample API:

`https://jsonplaceholder.typicode.com/users`

Display:

- A loading message
- An error message
- A list of users

### Exercise 9: `useMutation()`

Create a form that submits a new user to the sample API.

Display a success or error message depending on the result.

### Exercise 10: Combine everything

Build a small product management application with:

- A product list
- Product details
- Navigation
- API fetching
- Product creation
- Loading and error states

Use React Router for navigation, Axios for HTTP requests, and TanStack Query for managing server data.

---

## 24. Final mental model: How everything fits together

Think about a React application as a collection of cooperating tools.

**Components** organize your UI.

**Props** pass information between components.

**State** stores changing UI information.

**Effects** synchronize components with external systems.

**Context** shares values across components.

**Refs** retain values and references without triggering renders.

**Memoization hooks** can reduce unnecessary calculations or function-reference changes.

**React Router** determines which page to display.

**Axios** communicates with your backend.

**TanStack Query** manages the lifecycle of server data.

Here is a practical example of the overall architecture:

```text
                 React Application
                         |
              +----------+----------+
              |                     |
          Components             Router
              |                     |
        +-----+-----+          Current URL
        |           |               |
      Props       Hooks        useParams()
                    |
         +----------+----------+
         |          |          |
      useState   useEffect   useContext
         |
    User interaction
         |
    API operation
         |
       Axios
         |
    Backend REST API
         |
    TanStack Query
    +-----------+
    |           |
 useQuery   useMutation
    |           |
 Fetch data   Change data
    |           |
    +-----+-----+
          |
     Update the UI
```

This diagram is a conceptual overview rather than a strict execution sequence: Axios can be used without TanStack Query, and TanStack Query manages server-data operations through query and mutation functions.

### My recommendation

If you remember only five things from this guide, remember these:

1. **`useState()`** — Store changing information that affects the UI.
2. **`useEffect()`** — Synchronize with external systems.
3. **React Router** — Navigate between pages and read URL parameters.
4. **Axios** — Send requests to a backend API.
5. **TanStack Query** — Manage fetching, caching, and changing server data.

Once these five concepts become comfortable, the other hooks will be much easier to understand.

**The best next step is to build one small project that uses them together.** A product management application is an excellent choice because it gives you practical experience with components, forms, navigation, API calls, loading states, and CRUD operations (create, read, update, and delete).

You don't need to learn everything in one day. Focus on understanding what each tool does, why you need it, and when to use it.
