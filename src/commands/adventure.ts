import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import {
  adjustHP,
  getUserCharacter,
  isCharacterOnCooldown,
  levelup,
  setCharacterCooldown,
  trap,
} from "../db";
import { sleep } from "../utils";

export const command = new SlashCommandBuilder()
  .setName("adventure")
  .setDescription("Set off in search of glory.");

export const execute = async (
  interaction: CommandInteraction
): Promise<void> => {
  const initiator = interaction.user;
  const roll = Math.random();
  const player = getUserCharacter(initiator);
  if (player.hp === 0) {
    await interaction.reply(`You're too weak to press on.`);
    return;
  }
  if (isCharacterOnCooldown(player.id)) {
    await interaction.reply(`You can't do that yet.`);
  }
  setCharacterCooldown(initiator.id);
  if (roll >= 0.95) {
    levelup(initiator.id);
    await interaction.reply(
      `You encounter a divine entity that blesses you with +1 max hp!`
    );
    return;
  }
  if (roll >= 0.8) {
    const healAmount = Math.floor(Math.random() * 6);
    adjustHP(initiator.id, healAmount);
    await interaction.reply(
      `You drink from a fairy's well, it heals you for ${healAmount}!`
    );
    return;
  }
  if (roll >= 0.3) {
    const result = trap(initiator.id);
    await interaction.reply(`It's a trap! ...`);
    await sleep(2000);
    switch (result.outcome) {
      case "hit":
        await interaction.followUp(
          `You're hit! You take ${result.damage} damage!`
        );
        break;
      case "miss":
        await interaction.followUp(`You deftly evade!`);
        break;
    }
    return;
  }
  await interaction.reply(`You travel the lands.`);
};

export default { command, execute };
