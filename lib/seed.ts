import seedrandom from "seedrandom";

export const shuffleArrayUsingSeed = (array: string[], seed: string) => {
  const rng = seedrandom(seed);
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = t;
  }
  return newArray;
};

export const getRandomSeed = () => {
  return Math.floor(Math.random() * 100000).toString();
};
