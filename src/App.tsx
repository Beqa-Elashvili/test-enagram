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
  const [prevTextOne, setPrevTextOne] = useState(textOne);
  const [prevTextTwo, setPrevTextTwo] = useState(textTwo);

  const handleCompare = () => {
    const wordsOne = textOne.split(/\s+/);
    const wordsTwo = textTwo.split(/\s+/);

    // Sets for fast lookup
    const setOne = new Set(wordsOne);
    const setTwo = new Set(wordsTwo);

    // Common words currently in both texts
    const commonWords = new Set(wordsOne.filter((word) => setTwo.has(word)));

    // Words deleted from one side are those that:
    // - appear in one text but not the other, but only if they appeared in the other text as well (approximation)
    // So: words that appear only in one text are NOT red, only those that appeared in both before are red.
    // Since we only have current texts, consider words unique to one side are red in missing side.

    // Highlight function with red and green logic
    const highlight = (words: string[], isFirstText: boolean) =>
      words
        .map((word) => {
          if (commonWords.has(word)) {
            // Word common to both texts, highlight green
            return `<span class="bg-green-300 px-1 rounded">${word}</span>`;
          } else {
            // Word is unique to this text
            // Check if this word is missing from the other text and appeared previously (approximate by assuming any word in other text is common)
            const isDeleted = isFirstText
              ? !setTwo.has(word)
              : !setOne.has(word);
            if (isDeleted) {
              // Word missing in other text → highlight red in this text
              return `<span class="bg-red-300 px-1 rounded">${word}</span>`;
            }
            // Otherwise, no highlight
            return word;
          }
        })
        .join(" ");

    if (refOne.current) refOne.current.innerHTML = highlight(wordsOne, true);
    if (refTwo.current) refTwo.current.innerHTML = highlight(wordsTwo, false);
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
