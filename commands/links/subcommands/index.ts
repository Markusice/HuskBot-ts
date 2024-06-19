import type { CommandExecute } from "../../clientCommand";
import { addLink } from "./addLink";
import { removeLink } from "./removeLink";
import { showLink } from "./showLink";
import { LinksSubcommandsTypes } from "./types";

export const LinksSubcommands: Record<LinksSubcommandsTypes, CommandExecute> = {
  [LinksSubcommandsTypes.Add]: addLink,
  [LinksSubcommandsTypes.Remove]: removeLink,
  [LinksSubcommandsTypes.Show]: showLink,
};
