import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "./redux";
import { setTextOne, setTextTwo } from "./state";

function App() {
  const dispatch = useAppDispatch();
  const textOne = useAppSelector((state) => state.global.textOne);
  const textTwo = useAppSelector((state) => state.global.textTwo);

  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);

  const handleCompare = () => {
    const wordsOne = textOne.split(/\s+/);
    const wordsTwo = textTwo.split(/\s+/);
    const commonSet = new Set(
      wordsOne.filter((word) => wordsTwo.includes(word))
    );

    const highlight = (words: string[]) =>
      words
        .map((word) =>
          commonSet.has(word)
            ? `<span class="bg-green-300 px-1 rounded">${word}</span>`
            : word
        )
        .join(" ");

    if (refOne.current) refOne.current.innerHTML = highlight(wordsOne);
    if (refTwo.current) refTwo.current.innerHTML = highlight(wordsTwo);
  };

  const handleInput = (
    action: (value: string) => any,
    e: React.FormEvent<HTMLDivElement>
  ) => {
    dispatch(action(e.currentTarget.innerText));
  };

  useEffect(() => {
    if (refOne.current && refOne.current.innerText !== textOne) {
      refOne.current.innerText = textOne;
    }
  }, [textOne]);

  useEffect(() => {
    if (refTwo.current && refTwo.current.innerText !== textTwo) {
      refTwo.current.innerText = textTwo;
    }
  }, [textTwo]);

  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <div className="md:flex space-y-4 md:space-y-0 gap-2 w-full">
        <div
          ref={refOne}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput(setTextOne, e)}
          className="flex-1 h-48 p-2  border border-blue-300 rounded overflow-auto"
        ></div>
        <div
          ref={refTwo}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput(setTextTwo, e)}
          className="flex-1 h-48 p-2 border border-blue-300 rounded overflow-auto"
        ></div>
      </div>

      <Button className="text-white" onClick={handleCompare}>
        შედარება
      </Button>
    </div>
  );
}

export default App;
