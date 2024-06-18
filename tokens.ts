export class Tokens {
  static readonly discordToken: string = process.env.DISCORD_TOKEN || "";
  static readonly clientId: string = process.env.CLIENT_ID || "";
  static readonly databaseToken: string = process.env.DATABASE_TOKEN || "";
}
