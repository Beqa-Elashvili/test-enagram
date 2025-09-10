import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "./redux";
import { setTextOne, setTextTwo } from "./state";
import { MoveHorizontal, MoveVertical } from "lucide-react";

function App() {
  const dispatch = useAppDispatch();
  const textOne = useAppSelector((state) => state.global.textOne);
  const textTwo = useAppSelector((state) => state.global.textTwo);

  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);

  const [isSwapped, setIsSwapped] = useState(false);

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

  const handleToggle = () => {
    setIsSwapped((prev: any) => !prev);
  };

  useEffect(() => {
    handleCompare(); // 👈 Automatically compare on toggle
  }, [isSwapped]);

  return (
    <div className="flex my-6 flex-col px-6 items-center w-full h-full gap-4">
      <div className="md:flex items-center space-y-4 md:space-y-0 gap-2 w-full">
        {/* Conditional render based on isSwapped */}
        {!isSwapped ? (
          <>
            <div
              ref={refOne}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInput(setTextOne, e)}
              className="flex-1 h-48 bg-blue-50 p-2 border border-blue-300 rounded overflow-auto"
            />
            <MoveHorizontal
              className="cursor-pointer hidden md:block"
              onClick={handleToggle}
            />
            <MoveVertical
              className=" m-auto cursor-pointer md:hidden"
              onClick={handleToggle}
            />
            <div
              ref={refTwo}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInput(setTextTwo, e)}
              className="flex-1 h-48 bg-blue-50 p-2 border border-blue-300 rounded overflow-auto"
            />
          </>
        ) : (
          <>
            <div
              ref={refTwo}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInput(setTextTwo, e)}
              className="flex-1 h-48 bg-blue-50 p-2 border border-blue-300 rounded overflow-auto"
            />
            <MoveHorizontal
              className="cursor-pointer hidden md:block"
              onClick={handleToggle}
            />
            <MoveVertical
              className=" m-auto cursor-pointer md:hidden"
              onClick={handleToggle}
            />
            <div
              ref={refOne}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInput(setTextOne, e)}
              className="flex-1 h-48 bg-blue-50 p-2 border border-blue-300 rounded overflow-auto"
            />
          </>
        )}
      </div>

      <Button className="text-white" onClick={handleCompare}>
        შედარება
      </Button>
    </div>
  );
}

export default App;
