import { Player } from "@/hooks/use-player";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft, Check } from "lucide-react";
import { AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const NameAndProgress = ({ player }: { player: Player }) => {
  const { name, currentCharacterIndex, team } = player;
  return (
    <div className="flex flex-col max-w-full items-center w-full justify-between">
      <p className="w-full px-1 text-center text-ellipsis overflow-hidden whitespace-nowrap">
        {name === "" ? "Joueur" : name}
      </p>
      <p className="text-xl shrink-0 text-muted-foreground font-mono">
        {currentCharacterIndex + 1}/{team.length}
      </p>
    </div>
  );
};

const TeamList = ({ player }: { player: Player }) => {
  const { team, currentCharacterIndex } = player;
  return (
    <ul className="grid grid-cols-6">
      {team.map((character, i) => (
        <li
          key={i}
          className={cn("flex gap-2 items-center", {
            "brightness-50": currentCharacterIndex > i,
          })}
        >
          <Avatar
            className={cn("border-2 rounded-full", {
              "border-yellow-500": currentCharacterIndex === i,
            })}
          >
            <AvatarImage src={`/${character}.png`} alt={character} />
          </Avatar>
        </li>
      ))}
    </ul>
  );
};

const CurrentCharacter = ({ player }: { player: Player }) => {
  const { team, currentCharacterIndex, setCurrentCharacterIndex } = player;
  const currentCharacter = team[currentCharacterIndex];

  const nextCharacter = () => {
    setCurrentCharacterIndex(currentCharacterIndex + 1);
  };

  const prevCharacter = () => {
    setCurrentCharacterIndex(currentCharacterIndex - 1);
  };

  return (
    <div className="flex gap-8 items-center font-display text-4xl">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="size-36 border-4 border-muted-foreground rounded-full">
          <AvatarImage
            src={`/${currentCharacter}.png`}
            alt={currentCharacter}
          />
          <AvatarFallback>
            <div className="size-full bg-muted-foreground rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Button onClick={prevCharacter} size="icon" className="rounded-full">
            <ArrowLeft />
          </Button>
          <Button onClick={nextCharacter} size="icon" className="rounded-full">
            <Check />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const PlayerDisplay = ({ player }: { player: Player }) => {
  return (
    <div className="flex flex-col items-center gap-8 col-span-5">
      <NameAndProgress player={player} />
      <CurrentCharacter player={player} />
      <TeamList player={player} />
    </div>
  );
};
