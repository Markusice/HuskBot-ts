import chalk from "chalk";
import { GatewayIntentBits } from "discord.js";
import { deployCommands } from "./commands/deploy";
import { loadCommands } from "./commands/loader";
import { loadEvents } from "./events/loader";
import MyClient from "./myClient";
import { connectToDatabase } from "./services/database";
import { Tokens } from "./tokens";

console.log(chalk.magenta("[Client] Starting..."));

await connectToDatabase();

const client = new MyClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
  ],
});

client.login(Tokens.discordToken).then(async () => {
  await loadEvents(client);
  await loadCommands(client);
  await deployCommands(client);
});
