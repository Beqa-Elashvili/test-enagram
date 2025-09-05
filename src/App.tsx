import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAnimate(false);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [count]);

  return (
    <div className="bg-red-400 h-screen w-full flex justify-center gap-2  items-center">
      <button
        onClick={() => {
          setCount(count + 1), setAnimate(true);
        }}
        className=" cursor-pointer font-lg text-xl text-green-500  px-6  border border-green-500 bg-green-200 p-2 rounded-full"
      >
        increse
      </button>
      <h1
        className={`${
          animate && "scale-150"
        } text-white  font-sans transform hover:cursor-pointer duration-300 hover:scale-75`}
      >
        {count}
      </h1>
      <button
        onClick={() => {
          if (count >= 1) setCount(count - 1), setAnimate(true);
        }}
        className=" cursor-pointer font-lg text-xl text-green-500  px-6  border border-red-500 bg-red-200 p-2 rounded-full"
      >
        decrese
      </button>
    </div>
  );
}

export default App;
