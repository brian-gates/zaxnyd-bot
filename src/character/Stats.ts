export const stats = [
  "ac",
  "mind",
  "body",
  "attackBonus",
  "damageBonus",
  "damageMax",
  "maxHP",
  "monsterDamageMax",
] as const;

export type Stat = typeof stats[number];
export type DefenseStat = "ac" | "mind" | "body";

export type Stats = {
  [key in Stat]: number;
};

export const statTitles: { [key in Stat]: string } = {
  ac: "Armor",
  mind: "Mind",
  body: "Body",
  attackBonus: "Attack Bonus",
  damageBonus: "Damage Bonus",
  damageMax: "Damage Max",
  maxHP: "Max Health",
  monsterDamageMax: "Monster Damage Max",
};
