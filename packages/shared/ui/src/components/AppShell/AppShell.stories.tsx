import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HiChartBar, HiCog, HiHome } from 'react-icons/hi';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppHeader } from '../AppHeader';
import { BotMateUIProvider } from '../Provider';

import { AppShell } from './AppShell';

export default {
  title: 'AppShell',
  component: AppShell,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    reactRouter: {
      routePath: '/',
    },
  },
} as ComponentMeta<typeof AppShell>;

const Template: ComponentStory<typeof AppShell> = (args) => (
  <BotMateUIProvider>
    <AppShell menuItems={args.menuItems}>
      <Routes>
        <Route path="/" element={<AppHeader title="Home" description="Lorem " />} />
        <Route
          path="/analytics"
          element={<AppHeader title="Analytics" description="View analytics for your bots." />}
        />
        <Route
          path="/settings"
          element={
            <AppHeader title="Settings" description="Configure your bot and account's settings." />
          }
        />
      </Routes>
    </AppShell>
  </BotMateUIProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
  layout: 'fullscreen',
};
Primary.args = {
  menuItems: [
    {
      label: 'Home',
      icon: <HiHome />,
      to: '/',
      match: /^\/$/,
    },
    {
      label: 'Analytics',
      icon: <HiChartBar />,
      to: '/analytics',
      match: /^\/analytics$/,
    },
    {
      label: 'Settings',
      icon: <HiCog />,
      to: '/settings',
      match: /^\/settings$/,
    },
  ],
};
