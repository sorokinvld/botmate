import React from 'react';
import { HiCog, HiHome } from 'react-icons/hi';
import { MenuLink } from '@botmate/types/admin';

export const HomeMenuLink: MenuLink = {
  to: '/',
  label: 'Home',
  icon: <HiHome />,
  match: /^\/$/,
};

export const SettingsMenuLink: MenuLink = {
  to: '/settings',
  label: 'Settings',
  icon: <HiCog />,
  match: /^\/settings/,
};
