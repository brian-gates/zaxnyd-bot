import { MessageAttachment } from "discord.js";
import { readFile, writeFile } from "fs/promises";
import { Character } from "./character/Character";
import { defaultCharacter } from "./character/defaultCharacter";
import { defaultCooldowns } from "./character/defaultCooldowns";
import { LootResult } from "./character/loot/loot";
import { Encounter } from "./monster/Encounter";
import { Monster } from "./monster/Monster";

export const DB_FILE = "./db.json";

type GameState = {
  characters: Map<string, Character>;
  monsters: Map<string, Monster>;
  loots: Map<string, LootResult>;
  encounters: Map<string, Encounter>;
  cooldowns: typeof defaultCooldowns;
};

export const gameState: GameState = {
  characters: new Map(),
  monsters: new Map(),
  loots: new Map(),
  encounters: new Map(),
  cooldowns: defaultCooldowns,
};

export const defaultProfile = "attachment://profile.png";
export const defaultProfileAttachment = new MessageAttachment(
  "./images/default-profile.png",
  "profile.png"
);

export const getDBJSON = (space = 2): string =>
  JSON.stringify(
    {
      lastSave: new Date().toString(),
      characters: Array.from(gameState.characters.entries()),
      monsters: Array.from(gameState.monsters.entries()),
      encounters: Array.from(gameState.encounters.entries()),
      cooldowns: gameState.cooldowns,
    },
    null,
    space
  );

const isEmptyState = (state: GameState) =>
  state.characters.size === 0 &&
  state.monsters.size === 0 &&
  state.loots.size === 0;

export const saveDB = async (file = DB_FILE): Promise<void> => {
  console.log("saving db");
  if (isEmptyState(gameState)) return;
  const data = getDBJSON();
  await writeFile(file, data, { encoding: "utf-8" });
};

export const loadDB = async (): Promise<void> => {
  const data = await readFile(DB_FILE, { encoding: "utf-8" });
  loadSerializedDB(data.toString());
};

export const loadSerializedDB = (serialized: string): GameState => {
  const parsed = JSON.parse(serialized);
  const characters = parsed.characters.map(
    ([id, character]: [string, Character]) => [
      id,
      {
        ...defaultCharacter,
        ...character,
        activeEncounters: new Map(character.activeEncounters),
      },
    ]
  );
  const characterMap = new Map<string, Character>(characters);
  gameState.characters = characterMap;
  console.log("Database loaded", gameState);
  return gameState;
};

export const d20 = (): number => Math.ceil(Math.random() * 20);
export const d6 = (): number => Math.ceil(Math.random() * 6);
