import { useCallback, useEffect, useState } from "react";

export type Player = {
  name: string;
  setName: (name: string) => void;
  team: string[];
  setTeam: (team: string[]) => void;
  currentCharacterIndex: number;
  setCurrentCharacterIndex: (index: number) => void;
  hasWon: boolean;
};

export const usePlayer = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState(false);

  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  useEffect(() => {
    setCurrentCharacterIndex(0);
    setHasWon(false);
  }, [team]);

  const _setCurrentCharacterIndex = useCallback(
    (index: number) => {
      if (index === team.length) {
        setHasWon(true);
        return;
      }

      if (index < team.length && index >= 0) {
        setCurrentCharacterIndex(index);
      }
    },
    [team.length]
  );

  useEffect(() => {
    if (currentCharacterIndex === team.length) {
      setHasWon(true);
    }
  }, [currentCharacterIndex, team]);

  return {
    name,
    setName,
    team,
    setTeam,
    currentCharacterIndex,
    setCurrentCharacterIndex: _setCurrentCharacterIndex,
    hasWon,
  } as Player;
};
