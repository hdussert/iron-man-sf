import { useState } from "react";

export const useSettings = () => {
  const [teamSize, setTeamSize] = useState(19);
  const [isMirror, setIsMirror] = useState(false);

  return {
    teamSize,
    setTeamSize,
    isMirror,
    setIsMirror,
  };
};
