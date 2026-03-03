import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "./redux";
import { setTextOne, setTextTwo } from "./state";
import { MoveHorizontal, MoveVertical } from "lucide-react";
import { diffChars } from "diff";

function App() {
  const dispatch = useAppDispatch();
  const textOne = useAppSelector((state) => state.global.textOne);
  const textTwo = useAppSelector((state) => state.global.textTwo);

  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);

  const [isSwapped, setIsSwapped] = useState(false);

  // 🔥 Compare function using real diff
  const handleCompare = () => {
    const differences = diffChars(textOne, textTwo);

    let resultOld = "";
    let resultNew = "";

    differences.forEach((part) => {
      if (part.added) {
        // Added text → green in second box
        resultNew += `<span class="bg-green-300 px-1 rounded">${part.value}</span>`;
      } else if (part.removed) {
        // Removed text → red in first box
        resultOld += `<span class="bg-red-300 px-1 rounded">${part.value}</span>`;
      } else {
        // Same text → normal
        resultOld += part.value;
        resultNew += part.value;
      }
    });

    if (refOne.current) refOne.current.innerHTML = resultOld;
    if (refTwo.current) refTwo.current.innerHTML = resultNew;
  };

  // 🔥 Handle typing
  const handleInput = (
    action: (value: string) => any,
    e: React.FormEvent<HTMLDivElement>,
  ) => {
    dispatch(action(e.currentTarget.innerText));
  };

  // Keep editable text synced with Redux
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
    setIsSwapped((prev) => !prev);
  };

  useEffect(() => {
    handleCompare();
  }, [isSwapped]);

  return (
    <div className="flex my-6 flex-col px-6 items-center w-full h-full gap-4">
      <div className="md:flex items-center space-y-4 md:space-y-0 gap-2 w-full">
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
              className="m-auto cursor-pointer md:hidden"
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
              className="m-auto cursor-pointer md:hidden"
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

      <Button
        disabled={textOne === "" && textTwo === ""}
        className="text-white"
        onClick={handleCompare}
      >
        შედარება
      </Button>
    </div>
  );
}

export default App;
