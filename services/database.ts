import chalk from "chalk";
import mongoose from "mongoose";
import { Tokens } from "../tokens";

export async function connectToDatabase() {
  try {
    registerEvents();

    await mongoose.connect(Tokens.databaseToken);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      chalk.green(
        "Pinged your deployment. You successfully connected to MongoDB!",
      ),
    );
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}

function registerEvents() {
  mongoose.connection.on("error", (err) => {
    console.error(err);
  });

  mongoose.connection.on("connecting", () => {
    console.log(chalk.green("Connecting to database..."));
  });

  mongoose.connection.on("disconnected", () => {
    console.log(chalk.red("Disconnected from database"));
  });
}
