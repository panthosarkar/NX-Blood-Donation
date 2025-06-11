const capitalizeSentence = (sentence: string | null | undefined): string => {
  return (sentence || "")
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

export default capitalizeSentence;
