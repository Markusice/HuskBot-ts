import { REST, Routes } from "discord.js";
import type MyClient from "../myClient";
import { Tokens } from "../tokens";

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(Tokens.discordToken);

// and deploy your commands!
export const deployCommands = async (client: MyClient) => {
  const commands: string[] = client.commands.map((command) =>
    command.data.toJSON(),
  );

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationCommands(Tokens.clientId),
      {
        body: commands,
      },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};
