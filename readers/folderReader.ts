import { readdir } from "node:fs/promises";
import path from "path";

export const readFolderFiles = async (folderPath: string) => {
  const contents = await readdir(folderPath);

  return contents.map((fileName) => path.join(folderPath, fileName));
};
