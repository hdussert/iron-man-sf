import { CHARACTERS } from "@/lib/characters";
import { getRandomSeed, shuffleArrayUsingSeed } from "@/lib/seed";
import { useEffect, useState } from "react";
import { usePlayer } from "./use-player";
import { useSettings } from "./use-settings";

const buildGameSeed = (
  teamSize: number,
  isMirror: boolean,
  seedP1: string,
  seedP2: string
) => {
  return [teamSize, isMirror ? "1" : "0", seedP1, seedP2].join("-");
};

const parseGameSeed = (gameSeed: string) => {
  const [teamSizeStr, isMirrorStr, seedP1, seedP2] = gameSeed.split("-");
  const teamSize = Number(teamSizeStr);
  const isMirror = isMirrorStr === "1";
  return { teamSize, isMirror, seedP1, seedP2 };
};

export const useGame = () => {
  const settings = useSettings();
  const P1 = usePlayer();
  const P2 = usePlayer();
  const [gameSeed, setGameSeed] = useState("");

  // Generate seed based on settings
  useEffect(() => {
    const seedP1 = getRandomSeed();
    const seedP2 = getRandomSeed();

    const newGameSeed = buildGameSeed(
      settings.teamSize,
      settings.isMirror,
      seedP1,
      seedP2
    );
    setGameSeed(newGameSeed);
  }, [settings.teamSize, settings.isMirror]);

  // Generate teams based on seed
  useEffect(() => {
    const { teamSize, isMirror, seedP1, seedP2 } = parseGameSeed(gameSeed);

    const seededArrayP1 = shuffleArrayUsingSeed(CHARACTERS, seedP1);
    const teamP1 = seededArrayP1.slice(0, teamSize);

    P1.setTeam(teamP1);

    const characterPoolP2 = isMirror ? teamP1 : CHARACTERS;
    const seededArrayP2 = shuffleArrayUsingSeed(characterPoolP2, seedP2);
    const teamP2 = seededArrayP2.slice(0, teamSize);

    P2.setTeam(teamP2);
  }, [gameSeed]);

  return {
    player1: P1,
    player2: P2,
    settings,
    seed: gameSeed,
    setSeed: setGameSeed,
  };
};
