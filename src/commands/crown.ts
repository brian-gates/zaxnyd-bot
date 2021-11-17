import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { equipItem } from "../character/equipItem";
import { getUserCharacter } from "../character/getUserCharacter";
import { updateCharacter } from "../character/updateCharacter";
import { grantCharacterItem } from "../equipment/grantCharacterItem";
import { heavyCrown } from "../heavyCrown/heavyCrown";
import { execute as inspect } from "./inspect";

export const command = new SlashCommandBuilder()
  .setName("crown")
  .setDescription("Gain a crown.");

export const execute = async (
  interaction: CommandInteraction
): Promise<void> => {
  const character = getUserCharacter(interaction.user);
  updateCharacter(
    equipItem(grantCharacterItem(character, heavyCrown), heavyCrown)
  );
  console.log("granted", heavyCrown);
  inspect(interaction);
};

export default { command, execute };