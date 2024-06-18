import { stat } from "node:fs/promises";
import { readFolderFiles } from "./folderReader";

export const readCommands = async (folderPath: string) => {
  const contents = await readFolderFiles(folderPath);

  const folders: string[] = [];

  for (const path of contents) {
    try {
      const stats = await stat(path);

      if (stats.isDirectory()) folders.push(path);
    } catch (error) {
      console.error(error);
    }
  }

  return folders;
};
