import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HiChartBar, HiHome } from 'react-icons/hi';
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
    <Routes>
      <Route path="/" element={<AppShell {...args} />} />
      <Route path="/bots" element={<AppShell {...args} />} />
    </Routes>
  </BotMateUIProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
  layout: 'fullscreen',
};
Primary.args = {
  children: (
    <>
      <AppHeader title="Analytics" />
    </>
  ),
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
      to: '/bots',
      match: /^\/bots$/,
    },
  ],
};
