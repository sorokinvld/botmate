export interface IBot {
  _id: string;
  name: string;
  secrets: object;
  config: object;
  platform: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
