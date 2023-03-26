import React from 'react';

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
  Component?: React.FC;
  match: RegExp;
};

export type Platform = {
  id: string;
  bot: {
    fields: Field[];
  };
} & Record<string, any>;

export { MenuLink, AddMenuLink };
