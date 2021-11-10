import { User } from "discord.js";
import { Quest, QuestId } from "../quest/quest";
import { StatusEffect } from "../status-effets/StatusEffect";
import { Item, Weapon } from "../utils/equipment";
import { Stats } from "./Stats";

export type Character = Stats & {
  id: string;
  name: string;
  profile: string;
  user?: User;
  hp: number;

  inventory: Item[];
  equipment: {
    weapon?: Weapon;
  };

  cooldowns: {
    attack?: string;
    adventure?: string;
    heal?: string;
  };
  statusEffects?: StatusEffect[];
  quests: {
    [id in QuestId]?: Quest;
  };

  xp: number;
  gold: number;
  xpValue: number;
};
