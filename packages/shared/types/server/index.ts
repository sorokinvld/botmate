export type Bot = {
  id: string;
  name: string;
  platform: string;
  status: string;
  secret: Record<string, string>;
  createdAt: string;
};
