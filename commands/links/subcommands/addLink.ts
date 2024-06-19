import { EmbedBuilder } from "discord.js";
import type { Error } from "mongoose";
import { EmbedColors } from "../../../colors/embedColors";
import { Link } from "../../../schemas/link";
import type { CommandExecute } from "../../clientCommand";

export const addLink: CommandExecute = async function (interaction) {
  const guildId = interaction.guildId!;

  const name = interaction.options.getString("name")!;
  const url = interaction.options.getString("url")!;

  let message = new EmbedBuilder();

  const foundLink = await Link.findOne({
    guildId,
    name,
  });

  if (!foundLink) {
    message = await tryToCreateLink(guildId, name, url);
  } else
    message
      .setColor(EmbedColors.Red)
      .setDescription(`\`${name}\` link is already saved in your guild.`);

  await interaction.reply({ embeds: [message], ephemeral: true });
};

async function tryToCreateLink(guildId: string, name: string, url: string) {
  const message = new EmbedBuilder();

  try {
    await Link.create({
      guildId,
      name,
      url,
    });

    message
      .setColor(EmbedColors.Amethyst)
      .setDescription(`Successfully saved \`${name}\` link to your guild.`);
  } catch (error) {
    const errorMsg = (error as Error.ValidatorError).message;

    message.setColor(EmbedColors.Red).setDescription(errorMsg);
  } finally {
    return message;
  }
}
