import chalk from "chalk";
import type MyClient from "../myClient";
import { readCommands } from "../readers/commandsReader";

export const loadCommands = async (client: MyClient) => {
  const files = await readCommands(import.meta.dir);

  await Promise.all(
    files.map(async (file) => {
      try {
        const { default: command } = await import(file);

        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`,
          );
        }
      } catch (error) {
        console.log(
          chalk.yellow(`[WARNING] The ${file} doesn't have an index.ts file.`),
        );
      }
    }),
  );
};
