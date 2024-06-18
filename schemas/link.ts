import { Schema, model } from "mongoose";

type Link = {
  guildId: string;
  name: string;
  url: string;
};

const linkSchema = new Schema<Link>({
  guildId: { type: String, required: true, immutable: true },
  name: {
    type: String,
    minLength: 1,
    required: true,
    immutable: true,
    lowercase: true,
  },
  url: {
    type: String,
    required: true,
    match: [
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Please add a valid URL!",
    ],
  },
});

export const Link = model("Link", linkSchema);
