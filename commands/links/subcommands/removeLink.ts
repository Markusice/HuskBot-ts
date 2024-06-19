import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColors } from "../../../colors/embedColors";
import { Link } from "../../../schemas/link";
import type { CommandExecute } from "../../clientCommand";

export const removeLink: CommandExecute = async (interaction) => {
  const guildId = interaction.guildId!;

  const name = interaction.options.getString("name")!;

  const message = new EmbedBuilder();

  const { deletedCount } = await Link.deleteOne({
    guildId,
    name,
  });

  if (deletedCount) {
    message
      .setColor(EmbedColors.Amethyst)
      .setDescription(`Succesfully removed \`${name}\` link from your guild.`);
  } else {
    message
      .setColor(EmbedColors.Red)
      .setDescription("Link not found in your guild.");
  }

  await interaction.reply({ embeds: [message], ephemeral: true });
};
