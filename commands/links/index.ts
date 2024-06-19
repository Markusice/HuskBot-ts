import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { createCommand } from "../clientCommand";
import { LinksSubcommands } from "./subcommands";
import { LinksSubcommandsTypes } from "./subcommands/types";

export default createCommand({
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Database Links Commands")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName(LinksSubcommandsTypes.Add)
        .setDescription("Add a new database link")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the link")
            .setRequired(true)
            .setMinLength(1),
        )
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("URL of the link")
            .setRequired(true)
            .setMinLength(1),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("show")
        .setDescription("Show all your guild's links")
        .addIntegerOption((option) =>
          option
            .setName("page")
            .setDescription("Number of the page")
            .setMinValue(1),
        )
        .addBooleanOption((option) =>
          option
            .setName("is_global")
            .setDescription("Is message seeable to everyone"),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("rem")
        .setDescription("Remove a database link")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the link")
            .setRequired(true)
            .setMinLength(1),
        ),
    ),
  async execute(interaction) {
    const executedSubcommand =
      interaction.options.getSubcommand() as LinksSubcommandsTypes;

    await LinksSubcommands[executedSubcommand](interaction);
  },
});
