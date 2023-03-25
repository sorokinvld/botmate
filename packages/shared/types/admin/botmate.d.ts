import { MenuLink, Platform } from './plugin';

interface IBotMateApp {
  menu: MenuLink[];
  addMenuLink: (link: MenuLink) => void;

  platforms: Map<string, Platform>;
  addPlatform: (platform: Platform) => void;
}
