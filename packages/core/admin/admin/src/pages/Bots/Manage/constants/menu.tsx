import { TbHome2, TbSettings2, TbBug, TbHammer, TbCode } from 'react-icons/tb';
import { MenuLink } from '@botmate/types/admin';

export const MenuLinks: MenuLink[] = [
  {
    to: '/bots/:botId',
    label: 'Home',
    icon: <TbHome2 />,
    match: /^\/bots\/\w+$/,
  },
  {
    to: '/bots/:botId/scripts',
    label: 'Scripts',
    icon: <TbCode />,
    match: /^\/bots\/\w+\/scripts/,
  },
  {
    to: '/bots/:botId/plugins',
    label: 'Plugins',
    icon: <TbHammer />,
    match: /^\/bots\/\w+\/plugins/,
  },
  {
    to: '/bots/:botId/settings',
    label: 'Settings',
    icon: <TbSettings2 />,
    match: /^\/bots\/\w+\/settings/,
  },
];
