import { SlashCommandBuilder } from "discord.js";
import { createCommand } from "../clientCommand";

export default createCommand({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
});
