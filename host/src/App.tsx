import { lazy, useState } from "react";

const Navbar = lazy(() =>
  import("remote_navbar/Navbar").then((mod) => ({ default: mod.Navbar }))
);

function App() {
  const [count, setCount] = useState(0);

  const onIncrement = () => setCount((count) => count + 1);
  const onDecrement = () => setCount((count) => count - 1);

  return (
    <>
      <Navbar />
      <h1>Counter example with Microfrontends</h1>
      <div className="card">
        <p>Count is {count}</p>
        <p>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
        </p>
      </div>
    </>
  );
}

export default App;
