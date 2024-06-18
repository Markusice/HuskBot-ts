export type ClientEvent = {
  name: string;
  once?: boolean;
  execute(...args: any[]): void | Promise<void>;
};
