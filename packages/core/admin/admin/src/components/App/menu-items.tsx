import { TbHome2, TbAxe, TbShoppingCart, TbSettings2 } from 'react-icons/tb';
import { MenuLink } from '@botmate/types/admin';

export const AppMenuLinks: MenuLink[] = [
  {
    to: '/',
    label: 'Dashboard',
    icon: <TbHome2 />,
    match: /^\/$/,
  },
  {
    to: '/plugins',
    label: 'Plugins',
    icon: <TbAxe />,
    match: /^\/plugins$/,
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
