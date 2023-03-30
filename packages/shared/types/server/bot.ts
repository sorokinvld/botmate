export interface IBot {
  _id: string;
  id: string;
  name: string;
  secrets: object;
  config: object;
  platform: string;
  status: 'active' | 'inactive';
  errors: any[];
  createdAt: string;
  updatedAt: string;
}
