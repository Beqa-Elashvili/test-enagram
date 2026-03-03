import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "./redux";
import { setTextOne, setTextTwo } from "./state";
import { MoveHorizontal, MoveVertical, CircleDot } from "lucide-react";
import { diffChars } from "diff";

function App() {
  const dispatch = useAppDispatch();
  const textOne = useAppSelector((state) => state.global.textOne);
  const textTwo = useAppSelector((state) => state.global.textTwo);

  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);

  const [isSwapped, setIsSwapped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const runDiff = () => {
    const differences = diffChars(textOne, textTwo);

    let resultOld = "";
    let resultNew = "";

    differences.forEach((part) => {
      if (part.added) {
        resultNew += `<span class="bg-green-300 px-1 rounded">${part.value}</span>`;
      } else if (part.removed) {
        resultOld += `<span class="bg-red-300 px-1 rounded">${part.value}</span>`;
      } else {
        resultOld += part.value;
        resultNew += part.value;
      }
    });

    if (refOne.current) refOne.current.innerHTML = resultOld;
    if (refTwo.current) refTwo.current.innerHTML = resultNew;
  };

  const handleCompare = () => {
    setIsLoading(true);
    setProgress(0);

    const duration = 3000;
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const percent = Math.min(
        Math.round((currentStep / totalSteps) * 100),
        100,
      );
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        runDiff();
      }
    }, intervalTime);
  };

  const handleInput = (
    action: (value: string) => any,
    e: React.FormEvent<HTMLDivElement>,
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
    setIsSwapped((prev) => !prev);
  };

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
              className="flex-1 bg-[var(--textarea-background)] p-2 h-48 outline-none rounded overflow-auto"
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
              className="flex-1 bg-[var(--textarea-background)] h-48 outline-none p-2 rounded overflow-auto"
            />
          </>
        ) : (
          <>
            <div
              ref={refTwo}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInput(setTextTwo, e)}
              className="flex-1 bg-[var(--textarea-background)] h-48 outline-none p-2 rounded overflow-auto"
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
              className="flex-1 bg-[var(--textarea-background)] h-48 outline-none p-2 rounded overflow-auto"
            />
          </>
        )}
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="bg-white  p-6 rounded-2xl shadow-2xl flex items-center  gap-4 animate-in fade-in">
            <CircleDot className=" size-12 text-blue-500" />
            <div className="flex flex-col w-full gap-1">
              <p className="text-sm text-gray-500">
                Converting...Thank you For your Patience
              </p>
              <div className="flex items-center gap-2">
                <p className="text-md font-semibold text-blue-500">
                  {progress}%
                </p>
                <div className="w-full h-3 bg-gray-200 rounded-full  overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        disabled={textOne === "" || textTwo === "" || isLoading}
        className="text-white"
        onClick={handleCompare}
      >
        შედარება
      </Button>
    </div>
  );
}

export default App;
