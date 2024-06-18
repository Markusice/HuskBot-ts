import { Events } from "discord.js";
import type MyClient from "../myClient";
import type { ClientEvent } from "./clientEvent";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: MyClient) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  },
} satisfies ClientEvent;
