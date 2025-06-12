"use client";
import { useState } from "react";

// USAGE:
// call the copy function with the text you want to copy
/* 
  const { copy, isCopied } = Copy();

  // call the copy function with the text you want to copy
  onClick={() => copy("text to copy")}

  // show a message if the text is copied
  {isCopied && <div>Copied</div>}
*/

function Copy() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // setMessage("Copied");
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  return { copy, isCopied };
}

export default Copy;
