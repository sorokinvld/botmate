import { MenuLink } from './plugin';

interface IBotMateApp {
  menu: MenuLink[];
  addMenuLink: (link: MenuLink) => void;
}
