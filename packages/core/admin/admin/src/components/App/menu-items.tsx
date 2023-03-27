import {
  TbHome2,
  TbAxe,
  TbShoppingCart,
  TbSettings2,
  TbBox,
  TbMessage2Code,
  TbNotification,
  TbBellPlus,
} from 'react-icons/tb';
import { MenuLink } from '@botmate/types/admin';

export const AppMenuLinks: MenuLink[] = [
  {
    to: '/',
    label: 'Home',
    icon: <TbHome2 />,
    match: /^\/$/,
  },
  {
    to: '/bots',
    label: 'My Bots',
    icon: <TbMessage2Code />,
    match: /^\/bots/,
  },
  {
    to: '/notifications',
    label: 'Notifications',
    icon: <TbBellPlus />,
    match: /^\/notifications/,
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
