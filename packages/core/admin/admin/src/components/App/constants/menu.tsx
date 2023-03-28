import { MenuLink } from '@botmate/types/admin';
import { TbHome2, TbShoppingCart, TbSettings2, TbCode, TbHammer } from 'react-icons/tb';

export const AppMenuLinks: MenuLink[] = [
  {
    to: '/',
    label: 'Home',
    icon: <TbHome2 />,
    match: /^\/$/,
  },
  {
    to: '/scripts',
    label: 'Scripts',
    icon: <TbCode />,
    match: /^\/scripts/,
  },
  {
    to: '/plugins',
    label: 'Plugins',
    icon: <TbHammer />,
    match: /^\/plugins/,
  },
  {
    to: '/marketplace',
    label: 'Marketplace',
    icon: <TbShoppingCart />,
    match: /^\/marketplace/,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <TbSettings2 />,
    match: /^\/settings/,
  },
];
