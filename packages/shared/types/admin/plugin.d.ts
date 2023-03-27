import React from 'react';
import { LoadableComponent } from '@loadable/component';

type Field = {
  name: string;
  type: 'text' | 'number';
  label: string;
};

type AddMenuLink = (link: MenuLink) => void;
type MenuLink = {
  to: string;
  label: string;
  icon: React.ReactNode;
  Component?: LoadableComponent;
  match: RegExp;
};

export { MenuLink, AddMenuLink };
