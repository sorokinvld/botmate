import React from 'react';

type AddMenuLink = (link: MenuLink) => void;
type MenuLink = {
  to: string;
  label: string;
  icon?: React.ComponentType;
  Component: React.FC;
};

export { MenuLink, AddMenuLink };
