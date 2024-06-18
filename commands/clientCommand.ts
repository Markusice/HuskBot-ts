import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export type ClientCommand = {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: CommandExecute;
};

export type CommandExecute = {
  (interaction: ChatInputCommandInteraction): Promise<void>;
};

export const createCommand = (command: ClientCommand) => command;
