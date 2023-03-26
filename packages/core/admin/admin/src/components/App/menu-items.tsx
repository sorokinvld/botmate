import React from 'react';
import {
  RiChat2Line,
  RiCodeLine,
  RiCodeSLine,
  RiHome3Line,
  RiLineChartLine,
  RiSettingsLine,
  RiShoppingBag3Line,
} from 'react-icons/ri';
import { MenuLink } from '@botmate/types/admin';

export const TopMenuLinks: MenuLink[] = [
  {
    to: '/',
    label: 'Home',
    icon: <RiHome3Line />,
    match: /^\/$/,
  },
  {
    to: '/commands',
    label: 'Commands',
    icon: <RiCodeLine />,
    match: /^\/commands$/,
  },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: <RiLineChartLine />,
    match: /^\/analytics$/,
  },
];

export const BottomMenuLinks: MenuLink[] = [
  {
    to: '/marketplace',
    label: 'Marketplace',
    icon: <RiShoppingBag3Line />,
    match: /^\/marketplace/,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <RiSettingsLine />,
    match: /^\/settings/,
  },
];
