import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dashboard } from './dashboard';

export default {
  title: 'Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => (
  <Dashboard {...args} />
);

export const Main = Template.bind({});
