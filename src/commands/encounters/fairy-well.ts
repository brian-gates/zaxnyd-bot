import { CommandInteraction, MessageEmbed } from "discord.js";
import { adjustHP, gainXP } from "../../db";

export const fairyWell = async (
  interaction: CommandInteraction
): Promise<void> => {
  const healAmount = Math.floor(Math.random() * 6);
  adjustHP(interaction.user.id, healAmount);
  gainXP(interaction.user.id, 1);
  await interaction.reply({
    embeds: [
      new MessageEmbed()
        .setTitle("Fairy Well")
        .setColor("DARK_VIVID_PINK")
        .setDescription(
          `You drink from a fairy's well, it heals you for ${healAmount}!`
        )
        .addField("XP Gained", "1")
        .setImage("https://imgur.com/bgq63v9.png"),
    ],
  });
};