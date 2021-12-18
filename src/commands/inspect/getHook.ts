import {
  ChannelWebhookCreateOptions,
  Collection,
  CommandInteraction,
  TextChannel,
  Webhook,
} from "discord.js";

// cannot exceed length of 10
export type HookName =
  | "Equipment"
  | "Status Effects"
  | "Quests"
  | "Characters"
  | "Inventory";

export async function getHook({
  name,
  interaction,
  webhooks,
}: {
  name: HookName;
  interaction: CommandInteraction;
  webhooks: Collection<string, Webhook>;
}): Promise<Webhook | undefined> {
  const channel = interaction.channel;
  if (!(channel instanceof TextChannel)) return;
  const existingHook = webhooks.find((hook) => hook.name === name);
  if (existingHook) return existingHook;
  return await channel.createWebhook(name, hookOptions(name));
}

export function hookOptions(name: HookName): ChannelWebhookCreateOptions {
  return {
    avatar:
      "https://www.wallpaperup.com/uploads/wallpapers/2013/02/22/43066/33ee1c3920aa37d0b18a0de6cd9796b9.jpg",
    reason: name,
  };
}
