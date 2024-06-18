import type MyClient from "../myClient";
import { readFolderFiles } from "../readers/folderReader";

export const loadEvents = async (client: MyClient) => {
  const files = await readFolderFiles(import.meta.dir);

  await Promise.all(
    files.map(async (file) => {
      const { default: event } = await import(file);

      if (!event) return;

      if (event.once) {
        await client.once(event.name, (...args) => event.execute(...args));
      } else {
        await client.on(event.name, (...args) => event.execute(...args));
      }
    }),
  );
};
