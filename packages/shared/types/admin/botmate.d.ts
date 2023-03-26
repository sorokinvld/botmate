import { MenuLink } from './plugin';

interface IBotMateApp {
  menu: MenuLink[];
  addMenuLink: (link: MenuLink) => void;

  platforms: {
    [key: string]: Platform;
  };
  addPlatform: (platform: Platform) => void;
}

export type Field = {
  type: 'text';
  label: string;
  name: string;
};
export type Platform = {
  id: string;
  label: string;
  icon: React.ReactNode;
  bot: {
    fields: Field[];
  };
} & Record<string, any>;
