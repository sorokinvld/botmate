import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BotMateUIProvider } from '../Provider';

import { Card } from '../Card';

export default {
  title: 'Card',
  component: Card,
  parameters: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <BotMateUIProvider>
    <Card {...args} />
  </BotMateUIProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {};
Primary.args = {
  children: <>My Card commponent</>,
};
