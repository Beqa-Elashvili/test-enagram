import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");
  const [highlightedOne, setHighlightedOne] = useState("");
  const [highlightedTwo, setHighlightedTwo] = useState("");

  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);

  const handleCompare = () => {
    const wordsOne = textOne.split(/\s+/);
    const wordsTwo = textTwo.split(/\s+/);
    const commonSet = new Set(
      wordsOne.filter((word) => wordsTwo.includes(word))
    );

    const highlightText = (words: string[]) =>
      words
        .map((word) =>
          commonSet.has(word)
            ? `<span class="bg-green-300 px-1 rounded">${word}</span>`
            : word
        )
        .join(" ");

    setHighlightedOne(highlightText(wordsOne));
    setHighlightedTwo(highlightText(wordsTwo));
  };

  const handleInput = (setter: any, e: any) => {
    setter(e.currentTarget.innerText);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 gap-4">
      <div className="flex gap-2 w-full">
        <div
          ref={refOne}
          contentEditable
          onInput={(e) => handleInput(setTextOne, e)}
          className="flex-1 h-48 p-2 border transition-all duration-300 border-blue-300 rounded overflow-auto"
          dangerouslySetInnerHTML={{ __html: highlightedOne || textOne }}
        ></div>
        <div
          ref={refTwo}
          contentEditable
          onInput={(e) => handleInput(setTextTwo, e)}
          className="flex-1 h-48 p-2 border transition-all duration-300 border-blue-300  rounded overflow-auto"
          dangerouslySetInnerHTML={{ __html: highlightedTwo || textTwo }}
        ></div>
      </div>

      <Button className="text-white" onClick={handleCompare}>
        შედარება
      </Button>
    </div>
  );
}

export default App;
