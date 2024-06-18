import { Client, Collection, type ClientOptions } from "discord.js";

export default class MyClient extends Client {
  commands: Collection<string, any>;

  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
  }
}
