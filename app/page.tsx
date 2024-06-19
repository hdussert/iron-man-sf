"use client";

import { PlayerDisplay } from "@/components/player";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useGame } from "@/hooks/use-game";
import { CHARACTERS } from "@/lib/characters";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { player1, player2, settings, seed, setSeed } = useGame();
  const [inputSeed, setInputSeed] = useState("");

  const copySeed = () => {
    try {
      navigator.clipboard.writeText(seed);
      toast({
        description: "Seed copied",
      });
    } catch (err) {
      console.log(err);
      toast({
        description: "Error: Could not copy the seed",
      });
    }
  };

  const onSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSeed(e.target.value);
  };

  const onSeedSubmit = () => {
    setSeed(inputSeed);
  };

  const onPlayer1NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    player1.setName(e.target.value);
  };

  const onPlayer2NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    player2.setName(e.target.value);
  };

  const onTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settings.setTeamSize(Number(e.target.value));
  };

  const onIsMirrorChange = (checked: CheckedState) => {
    if (checked !== "indeterminate") {
      settings.setIsMirror(checked);
    }
  };

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
      <section
        id="settings"
        className="px-4 mx-auto max-w-screen-sm snap-start h-screen flex flex-col items-center gap-8 justify-center"
      >
        <h1 className="font-display text-6xl relative">
          Le protocole
          <span className="absolute -translate-y-1/2 -translate-x-1/2 scale-50 rotate-[25deg]">
            🎩
          </span>
        </h1>
        {/* Seed */}
        <div className="flex w-full gap-2">
          <Input
            type="text"
            placeholder="Entrez une seed"
            value={inputSeed}
            onChange={onSeedChange}
          />
          <Button onClick={onSeedSubmit}>C&apos;est parti</Button>
        </div>
        <hr className="w-full" />
        {/* Joueurs */}
        <div className="w-full">
          <Label htmlFor="player1Input">Joueurs</Label>
          <div className="w-full flex items-center gap-4">
            <Input
              type="text"
              placeholder="Joueur 1"
              value={player1.name}
              onChange={onPlayer1NameChange}
            />
            <span className="font-display text-4xl">VS</span>
            <Input
              type="text"
              placeholder="Joueur 2"
              value={player2.name}
              onChange={onPlayer2NameChange}
            />
          </div>
        </div>
        {/* Équipes */}
        <div className="flex w-full justify-around gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <Label htmlFor="teamSizeInput">Taille des équipes</Label>
            <Input
              id="teamSizeInput"
              type="number"
              className="w-16"
              min={1}
              max={CHARACTERS.length}
              value={settings.teamSize}
              onChange={onTeamSizeChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="mirrorInput">Mirroir</Label>
            <Checkbox
              id="mirrorInput"
              checked={settings.isMirror}
              onCheckedChange={onIsMirrorChange}
            />
          </div>
          <div>
            <Label>Seed :</Label>
            <Button
              variant="ghost"
              className="ml-2 gap-2 font-mono"
              onClick={copySeed}
            >
              {seed} <Copy />
            </Button>
          </div>
        </div>
        <Button className="w-full" asChild>
          <a href="#game">Start</a>
        </Button>
      </section>
      <section
        id="game"
        className="px-4 relative snap-start h-screen flex flex-col items-center justify-center overflow-hidden w-full max-w-screen-sm mx-auto     "
      >
        <div className="grid grid-cols-11 font-display text-4xl">
          <PlayerDisplay player={player1} />
          <span className="flex items-center justify-center">VS</span>
          <PlayerDisplay player={player2} />
        </div>
        <Button asChild className="absolute top-4 right-4">
          <a href="#settings">Back to settings</a>
        </Button>
      </section>
    </main>
  );
}
